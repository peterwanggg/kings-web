
import {
    LatLon,
    INITIAL_STATE,
    Category,
    ContestantEntry,
} from '../types/index';
import {
    CATEGORY_TYPE, RECEIVE_CATEGORIES,
    CHANGE_CATEGORY_ID,
    RECEIVE_CHALLENGERS,
    BOUT_MODE_TYPE,
    CHANGE_BOUT_MODE,
    ROULETTE,
    CHALLENGER,
    CHANGE_CHALLENGER,
    DEFAULT_CATEGORY_NAME,
    SET_CONTESTANT_MODAL
} from '../constants/index';
import {
    ReceiveCategoriesResponseAction,
    ReceiveChallengersResponseAction,
    ChangeChallengerAction
} from '../actions/ContestantActions';
import {
    ChangeCategoryIdAction,
    ChangeBoutModeAction,
    SetContestantModalAction,
} from '../actions/GlobalActions';
import * as _ from 'lodash';

// TODO: fix action type
export const latLon =
    (state: LatLon = INITIAL_STATE.latLon, action: any) => {
        switch (action.type) {
            default:
                return state;
        }
    }

export const categoryType =
    (state: CATEGORY_TYPE = INITIAL_STATE.categoryType, action: any) => {
        switch (action.type) {
            default:
                return state;
        }
    }

export const categoryId =
    (state: number = INITIAL_STATE.categoryId, action: ReceiveCategoriesResponseAction | ChangeCategoryIdAction | ReceiveChallengersResponseAction) => {
        switch (action.type) {
            case RECEIVE_CHALLENGERS:
                return action.challenger.contestant.categoryId;
            case CHANGE_CATEGORY_ID:
                return action.nextCategoryId;
            case RECEIVE_CATEGORIES:
                if (action.categories.length !== 0) {
                    let defaultCat = _.find(action.categories, category => category.categoryName === DEFAULT_CATEGORY_NAME);
                    return _.isNil(defaultCat) ? action.categories[0].categoryId : defaultCat.categoryId;
                }
                return state;
            default:
                return state;
        }
    }

export const categories =
    (state: Category[] = INITIAL_STATE.categories, action: ReceiveCategoriesResponseAction) => {
        switch (action.type) {
            case RECEIVE_CATEGORIES:
                return action.categories;
            default:
                return state;
        }
    }

export const boutMode =
    (state: BOUT_MODE_TYPE = INITIAL_STATE.boutMode, action: ChangeBoutModeAction | ChangeChallengerAction | ChangeCategoryIdAction) => {
        switch (action.type) {
            case CHANGE_CATEGORY_ID:
                return ROULETTE;
            case CHANGE_CHALLENGER:
                return CHALLENGER;
            case CHANGE_BOUT_MODE:
                return action.nextBoutMode;
            default:
                return state;
        }
    }

export const contestantModal =
    (state: ContestantEntry | null = INITIAL_STATE.contestantModal, action: SetContestantModalAction) => {
        switch (action.type) {
            case SET_CONTESTANT_MODAL:
                return action.contestant;
            default:
                return state;
        }
    }