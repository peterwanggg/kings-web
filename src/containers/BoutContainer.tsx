import {   submitBoutCall, requestContestantsCall } from '../actions/kingsApiActions';
import { StoreState, LatLon } from '../types/index';
import { connect } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {

    return {

        latLon: state.latLon,
        contestantsEntries: state.contestants.entries,
        challenger: state.contestants.challenger,
        currContestantIndex: state.contestants.currContestantIndex,
    }
}

export function mapDispatchToProps(
    dispatch: any,
    ownProps: BoutProps,
) {
    return {

        // requestChallengersCall: (latLon: LatLon, challengerContestantId: number) =>
        //     dispatch(requestChallengersCall(
        //         ownProps.latLon,
        //         ownProps.challengerMaybe.contestantId
        //     )),
        requestContestantsCall: (latLon: LatLon, categoryId: number) =>
            dispatch(requestContestantsCall(
                ownProps.latLon,
                ownProps.challenger.categoryId
            )),
        submitBoutCall: (winnerContestantId: number, loserContestantId: number, categoryId: number, currContestantIndex: number) =>
            dispatch(submitBoutCall(
                winnerContestantId,
                loserContestantId,
                categoryId,
                currContestantIndex
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bout);