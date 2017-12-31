import { submitBoutCall } from '../actions/kingsApiActions';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'
import { changeCategoryId } from '../actions/globalPreferenceActions';

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {

    return {
        latLon: state.latLon,
        categoryId: state.categoryId,
        categories: state.categories,
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
        changeCategoryId: (nextCategoryId: number) => dispatch(changeCategoryId(nextCategoryId)),
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