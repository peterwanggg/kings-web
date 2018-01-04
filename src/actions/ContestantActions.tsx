import {
    RECEIVE_CONTESTANTS,
    REQUEST_CONTESTANTS,
    RECEIVE_CHALLENGERS,
    REQUEST_CHALLENGERS,
    SUBMIT_BOUT,
    CATEGORY_TYPE,
    RECEIVE_CATEGORIES,
    CHANGE_CHALLENGER,
    TOGGLE_SKIP_CONTESTANT_ID,
    BOUT_MODE_TYPE,
} from '../constants'
import { ActionType, StoreState, ContestantEntry, LatLon, Category } from '../types/index'
import { Dispatch } from 'redux'
import * as _ from 'lodash'
import { findNextContestantIndex } from '../utils/ContestantUtils'


const AUTH_TOKEN = "Basic cGV0ZTo=";
const KINGS_API_BASE_URL = "http://localhost:8080";
const DEFAULT_HEADERS = {
    Authorization: AUTH_TOKEN,
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

/*** TYPES: ACTION **/
export interface ReceiveContestantsResponseAction extends ActionType<RECEIVE_CONTESTANTS> {
    type: RECEIVE_CONTESTANTS,
    contestants: ContestantEntry[]
}

export interface ReceiveChallengersResponseAction extends ActionType<RECEIVE_CHALLENGERS> {
    type: RECEIVE_CHALLENGERS,
    challenger: ContestantEntry,
    contestants: ContestantEntry[]
}

export interface ReceiveCategoriesResponseAction extends ActionType<RECEIVE_CATEGORIES> {
    type: RECEIVE_CATEGORIES,
    categories: Category[]
}

export interface SubmitBoutResponseAction extends ActionType<SUBMIT_BOUT> {
    type: SUBMIT_BOUT,
    boutMode: BOUT_MODE_TYPE,
    winnerContestantId: number,
}

export interface ChangeChallengerAction extends ActionType<CHANGE_CHALLENGER> {
    type: CHANGE_CHALLENGER;
    nextChallenger: ContestantEntry;
}

export interface ToggleSkipContestantIdAction extends ActionType<TOGGLE_SKIP_CONTESTANT_ID> {
    type: TOGGLE_SKIP_CONTESTANT_ID;
    skipContestantId: number;
}

/*** TYPES: CALL **/
export type RequestContestantsCallType =
    (latLon: LatLon, categoryId: number) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveContestantsResponseAction>

export type RequestChallengersCallType =
    (latLon: LatLon, challenger: ContestantEntry) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveChallengersResponseAction>

export type RequestCategoriesCallType =
    (latLon: LatLon, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveCategoriesResponseAction>

export type SubmitBoutCallType =
    (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<void>

export type ChangeChallengerType =
    (nextChallenger: ContestantEntry) => ChangeChallengerAction;

export type ChangeChallengerThunkType =
    (nextChallenger: ContestantEntry) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => void;

export type ToggleSkipContestantIdType =
    (skipContestantId: number) => ToggleSkipContestantIdAction

/*** API CALL ACTIONS ***/
export const requestChallengersThunk: RequestChallengersCallType =
    (latLon, challenger) =>
        (dispatch) => {
            dispatch(requestChallengers(latLon, challenger.contestant.contestantId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/challenger?lat=${latLon.lat}&lon=${latLon.lon}&challenger-contestant-id=${challenger.contestant.contestantId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then(json => dispatch(receiveChallengers(challenger, json)))
        }

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

export const submitBoutThunk: SubmitBoutCallType =
    (challenger, winnerContestantId, loserContestantId) =>
        (dispatch, getState) => {
            let state: StoreState = getState();
            if (findNextContestantIndex(state.contestants.entries, state.contestants.skipContestantIds, state.contestants.currContestantIndex) === -1) {
                dispatch(requestChallengersThunk(state.latLon, challenger));
            }
            dispatch(submitBout(state.boutMode, winnerContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/bout?winner-contestant-id=${winnerContestantId}&loser-contestant-id=${loserContestantId}&category-id=${challenger.contestant.categoryId}`,
                {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => { })
        }

export const requestCategoriesThunk: RequestCategoriesCallType =
    (latLon, categoryType) =>
        (dispatch) => {
            return fetch(
                KINGS_API_BASE_URL + `/categories?lat=${latLon.lat}&lon=${latLon.lon}&category-type=${categoryType}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then(json => dispatch(receiveCategories(json)))
        }

export const searchContestantsCall: (latLon: LatLon, categoryType: CATEGORY_TYPE, contestantName: string) => Promise<ContestantEntry[]> =
    (latLon, categoryType, contestantName) =>
        fetch(
            KINGS_API_BASE_URL + `/contestants/search?lat=${latLon.lat}&lon=${latLon.lon}&category-type=${categoryType}&contestant-name=${contestantName}`,
            {
                method: 'GET',
                credentials: "same-origin",
                headers: DEFAULT_HEADERS,
            })
            .then(response => response.json())
            .then(json => _.values(json))


/*** LOCAL ACTIONS **/
export const toggleSkipContestantId: ToggleSkipContestantIdType =
    (skipContestantId: number) => ({
        type: TOGGLE_SKIP_CONTESTANT_ID,
        skipContestantId: skipContestantId
    })

export const changeChallenger: ChangeChallengerType =
    (nextChallenger) => ({
        type: CHANGE_CHALLENGER,
        nextChallenger: nextChallenger,
    })

export const changeChallengerThunk: ChangeChallengerThunkType =
    (nextChallenger: ContestantEntry) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
            dispatch(requestChallengersThunk(getState().latLon, nextChallenger))
            dispatch(changeChallenger(nextChallenger))
        }

const submitBout: (boutMode: BOUT_MODE_TYPE, winnerContestantId: number) => SubmitBoutResponseAction =
    (boutMode, winnerContestantId) => ({
        type: SUBMIT_BOUT,
        boutMode: boutMode,
        winnerContestantId: winnerContestantId,
    })

const receiveChallengers: (challenger: ContestantEntry, fetchContestantsResponse: ContestantEntry[]) => ReceiveChallengersResponseAction =
    (challenger: ContestantEntry, fetchContestantsResponse: ContestantEntry[]) => ({
        type: RECEIVE_CHALLENGERS,
        challenger: challenger,
        contestants: fetchContestantsResponse
    })

const receiveContestants: (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => ReceiveContestantsResponseAction =
    (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => ({
        type: RECEIVE_CONTESTANTS,
        contestants: fetchContestantsResponse
    })

const receiveCategories: (requestCategoriesResponse: Category[]) => ReceiveCategoriesResponseAction =
    (requestCategoriesResponse: Category[]) => ({
        type: RECEIVE_CATEGORIES,
        categories: requestCategoriesResponse,
    })

// these two are probably useless, unless you add a loading screen
const requestChallengers = (latLon: LatLon, challengerContestantId: number) => ({
    type: REQUEST_CHALLENGERS,
    latLon: latLon,
    challengerContestantId: challengerContestantId,
})

const requestContestants = (latLon: LatLon, categoryId: number) => ({
    type: REQUEST_CONTESTANTS,
    latLon: latLon,
    categoryId: categoryId,
})
