import { StoreState, ContestantEntry } from '../types/index';
import { connect } from 'react-redux';
import Bout, { BoutProps } from '../components/Bout'
import { changeCategoryId } from '../actions/globalPreferenceActions';
import { submitBoutThunk, changeChallengerThunk } from '../actions/kingsApiActions';

export function mapStateToProps(state: StoreState, ownProps: BoutProps) {
    return {
        latLon: state.latLon,
        categoryType: state.categoryType,
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
        // changeChallenger: (nextChallenger: ContestantEntry) =>
        //     dispatch(changeChallenger(nextChallenger)),
        changeChallengerThunk: (nextChallenger: ContestantEntry) =>
            dispatch(changeChallengerThunk(nextChallenger)),


        changeCategoryId: (nextCategoryId: number) =>
            dispatch(changeCategoryId(nextCategoryId)),
        submitBoutThunk: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number, categoryId: number, currContestantIndex: number) =>
            dispatch(submitBoutThunk(
                challenger,
                winnerContestantId,
                loserContestantId,
                categoryId,
                currContestantIndex
            )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bout);