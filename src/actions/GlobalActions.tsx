import {
    CHANGE_BOUT_MODE,
    BOUT_MODE_TYPE,
    SET_CONTESTANT_MODAL,
    CATEGORY_TYPE,
    RECEIVE_CATEGORIES,
    RECEIVE_TOP_CATEGORIES
} from '../constants';
import {
    ActionType,
    ContestantEntry,
    LatLon,
    StoreState,
    Category,
    CategorySummary
} from '../types';
import { Dispatch } from 'react-redux';
import {
    KINGS_API_BASE_URL,
    DEFAULT_HEADERS,
    TOP_CATEGORIES_LIMIT,
    TOP_CONTESTANTS_LIMIT
} from '../constants/ApiConstants';

/*** TYPES: ACTION **/
export interface ReceiveCategoriesResponseAction extends ActionType<RECEIVE_CATEGORIES> {
    type: RECEIVE_CATEGORIES,

    categories: Category[]
}

export interface ReceiveTopCategoriesResponseAction extends ActionType<RECEIVE_TOP_CATEGORIES> {
    type: RECEIVE_TOP_CATEGORIES;
    categorySummaries: CategorySummary[];
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
    (categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveCategoriesResponseAction>

export type RequestTopCategoriesCallType =
    (latLon: LatLon, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveTopCategoriesResponseAction>

export type ChangeBoutModeType =
    (nextBoutMode: BOUT_MODE_TYPE) => ChangeBoutModeAction;

export type SetContestantModalType =
    (contestant: ContestantEntry | null) => SetContestantModalAction;

/*** ACTIONS: API */
export const requestCategoriesThunk: RequestCategoriesCallType =
    (categoryType) =>
        (dispatch, getState) => {
            let latLon: LatLon = getState().latLon;
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

export const requestTopCategoriesThunk: RequestTopCategoriesCallType =
    (latLon, categoryType) =>
        (dispatch) => {
            return fetch(
                KINGS_API_BASE_URL + `/categories/${categoryType}/top?lat=${latLon.lat}&lon=${latLon.lon}&limit=${TOP_CATEGORIES_LIMIT}&contestants-limit=${TOP_CONTESTANTS_LIMIT}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then(json => dispatch(receiveTopCategories(json)))
        }


/*** ACTIONS: Local ***/
const receiveCategories: (requestCategoriesResponse: Category[]) => ReceiveCategoriesResponseAction =
    (requestCategoriesResponse: Category[]) => ({
        type: RECEIVE_CATEGORIES,
        categories: requestCategoriesResponse,
    })
const receiveTopCategories: (requestCategoriesResponse: CategorySummary[]) => ReceiveTopCategoriesResponseAction =
    (requestCategoriesResponse: CategorySummary[]) => ({
        type: RECEIVE_TOP_CATEGORIES,
        categorySummaries: requestCategoriesResponse,
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
