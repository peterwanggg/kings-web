import { StoreState, ContestantEntry } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout';
import { submitBoutThunk, skipContestantThunk } from '../actions/ContestantActions';
import { CHALLENGER } from '../constants/index';

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {
    return {
        left: state.match.left,
        right: state.match.right,
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<StoreState>,
    ownProps: BoutProps,
) {
    return {
        dispatchSubmitBout: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) =>
            dispatch(submitBoutThunk(
                challenger,
                winnerContestantId,
                loserContestantId,
                ownProps.boutMode === CHALLENGER ?
                    challenger.contestant.contestantId : winnerContestantId
            )),
        dispatchSkipContestant: (skipContestantId: number, otherContestantId: number) =>
            dispatch(skipContestantThunk(
                skipContestantId,
                otherContestantId
            )),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bout);