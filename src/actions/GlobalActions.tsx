import { CHANGE_CATEGORY_ID, CHANGE_BOUT_MODE, BOUT_MODE_TYPE, SET_CONTESTANT_MODAL, CATEGORY_TYPE, RECEIVE_CATEGORIES } from '../constants';
import { ActionType, ContestantEntry, LatLon, StoreState, Category } from '../types';
import { Dispatch } from 'react-redux';
import { KINGS_API_BASE_URL, DEFAULT_HEADERS } from '../constants/ApiConstants';

/*** TYPES: ACTION **/
export interface ReceiveCategoriesResponseAction extends ActionType<RECEIVE_CATEGORIES> {
    type: RECEIVE_CATEGORIES,
    categories: Category[]
}

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
export type RequestCategoriesCallType =
    (latLon: LatLon, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveCategoriesResponseAction>


export type ChangeCategoryIdType =
    (nextCategoryId: number) => ChangeCategoryIdAction;

export type ChangeBoutModeType =
    (nextBoutMode: BOUT_MODE_TYPE) => ChangeBoutModeAction;

export type SetContestantModalType =
    (contestant: ContestantEntry | null) => SetContestantModalAction;

/*** ACTIONS: API */
export const requestCategoriesThunk: RequestCategoriesCallType =
    (latLon, categoryType) =>
        (dispatch) => {
            return fetch(
                KINGS_API_BASE_URL + `/categories/${categoryType}?lat=${latLon.lat}&lon=${latLon.lon}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then(json => dispatch(receiveCategories(json)))
        }

/*** ACTIONS: Local ***/
const receiveCategories: (requestCategoriesResponse: Category[]) => ReceiveCategoriesResponseAction =
    (requestCategoriesResponse: Category[]) => ({
        type: RECEIVE_CATEGORIES,
        categories: requestCategoriesResponse,
    })

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