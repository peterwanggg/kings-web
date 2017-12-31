import * as React from 'react'
import BoutContainer from './BoutContainer'

import { StoreState, INITIAL_STATE, LatLon } from '../types/index'
import { connect } from 'react-redux';

import { requestContestantsCall, } from '../actions/kingsApiActions';

export interface AppProps {
    latLon: LatLon;
    categoryId: number
    dispatch?: any
}

class AppContainer extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props)
    }

    public componentDidMount() {
        this.props.dispatch(requestContestantsCall(this.props.latLon, this.props.categoryId))
    }

    render() {
        return (
            <div>
                <BoutContainer
                    latLon={INITIAL_STATE.latLon}
                    currContestantIndex={INITIAL_STATE.contestants.currContestantIndex}
                    contestantsEntries={INITIAL_STATE.contestants.entries}
                    challenger={INITIAL_STATE.contestants.challenger}
                // requestChallengersCall={requestChallengersCall}
                    // submitBoutCall={submitBoutCall}
                />
            </div>
        )
    }
}
export function mapStateToProps(state: StoreState) {
    return {
        latLon: state.latLon,
        categoryId: state.categoryId,

    }
}

export default connect(mapStateToProps)(AppContainer);