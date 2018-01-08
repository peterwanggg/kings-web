import {
    RECEIVE_CONTESTANTS,
    SUBMIT_BOUT,
    CHANGE_BOUT_MODE,
    ROULETTE,
    RECEIVE_CHALLENGERS,
    CHANGE_CATEGORY_ID,
    TOGGLE_SKIP_CONTESTANT_ID,
    DEFAULT_CONTESTANT_ENTRY
} from '../constants';
import {
    ContestantState,
    INITIAL_STATE,
    ContestantEntry
} from '../types/index';
import {
    ReceiveContestantsResponseAction,
    SubmitBoutResponseAction,
    ReceiveChallengersResponseAction,
    ToggleSkipContestantIdAction,
    ChangeCategoryIdAction
} from '../actions/ContestantActions';
import { ChangeBoutModeAction } from '../actions/GlobalActions';
import * as _ from 'lodash';
import { findNextContestantIndex } from '../utils/ContestantUtils';

// do not split this up into separate reducers, `contestants` is much easier to reason about
// in terms individual actions than the same action split up into multiple `contestant.XXX` reducers
export const contestants =
    (state: ContestantState = INITIAL_STATE.contestants, action:
        ReceiveContestantsResponseAction |
        SubmitBoutResponseAction |
        ReceiveChallengersResponseAction |
        ChangeCategoryIdAction |
        ToggleSkipContestantIdAction |
        ChangeBoutModeAction
    ) => {
        switch (action.type) {
            case CHANGE_BOUT_MODE:
                return {
                    ...state,
                    entries: action.nextBoutMode === ROULETTE &&
                        findNextContestantIndex(state.entries, state.skipContestantIds, state.currContestantIndex) !== -1 ?
                        _.concat(
                            _.take(state.entries, state.currContestantIndex + 1),
                            _.shuffle(_.takeRight(state.entries, state.entries.length - state.currContestantIndex - 1))
                        ) : state.entries
                };
            case TOGGLE_SKIP_CONTESTANT_ID:
                return {
                    ...state,
                    skipContestantIds: _.includes(state.skipContestantIds, action.skipContestantId) ?
                        _.pull(state.skipContestantIds, action.skipContestantId) :
                        _.concat(state.skipContestantIds, action.skipContestantId)
                }
            case CHANGE_CATEGORY_ID:
                return {
                    ...state,
                    challenger: INITIAL_STATE.contestants.challenger,
                }
            case RECEIVE_CHALLENGERS:
                return {
                    ...state,
                    challenger: action.challenger,
                    entries: action.contestants,
                    currContestantIndex: 0,
                }
            case RECEIVE_CONTESTANTS:
                return {
                    ...state,
                    entries: action.contestants,
                    challenger: action.contestants.length > 1 ?
                        action.contestants[0] : DEFAULT_CONTESTANT_ENTRY,
                    currContestantIndex: action.contestants.length > 1 ?
                        1 : INITIAL_STATE.contestants.currContestantIndex,
                }
            case SUBMIT_BOUT:
                let updatedEntries = state.entries;
                updatedEntries[state.currContestantIndex] = updateContestantStats(
                    updatedEntries[state.currContestantIndex],
                    action.winnerContestantId === updatedEntries[state.currContestantIndex].contestant.contestantId)
                let updatedChallenger = updateContestantStats(
                    state.challenger,
                    action.winnerContestantId === state.challenger.contestant.contestantId);

                return {
                    ...state,
                    entries: updatedEntries,
                    challenger: action.boutMode === ROULETTE ?
                        updatedEntries[state.currContestantIndex] : updatedChallenger,
                    currContestantIndex: findNextContestantIndex(
                        state.entries, state.skipContestantIds, state.currContestantIndex)
                }
            default:
                return state
        }
    }

const updateContestantStats = (contestantEntry: ContestantEntry, didWin: boolean): ContestantEntry => {
    if (didWin) {
        contestantEntry.contestantStats.winCount = contestantEntry.contestantStats.winCount + 1
    } else {
        contestantEntry.contestantStats.loseCount = contestantEntry.contestantStats.loseCount + 1
    }
    return contestantEntry
}