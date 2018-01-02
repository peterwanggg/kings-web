import * as React from 'react'
import BoutContainer from './BoutContainer'
import { CATEGORY_TYPE, DEFAULT_CATEGORY, DEFAULT_CONTESTANT_ID } from '../constants/index'
import { StoreState, INITIAL_STATE, LatLon, ContestantEntry} from '../types/index'
import { connect } from 'react-redux';
import { changeCategoryId } from '../actions/GlobalActions';
import {
    requestContestantsThunk,
    requestCategoriesThunk,
    submitBoutThunk,
    changeChallengerThunk,
    // toggleSkipContestantId,
} from '../actions/ContestantActions';
import * as _ from 'lodash';

export interface AppProps {
    latLon: LatLon;
    categoryId: number;
    categoryType: CATEGORY_TYPE;
    challenger: ContestantEntry;
    dispatch?: any;
}

class AppContainer extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props)
    }

    public componentDidMount() {
        this.props.dispatch(requestCategoriesThunk(this.props.latLon, this.props.categoryType))
    }

    public componentDidUpdate(prevProps: AppProps) {
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
                <BoutContainer
                    latLon={INITIAL_STATE.latLon}
                    currContestantIndex={INITIAL_STATE.contestants.currContestantIndex}
                    contestantsEntries={INITIAL_STATE.contestants.entries}

                    challenger={INITIAL_STATE.contestants.challenger}
                    categoryType={INITIAL_STATE.categoryType}
                    categories={INITIAL_STATE.categories}
                    categoryId={INITIAL_STATE.categoryId}

                    submitBoutThunk={submitBoutThunk}
                    changeCategoryId={changeCategoryId}
                    changeChallengerThunk={changeChallengerThunk}

                />
            </div>
        )
    }
}

export function mapStateToProps(state: StoreState) {
    return {
        latLon: state.latLon,
        categoryType: state.categoryType,
        categoryId: state.categoryId,
        challenger: state.contestants.challenger,
    }
}

export default connect(mapStateToProps)(AppContainer);