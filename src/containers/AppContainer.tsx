import * as React from 'react'
import BoutContainer from './BoutContainer'
import { CATEGORY_TYPE, DEFAULT_CATEGORY } from '../constants/index'
import { StoreState, INITIAL_STATE, LatLon } from '../types/index'
import { connect } from 'react-redux';
import { changeCategoryId } from '../actions/globalPreferenceActions';
import {
    requestContestantsCall,
    submitBoutCall,
    requestCategoriesCall,
} from '../actions/kingsApiActions';

export interface AppProps {
    latLon: LatLon;
    categoryId: number;
    categoryType: CATEGORY_TYPE;
    dispatch?: any;
}

class AppContainer extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props)
    }

    public componentDidMount() {
        this.props.dispatch(requestCategoriesCall(this.props.latLon, this.props.categoryType))
    }

    public componentDidUpdate(prevProps: AppProps) {
        if (prevProps.categoryId != this.props.categoryId && this.props.categoryId != DEFAULT_CATEGORY) {
            this.props.dispatch(requestContestantsCall(this.props.latLon, this.props.categoryId))
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
                    categories={INITIAL_STATE.categories}
                    categoryId={INITIAL_STATE.categoryId}

                    // requestContestantsCall={requestContestantsCall}
                    submitBoutCall={submitBoutCall}
                    changeCategoryId={changeCategoryId}
                />
            </div>
        )
    }
}
export function mapStateToProps(state: StoreState) {
    return {
        latLon: state.latLon,
        categoryId: state.categoryId,
        categoryType: state.categoryType,
    }
}

export default connect(mapStateToProps)(AppContainer);