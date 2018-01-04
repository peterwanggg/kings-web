import * as React from 'react'
import BoutContainer from '../containers/BoutContainer'
import { CATEGORY_TYPE, DEFAULT_CATEGORY_ID, DEFAULT_CONTESTANT_ID, DEFAULT_CONTESTANT_ENTRY, BOUT_MODE_TYPE, CHALLENGER } from '../constants/index'
import { StoreState, LatLon, ContestantEntry, Category } from '../types/index'
import { connect, Dispatch } from 'react-redux';
import {
    changeCategoryId,
    changeBoutMode,
    setContestantModal,
} from '../actions/GlobalActions';
import {
    requestContestantsThunk,
    requestCategoriesThunk,
    changeChallengerThunk,
    searchContestantsCall,
} from '../actions/ContestantActions';
import ContestantList from '../components/ContestantList'
import * as _ from 'lodash';
import Select, { Options, Option, Async } from 'react-select'
import BoutModeSelector from '../components/BoutModeSelector';
import ContestantModal from '../components/ContestantModal';

export interface BoutRouteProps {
    latLon: LatLon;
    categoryId: number;
    categories: Category[]
    categoryType: CATEGORY_TYPE;

    boutMode: BOUT_MODE_TYPE;

    contestantModal: ContestantEntry;

    challenger: ContestantEntry;
    contestantsEntries: ContestantEntry[];
    skipContestantIds: number[];
    currContestantIndex: number;

    dispatch: Dispatch<StoreState>;
}

const searchContestants =
    (latLon: LatLon, categoryType: CATEGORY_TYPE, searchString: string) => {
        if (_.isEmpty(searchString) || searchString.length < 2) {
            return Promise.resolve({ options: [] })
        }
        return searchContestantsCall(latLon, categoryType, searchString)
            .then((entries: ContestantEntry[]) => {
                return { options: entries }
            })
    }
const transformCategoriesToSelectOptions =
    (categories: Category[]): Options => _.map(categories, category => ({
        value: category.categoryId,
        label: category.categoryName
    }))

// const noOption: Option = null typeof Option;

class BoutRoute extends React.Component<BoutRouteProps> {
    public componentDidMount() {
        this.props.dispatch(requestCategoriesThunk(this.props.latLon, this.props.categoryType))
    }

    public componentDidUpdate(prevProps: BoutRouteProps) {
        if (prevProps.categoryId !== this.props.categoryId
            && this.props.categoryId !== DEFAULT_CATEGORY_ID
            && (_.isNil(this.props.challenger) || this.props.challenger.contestant.contestantId === DEFAULT_CONTESTANT_ID)
        ) {
            this.props.dispatch(requestContestantsThunk(this.props.latLon, this.props.categoryId))
        }
    }

    render() {
        return (
            <div>
                <ContestantModal
                    contestant={this.props.contestantModal}
                    setContestantModal={(contestant: ContestantEntry | null) => this.props.dispatch(setContestantModal(contestant))}
                    showStats={
                        !_.isNil(this.props.contestantModal)
                        && _.findIndex(this.props.contestantsEntries, cE => cE.contestant.contestantId == this.props.contestantModal.contestant.contestantId) < this.props.currContestantIndex
                        && this.props.contestantModal.contestant.contestantId != this.props.contestantModal.contestant.contestantId}
                />
                <section className="section">
                    <div className="tile is-ancestor">
                        <div className="tile is-child is-2">
                            <BoutModeSelector
                                boutMode={this.props.boutMode}
                                dispatchChangeBoutMode={(nextBoutMode: BOUT_MODE_TYPE) =>
                                    this.props.dispatch(changeBoutMode(nextBoutMode))}
                            />
                        </div>
                        <div className="tile is-vertical">
                            <div className="tile is-child">
                                <Async
                                    name="challenger"
                                    value={this.props.boutMode === CHALLENGER ?
                                        this.props.challenger.contestant : false}
                                    placeholder="Select a Challenger..."
                                    clearable={false}
                                    onChange={(value: ContestantEntry) => this.props.dispatch(changeChallengerThunk(value))}
                                    valueKey="contestantId" labelKey="contestantName"
                                    loadOptions={(input: string) => searchContestants(
                                        this.props.latLon, this.props.categoryType, input)}
                                />
                            </div>
                            <div className="tile is-child">
                                <Select
                                    name="categories"
                                    value={this.props.categoryId}
                                    clearable={false}
                                    onChange={(selectedOption: Option) => !_.isNil(selectedOption) && _.isNumber(selectedOption.value) ?
                                        this.props.dispatch(changeCategoryId(Number(selectedOption.value))) : null
                                    }
                                    options={transformCategoriesToSelectOptions(this.props.categories)}
                                />
                            </div>
                        </div>
                    </div>
                </section>


                <div className="tile is-ancestor is-fullwidth">
                    {/* <div className="tile box"> */}
                    <BoutContainer
                        challenger={DEFAULT_CONTESTANT_ENTRY}
                        otherContestant={DEFAULT_CONTESTANT_ENTRY}
                        submitBoutDispatch={(challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise.resolve()}
                    />
                    {/* </div> */}
                    <div className="tile is-parent is-vertical is-3">
                        <ContestantList
                            contestants={this.props.contestantsEntries}
                            skipContestantIds={this.props.skipContestantIds}
                            currContestantIndex={this.props.currContestantIndex}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export function mapStateToProps(state: StoreState) {
    return {
        latLon: state.latLon,

        categoryType: state.categoryType,
        categoryId: state.categoryId,
        categories: state.categories,

        boutMode: state.boutMode,

        contestantModal: state.contestantModal,

        challenger: state.contestants.challenger,
        contestantsEntries: state.contestants.entries,
        skipContestantIds: state.contestants.skipContestantIds,
        currContestantIndex: state.contestants.currContestantIndex,
    }
}

export default connect(mapStateToProps)(BoutRoute);