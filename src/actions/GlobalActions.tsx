import { CHANGE_CATEGORY_ID, CHANGE_BOUT_MODE, BOUT_MODE_TYPE } from '../constants';
import { ActionType } from '../types';

/*** TYPES: ACTION **/
export interface ChangeCategoryIdAction extends ActionType<CHANGE_CATEGORY_ID> {
    type: CHANGE_CATEGORY_ID;
    nextCategoryId: number;
}

export interface ChangeBoutModeAction extends ActionType<CHANGE_BOUT_MODE> {
    type: CHANGE_BOUT_MODE;
    nextBoutMode: BOUT_MODE_TYPE;
}

/*** TYPES: CALL **/
export type ChangeCategoryIdType =
    (nextCategoryId: number) => ChangeCategoryIdAction;

export type ChangeBoutModeType =
    (nextBoutMode: BOUT_MODE_TYPE) => ChangeBoutModeAction;

/*** ACTIONS ***/
export const changeCategoryId: ChangeCategoryIdType =
    (nextCategoryId) => ({
        type: CHANGE_CATEGORY_ID,
        nextCategoryId: nextCategoryId,
    })

export const changeBoutMode: ChangeBoutModeType =
    (nextBoutMode) => ({
        type: CHANGE_BOUT_MODE,
        nextBoutMode: nextBoutMode,
    })