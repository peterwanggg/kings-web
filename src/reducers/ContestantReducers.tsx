import { RECEIVE_CONTESTANTS, SUBMIT_BOUT, CHANGE_BOUT_MODE, CHANGE_CHALLENGER, ROULETTE, RECEIVE_CHALLENGERS, CHANGE_CATEGORY_ID, TOGGLE_SKIP_CONTESTANT_ID } from '../constants';
import { ContestantState, INITIAL_STATE, ContestantEntry } from '../types/index';
import { SubmitBoutResponseAction, ChangeChallengerAction, ReceiveChallengersResponseAction, ToggleSkipContestantIdAction } from '../actions/ContestantActions';
import { ChangeCategoryIdAction, ChangeBoutModeAction, ReceiveContestantsResponseAction } from '../actions/GlobalActions';
import * as _ from 'lodash';
import { findNextContestantIndex } from '../utils/ContestantUtils';

export const contestants =
    (state: ContestantState = INITIAL_STATE.contestants, action:
        ReceiveContestantsResponseAction |
        SubmitBoutResponseAction |
        ChangeChallengerAction |
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
                }
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
            case CHANGE_CHALLENGER:
                return {
                    ...state,
                    challenger: action.nextChallenger,
                }
            case RECEIVE_CHALLENGERS:
                return {
                    ...state,
                    entries: action.contestants,
                    currContestantIndex: 0,
                }
            case RECEIVE_CONTESTANTS:
                return {
                    ...state,
                    entries: action.contestants,
                    challenger: action.contestants[0],
                    currContestantIndex: 1,
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