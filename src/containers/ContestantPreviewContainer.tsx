import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import ContestantPreview, { ContestantPreviewProps } from '../components/ContestantPreview'
import { toggleSkipContestantId} from '../actions/ContestantActions';
import * as _ from 'lodash';

export function mapStateToProps(state: StoreState, ownProps: ContestantPreviewProps) {
    return {
        isSkipped: _.includes(state.contestants.skipContestantIds, ownProps.contestant.contestantId)
    }
}

export function mapDispatchToProps(
    dispatch: any,
    ownProps: ContestantPreviewProps,
) {
    return {
        toggleSkipContestantId: (skipContestantId: number) =>
            dispatch(toggleSkipContestantId(skipContestantId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestantPreview);