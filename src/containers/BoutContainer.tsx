import { StoreState, ContestantEntry } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'
import { submitBoutThunk } from '../actions/ContestantActions';

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {
    return {
        otherContestant: state.contestants.entries[state.contestants.currContestantIndex],
        challenger: state.contestants.challenger,
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<StoreState>,
    ownProps: BoutProps,
) {
    return {
        submitBoutDispatch: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) =>
            dispatch(submitBoutThunk(
                challenger,
                winnerContestantId,
                loserContestantId
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bout);