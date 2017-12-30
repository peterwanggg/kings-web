import { ContestantsResponseAction, fetchChallengers } from '../actions/kingsApiActions';
import { StoreState, LatLon } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {
    return {
        latLon: state.latLon,
        contestants: state.contestants,

        fetchChallengers: ownProps.fetchChallengers,
        challengerContestantId: ownProps.challengerContestantId,
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<ContestantsResponseAction>,
    ownProps: BoutProps,
) {
    return {
        fetchChallengers: (latLon: LatLon, challengerContestantId: number) =>
            dispatch(fetchChallengers(
                ownProps.latLon,
                ownProps.challengerContestantId
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bout);