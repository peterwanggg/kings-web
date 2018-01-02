import { RECEIVE_CONTESTANTS, SUBMIT_BOUT, CHANGE_CHALLENGER, RECEIVE_CHALLENGERS, CHANGE_CATEGORY_ID } from '../constants'
import { ContestantState, INITIAL_STATE } from '../types/index';
import { ReceiveContestantsResponseAction, SubmitBoutResponseAction, ChangeChallengerAction, ReceiveChallengersResponseAction } from '../actions/kingsApiActions'
import { ChangeCategoryIdAction } from '../actions/globalPreferenceActions'

export const contestants =
    (state: ContestantState = INITIAL_STATE.contestants, action: ReceiveContestantsResponseAction | SubmitBoutResponseAction | ChangeChallengerAction | ReceiveChallengersResponseAction | ChangeCategoryIdAction) => {
        switch (action.type) {
            case CHANGE_CATEGORY_ID:
                return {
                    entries: state.entries,
                    challenger: INITIAL_STATE.contestants.challenger,
                    currContestantIndex: state.currContestantIndex,
                }
            case CHANGE_CHALLENGER:
                return {
                    entries: state.entries,
                    challenger: action.nextChallenger,
                    currContestantIndex: state.currContestantIndex,
                }
            case RECEIVE_CHALLENGERS:
                return {
                    entries: action.contestants,
                    challenger: state.challenger,
                    currContestantIndex: 0,
                }
            case RECEIVE_CONTESTANTS:
                return {
                    entries: action.contestants,
                    challenger: action.contestants[0],
                    currContestantIndex: 1,
                }
            case SUBMIT_BOUT:
                // if that was the last contestant, don't increment the index, submitBoutThunk will dispatch for more challengers
                let nextIndex: number = (state.currContestantIndex === state.entries.length - 1) ?
                    state.currContestantIndex : state.currContestantIndex + 1
                return {
                    entries: state.entries,
                    challenger: state.challenger,
                    currContestantIndex: nextIndex,
                }
            default:
                return state
        }
    }

