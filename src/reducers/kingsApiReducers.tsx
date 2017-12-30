import { RECEIVE_CONTESTANTS, REQUEST_CONTESTANTS } from '../constants'
import { ContestantsResponseAction } from '../actions/kingsApiActions'
import {
    StoreState,
    INITIAL_STATE
} from '../types/index';

export const contestants = (state: StoreState = INITIAL_STATE, action: ContestantsResponseAction) => {
    switch (action.type) {
        case RECEIVE_CONTESTANTS:
        case REQUEST_CONTESTANTS:
            return {
                ...state,
                contestants: action.contestants,
            }
        default:
            return state
    }
}