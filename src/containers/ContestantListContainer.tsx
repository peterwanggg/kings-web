import { StoreState, ContestantEntry, LatLon } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import ContestantList, { ContestantListProps } from '../components/ContestantList'
import { requestChallengersThunk } from '../actions/ContestantActions';

export function mapStateToProps(state: StoreState, ownProps: ContestantListProps) {
    return {
        latLon: state.latLon,

        contestants: state.contestants.entries,
        challenger: state.contestants.challenger,
        skipContestantIds: state.contestants.skipContestantIds,
        currContestantIndex: state.contestants.currContestantIndex,
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<StoreState>,
    ownProps: ContestantListProps,
) {
    return {
        dispatchRequestChallengers: (latLon: LatLon, challenger: ContestantEntry, offset: number) =>
            dispatch(requestChallengersThunk(
                latLon,
                challenger,
                ownProps.contestants.length + 1
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestantList);