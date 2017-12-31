import { RECEIVE_CONTESTANTS, SUBMIT_BOUT } from '../constants'
// import { ReceiveContestantsResponseAction } from '../actions/kingsApiActions'
import { ContestantState, INITIAL_STATE } from '../types/index';
import * as _ from 'lodash'

// TODO: type action
export const contestants =
    (state: ContestantState = INITIAL_STATE.contestants, action: any) => {
        switch (action.type) {
            case RECEIVE_CONTESTANTS:
                return {
                    entries: _.values(action.contestants),
                    challenger: action.contestants[0],
                    currContestantIndex: 1,
                }
            case SUBMIT_BOUT:
                return {
                    entries: state.entries,
                    challenger: state.challenger,
                    currContestantIndex: state.currContestantIndex + 1
                }
            default:
                return state
        }
    }

