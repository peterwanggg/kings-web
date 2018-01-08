import {
    RECEIVE_CONTESTANTS,
    REQUEST_CONTESTANTS,
    RECEIVE_CHALLENGERS,
    REQUEST_CHALLENGERS,
    SUBMIT_BOUT,
    CATEGORY_TYPE,
    TOGGLE_SKIP_CONTESTANT_ID,
    BOUT_MODE_TYPE,
    CHANGE_CATEGORY_ID,
    SKIP_CONTESTANT,
} from '../constants'
import { ActionType, StoreState, ContestantEntry, LatLon, Contestant, ChallengerResponse, ContestantsResponse } from '../types/index'
import { Dispatch } from 'redux'
import * as _ from 'lodash'
import { findNextContestantIndex } from '../utils/ContestantUtils'
import { KINGS_API_BASE_URL, DEFAULT_HEADERS } from '../constants/ApiConstants';

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

export interface SubmitBoutResponseAction extends ActionType<SUBMIT_BOUT> {
    type: SUBMIT_BOUT,
    boutMode: BOUT_MODE_TYPE,
    winnerContestantId: number,
}

export interface SkipContestantAction extends ActionType<SKIP_CONTESTANT> {
    type: SKIP_CONTESTANT;
    skipContestantId: number;
}

export interface ToggleSkipContestantIdAction extends ActionType<TOGGLE_SKIP_CONTESTANT_ID> {
    type: TOGGLE_SKIP_CONTESTANT_ID;
    skipContestantId: number;
}

export interface ChangeCategoryIdAction extends ActionType<CHANGE_CATEGORY_ID> {
    type: CHANGE_CATEGORY_ID;
    nextCategoryId: number;
}

/*** TYPES: CALL **/
export type RequestContestantsCallType =
    (categoryId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveContestantsResponseAction>

export type RequestChallengersCallType =
    (challengerContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveChallengersResponseAction>

export type SubmitBoutCallType =
    (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<void>

export type SkipContestantThunkCallType =
    (skipContestantId: number, otherContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => SkipContestantAction

export type ToggleSkipContestantIdType =
    (skipContestantId: number) => ToggleSkipContestantIdAction

/*** API CALL ACTIONS ***/
export const requestChallengersThunk: RequestChallengersCallType =
    (challengerContestantId) =>
        (dispatch, getState) => {
            let latLon = getState().latLon;
            dispatch(requestChallengers(latLon, challengerContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/challenger?lat=${latLon.lat}&lon=${latLon.lon}&challenger-contestant-id=${challengerContestantId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: ChallengerResponse) =>
                    dispatch(receiveChallengers(response.challenger, response.contestants)))
        }

export const requestContestantsThunk: RequestContestantsCallType =
    (categoryId) =>
        (dispatch, getState) => {
            let latLon: LatLon = getState().latLon;
            dispatch(changeCategoryId(categoryId))
            dispatch(requestContestants(latLon, categoryId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/category?lat=${latLon.lat}&lon=${latLon.lon}&category-id=${categoryId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: ContestantsResponse) =>
                    dispatch(receiveContestants(categoryId, response.contestants)))
        }

export const submitBoutThunk: SubmitBoutCallType =
    (challenger, winnerContestantId, loserContestantId) =>
        (dispatch, getState) => {
            let state: StoreState = getState();
            requestChallengersIfNeeded(
                dispatch,
                challenger.contestant.contestantId,
                state.contestants.entries,
                state.contestants.skipContestantIds,
                state.contestants.currContestantIndex);
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

export const searchContestantsCall: (latLon: LatLon, categoryType: CATEGORY_TYPE, contestantName: string) => Promise<Contestant[]> =
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

export const skipContestantThunk: SkipContestantThunkCallType =
    (skipContestantId, otherContestantId) =>
        (dispatch, getState) => {
            let state: StoreState = getState();
            requestChallengersIfNeeded(
                dispatch,
                otherContestantId,
                state.contestants.entries,
                state.contestants.skipContestantIds,
                state.contestants.currContestantIndex);
            dispatch(toggleSkipContestantId(skipContestantId));
            return ({
                type: SKIP_CONTESTANT,
                skipContestantId: skipContestantId
            })
        }

const requestChallengersIfNeeded = (dispatch: Dispatch<StoreState>,
    challengerContestantId: number,
    entries: ContestantEntry[],
    skipContestantIds: number[],
    currContestantIndex: number) => {
    if (findNextContestantIndex(
        entries,
        skipContestantIds,
        currContestantIndex) === -1) {
        dispatch(requestChallengersThunk(challengerContestantId));
    }
}

/*** LOCAL ACTIONS **/
export const toggleSkipContestantId: ToggleSkipContestantIdType =
    (skipContestantId: number) => ({
        type: TOGGLE_SKIP_CONTESTANT_ID,
        skipContestantId: skipContestantId
    })

const changeCategoryId: (nextCategoryId: number) => ChangeCategoryIdAction =
    (nextCategoryId) => ({
        type: CHANGE_CATEGORY_ID,
        nextCategoryId: nextCategoryId,
    })


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
