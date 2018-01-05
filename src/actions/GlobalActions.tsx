import { CHANGE_CATEGORY_ID, CHANGE_BOUT_MODE, BOUT_MODE_TYPE, SET_CONTESTANT_MODAL } from '../constants';
import { ActionType, ContestantEntry } from '../types';

/*** TYPES: ACTION **/
export interface ChangeCategoryIdAction extends ActionType<CHANGE_CATEGORY_ID> {
    type: CHANGE_CATEGORY_ID;
    nextCategoryId: number;
}

export interface ChangeBoutModeAction extends ActionType<CHANGE_BOUT_MODE> {
    type: CHANGE_BOUT_MODE;
    nextBoutMode: BOUT_MODE_TYPE;
}

export interface SetContestantModalAction extends ActionType<SET_CONTESTANT_MODAL> {
    type: SET_CONTESTANT_MODAL;
    contestant: ContestantEntry | null;
}

/*** TYPES: CALL **/
export type ChangeCategoryIdType =
    (nextCategoryId: number) => ChangeCategoryIdAction;

export type ChangeBoutModeType =
    (nextBoutMode: BOUT_MODE_TYPE) => ChangeBoutModeAction;

export type SetContestantModalType =
    (contestant: ContestantEntry | null) => SetContestantModalAction;

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

export const setContestantModal: SetContestantModalType =
    (contestant) => ({
        type: SET_CONTESTANT_MODAL,
        contestant: contestant,
    })