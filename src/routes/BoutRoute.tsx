import * as React from 'react'
import BoutContainer from '../containers/BoutContainer'
import { CATEGORY_TYPE, DEFAULT_CATEGORY, DEFAULT_CONTESTANT_ID, DEFAULT_CONTESTANT } from '../constants/index'
import { StoreState, LatLon, ContestantEntry, Category } from '../types/index'
import { connect, Dispatch } from 'react-redux';
import { changeCategoryId } from '../actions/GlobalActions';
import {
    requestContestantsThunk,
    requestCategoriesThunk,
    changeChallengerThunk,
    searchContestantsCall,
} from '../actions/ContestantActions';
import ContestantList from '../components/ContestantList'
import * as _ from 'lodash';
import Select, { Options, Option, Async } from 'react-select'

export interface BoutRouteProps {
    latLon: LatLon;
    categoryId: number;
    categories: Category[]
    categoryType: CATEGORY_TYPE;

    challenger: ContestantEntry;
    contestantsEntries: ContestantEntry[];
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


class BoutRoute extends React.Component<BoutRouteProps> {
    public componentDidMount() {
        this.props.dispatch(requestCategoriesThunk(this.props.latLon, this.props.categoryType))
    }

    public componentDidUpdate(prevProps: BoutRouteProps) {
        if (prevProps.categoryId !== this.props.categoryId
            && this.props.categoryId !== DEFAULT_CATEGORY
            && (_.isNil(this.props.challenger) || this.props.challenger.contestantId === DEFAULT_CONTESTANT_ID)
        ) {
            this.props.dispatch(requestContestantsThunk(this.props.latLon, this.props.categoryId))
        }
    }

    render() {
        return (
            <div>
                <section className="section">
                    <Async
                        name="challenger"
                        clearable={false}
                        onChange={(value: ContestantEntry) => this.props.dispatch(changeChallengerThunk(value))}
                        valueKey="contestantId" labelKey="contestantName"
                        loadOptions={(input: string) => searchContestants(
                            this.props.latLon, this.props.categoryType, input)}
                    />
                    <Select
                        name="categories"
                        value={this.props.categoryId}
                        clearable={false}
                        onChange={(selectedOption: Option) => {
                            this.props.dispatch(changeCategoryId(Number(selectedOption.value)))
                        }}
                        options={transformCategoriesToSelectOptions(this.props.categories)}
                    />
                </section>

                <div className="columns">
                    <div className="column">
                        <BoutContainer
                            challenger={DEFAULT_CONTESTANT}
                            otherContestant={DEFAULT_CONTESTANT}
                            submitBoutDispatch={(challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise.resolve()}
                        />
                    </div>

                    <div className="column is-one-third">
                        <ContestantList contestants={this.props.contestantsEntries} currContestantIndex={this.props.currContestantIndex} />
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

        challenger: state.contestants.challenger,
        contestantsEntries: state.contestants.entries,
        currContestantIndex: state.contestants.currContestantIndex,
    }
}

export default connect(mapStateToProps)(BoutRoute);