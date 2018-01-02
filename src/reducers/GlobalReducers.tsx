
import { LatLon, INITIAL_STATE, Category } from '../types/index';
import { CATEGORY_TYPE, RECEIVE_CATEGORIES, CHANGE_CATEGORY_ID, RECEIVE_CHALLENGERS } from '../constants/index';
import { ReceiveCategoriesResponseAction, ReceiveChallengersResponseAction } from '../actions/ContestantActions';
import { ChangeCategoryIdAction, } from '../actions/GlobalActions';

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
                return action.challenger.categoryId;
            case CHANGE_CATEGORY_ID:
                return action.nextCategoryId;
            case RECEIVE_CATEGORIES:
                if (action.categories.length !== 0) {
                    return action.categories[0].categoryId;
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