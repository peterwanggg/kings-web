import { StoreState, ContestantEntry } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import ContestantPreview, { ContestantPreviewProps } from '../components/ContestantPreview'
import { toggleSkipContestantId} from '../actions/ContestantActions';
import { setContestantModal } from '../actions/GlobalActions';
import * as _ from 'lodash';

export function mapStateToProps(state: StoreState, ownProps: ContestantPreviewProps) {
    return {
        isSkipped: _.includes(state.skipContestantIds, ownProps.contestant.contestant.contestantId)
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<StoreState>,
    ownProps: ContestantPreviewProps,
) {
    return {
        setContestantModal: (contestant: ContestantEntry) => {
            console.log("dispatched:" + contestant);
            dispatch(setContestantModal(contestant));
        },
        toggleSkipContestantId: (skipContestantId: number) =>
            dispatch(toggleSkipContestantId(skipContestantId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestantPreview);