import * as React from 'react';
import BoutContainer from '../containers/BoutContainer';
import {
    CATEGORY_TYPE, DEFAULT_CATEGORY_ID,
    DEFAULT_CONTESTANT_ID,
    DEFAULT_CONTESTANT_ENTRY,
    BOUT_MODE_TYPE,
    CHALLENGER,
    CATEGORIES_ROUTE,
    SKIP_CONTESTANT
} from '../constants/index';
import {
    StoreState,
    LatLon,
    ContestantEntry,
    Category,
    Contestant
} from '../types/index'
import { connect, Dispatch } from 'react-redux';
import {
    changeBoutMode,
    setContestantModal,
    requestCategoriesThunk,
} from '../actions/GlobalActions';
import {
    requestContestantsThunk,
    searchContestantsCall,
    changeChallengerThunk,
    changeCategoryIdThunk,
} from '../actions/ContestantActions';
import ContestantList from '../components/ContestantList'
import * as _ from 'lodash';
import Select, { Options, Option, Async } from 'react-select'
import BoutModeSelector from '../components/BoutModeSelector';
import ContestantModal from '../components/ContestantModal';
import { isPassed } from '../utils/ContestantUtils';
import { Link } from 'react-router-dom';

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
            .then((entries: Contestant[]) => {
                return { options: entries }
            })
    }
const transformCategoriesToSelectOptions =
    (categories: Category[]): Options => _.map(categories, category => ({
        value: category.categoryId,
        label: category.categoryName
    }))

class BoutRoute extends React.Component<BoutRouteProps> {
    public componentDidMount() {
        this.props.dispatch(requestCategoriesThunk(this.props.categoryType))
    }

    public componentDidUpdate(prevProps: BoutRouteProps) {
        if (prevProps.categoryId !== this.props.categoryId
            && this.props.categoryId !== DEFAULT_CATEGORY_ID
            && (_.isNil(this.props.challenger) || this.props.challenger.contestant.contestantId === DEFAULT_CONTESTANT_ID)

        ) {
            this.props.dispatch(requestContestantsThunk(this.props.categoryId, 1))
        }
    }

    render() {
        return (
            <div>
                <ContestantModal
                    contestant={this.props.contestantModal}
                    setContestantModal={(contestant: ContestantEntry | null) => this.props.dispatch(setContestantModal(contestant))}
                    showStats={
                        !_.isNil(this.props.contestantModal) &&
                        isPassed(
                            this.props.contestantModal.contestant.contestantId,
                            this.props.contestantsEntries,
                            this.props.challenger.contestant.contestantId,
                            this.props.currContestantIndex)
                    }
                />
                <Link to={CATEGORIES_ROUTE}>
                    <span className="fa fa-arrow-left" /> Top Categories 👑
                </Link>
                <section className="section">
                    <div className="tile is-ancestor">
                        <div className="tile is-child is-2">
                            <BoutModeSelector
                                boutMode={this.props.boutMode}
                                dispatchChangeBoutMode={(nextBoutMode: BOUT_MODE_TYPE) =>
                                    this.props.dispatch(changeBoutMode(nextBoutMode))}
                            />
                        </div>
                        <div className="tile is-vertical is-6">
                            <div className="tile is-child">
                                <Async
                                    name="challenger"
                                    value={this.props.boutMode === CHALLENGER ?
                                        this.props.challenger.contestant : false}
                                    placeholder="Select a Challenger..."
                                    clearable={false}
                                    onChange={(value: Contestant) => {
                                        this.props.dispatch(changeChallengerThunk(value.contestantId))
                                    }}
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
                                        this.props.dispatch(changeCategoryIdThunk(
                                            Number(selectedOption.value),
                                            this.props.categoryType))
                                        : null
                                    }
                                    options={transformCategoriesToSelectOptions(this.props.categories)}
                                />
                            </div>
                        </div>
                    </div>
                </section>


                <div className="tile is-ancestor is-fullwidth">
                    <BoutContainer
                        challenger={DEFAULT_CONTESTANT_ENTRY}
                        otherContestant={DEFAULT_CONTESTANT_ENTRY}
                        boutMode={this.props.boutMode}
                        dispatchSubmitBout={(challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise.resolve()}
                        dispatchSkipContestant={(skipContestantId: number, otherContestantId: number) => ({ type: SKIP_CONTESTANT, skipContestantId: DEFAULT_CONTESTANT_ID })}
                    />
                    <div className="tile is-parent is-vertical is-3">
                        <ContestantList
                            contestants={this.props.contestantsEntries}
                            skipContestantIds={this.props.skipContestantIds}
                            currContestantIndex={this.props.currContestantIndex}
                            challengerContestantId={this.props.challenger.contestant.contestantId}
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