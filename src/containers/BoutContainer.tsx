import {   submitBoutCall } from '../actions/kingsApiActions';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'
import { KINGS_API_ACTION } from '../constants/index';

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {

    return {

        latLon: state.latLon,
        contestantsEntries: state.contestants.entries,
        challenger: state.contestants.challenger,
        currContestantIndex: state.contestants.currContestantIndex,
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<KINGS_API_ACTION>,
    ownProps: BoutProps,
) {
    return {

        // requestChallengersCall: (latLon: LatLon, challengerContestantId: number) =>
        //     dispatch(requestChallengersCall(
        //         ownProps.latLon,
        //         ownProps.challengerMaybe.contestantId
        //     )),
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