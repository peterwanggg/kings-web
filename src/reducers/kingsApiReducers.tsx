import { RECEIVE_CONTESTANTS } from '../constants'
// import { RequestContestantsResponseAction } from '../actions/kingsApiActions'
import { ContestantState, INITIAL_STATE } from '../types/index';
import * as _ from 'lodash'

export const contestants = (state: ContestantState = INITIAL_STATE.contestants, action: any) => {
    switch (action.type) {
        case RECEIVE_CONTESTANTS:
            return {
                entries: _.values(action.contestants),
                challenger: action.contestants[0],
                currContestantIndex: 1,
            }
        default:
            return state
    }
}

