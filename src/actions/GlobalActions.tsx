import { CHANGE_CATEGORY_ID, CHANGE_BOUT_MODE, BOUT_MODE_TYPE, SET_CONTESTANT_MODAL, RECEIVE_CONTESTANTS, REQUEST_CONTESTANTS } from '../constants';
import { ActionType, ContestantEntry, LatLon, StoreState } from '../types';
import { DEFAULT_HEADERS, KINGS_API_BASE_URL } from '../constants/ApiConstants'
import { Dispatch } from 'react-redux';

/*** TYPES: ACTION **/
export interface ReceiveContestantsResponseAction extends ActionType<RECEIVE_CONTESTANTS> {
    type: RECEIVE_CONTESTANTS,
    contestants: ContestantEntry[]
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
export type RequestContestantsCallType =
    (latLon: LatLon, categoryId: number) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveContestantsResponseAction>


export type ChangeCategoryIdType =
    (nextCategoryId: number) => ChangeCategoryIdAction;

export type ChangeBoutModeType =
    (nextBoutMode: BOUT_MODE_TYPE) => ChangeBoutModeAction;

export type SetContestantModalType =
    (contestant: ContestantEntry | null) => SetContestantModalAction;

/*** ACTIONS: Thunk ***/
export const requestContestantsThunk: RequestContestantsCallType =
    (latLon, categoryId) =>
        (dispatch) => {
            dispatch(requestContestants(latLon, categoryId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/category?lat=${latLon.lat}&lon=${latLon.lon}&category-id=${categoryId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then(json => dispatch(receiveContestants(categoryId, json)))
        }

/*** ACTIONS: Local **/
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

const receiveContestants: (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => ReceiveContestantsResponseAction =
    (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => ({
        type: RECEIVE_CONTESTANTS,
        contestants: fetchContestantsResponse
    })

const requestContestants = (latLon: LatLon, categoryId: number) => ({
    type: REQUEST_CONTESTANTS,
    latLon: latLon,
    categoryId: categoryId,
})
