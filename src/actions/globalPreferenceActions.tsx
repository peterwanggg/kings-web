import { CHANGE_CATEGORY_ID } from '../constants';
import { ActionType } from '../types';

/*** TYPES: ACTION **/
export interface ChangeCategoryIdAction extends ActionType<CHANGE_CATEGORY_ID> {
    type: CHANGE_CATEGORY_ID;
    nextCategoryId: number;
}

/*** TYPES: CALL **/
export type ChangeCategoryIdType =
    (nextCategoryId: number) => ChangeCategoryIdAction;

/*** ACTIONS ***/
export const changeCategoryId: ChangeCategoryIdType =
    (nextCategoryId) => ({
        type: CHANGE_CATEGORY_ID,
        nextCategoryId: nextCategoryId,
    })

