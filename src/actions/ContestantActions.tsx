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
    CHANGE_CHALLENGER_ID,
    RECEIVE_MATCH,
    RECEIVE_NEXT_CONTESTANT,
    RECEIVE_NEXT_CONTESTANT_TYPE,
} from '../constants'
import { ActionType, StoreState, ContestantEntry, LatLon, Contestant, ChallengerResponse, ContestantsResponse, GetMatchResponse, SubmitBoutResponse, ContestantEntryPair } from '../types/index'
import { Dispatch } from 'redux'
import * as _ from 'lodash'
import { findNextContestantIndex } from '../utils/ContestantUtils'
import { KINGS_API_BASE_URL, DEFAULT_HEADERS } from '../constants/ApiConstants';

/*** TYPES: ACTION **/
export interface ReceiveMatchResponseAction extends ActionType<RECEIVE_MATCH> {
    type: RECEIVE_MATCH;
    match: ContestantEntryPair | null;
}

export interface ReceiveNextContestantAction extends ActionType<RECEIVE_NEXT_CONTESTANT_TYPE> {
    type: RECEIVE_NEXT_CONTESTANT_TYPE;
    stayOnContestantId: number;
    nextContestant: ContestantEntry | null;
}

export interface ReceiveContestantsResponseAction extends ActionType<RECEIVE_CONTESTANTS> {
    type: RECEIVE_CONTESTANTS;
    contestants: ContestantEntry[];
    page: number;
}

export interface ReceiveChallengersResponseAction extends ActionType<RECEIVE_CHALLENGERS> {
    type: RECEIVE_CHALLENGERS;
    challenger: ContestantEntry;
    contestants: ContestantEntry[];
    page: number;
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

export interface ChangeCategoryIdThunkAction extends ActionType<CHANGE_CATEGORY_ID> {
    type: CHANGE_CATEGORY_ID;
    nextCategoryId: number;
}

export interface ChangeChallengerIdThunkAction extends ActionType<CHANGE_CHALLENGER_ID> {
    type: CHANGE_CHALLENGER_ID;
}

/*** TYPES: CALL **/
export type GetMatchThunkType =
    (categoryId: number, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveMatchResponseAction>

export type ChangeCategoryIdThunkType =
    (categoryId: number, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => void

export type ChangeChallengerIdThunkType =
    (challengerContestantId: number) =>
        (dispatch: Dispatch<StoreState>) => void

export type RequestContestantsCallType =
    (categoryId: number, page: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveContestantsResponseAction>

export type RequestChallengersCallType =
    (challengerContestantId: number, page: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveChallengersResponseAction>

export type SubmitBoutCallType =
    (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number, nextContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<SubmitBoutResponse>

export type SkipContestantThunkCallType =
    (skipContestantId: number, otherContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => void

export type ToggleSkipContestantIdType =
    (skipContestantId: number) => ToggleSkipContestantIdAction

/*** API CALL ACTIONS ***/
export const getMatchThunk: GetMatchThunkType =
    (categoryId, categoryType) =>
        (dispatch) => {
            return fetch(
                KINGS_API_BASE_URL + `/bout/category/${categoryType}/${categoryId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: GetMatchResponse) => dispatch(receiveMatch(response.match)))
        }

export const requestChallengersThunk: RequestChallengersCallType =
    (challengerContestantId, page) =>
        (dispatch, getState) => {
            let latLon = getState().latLon;
            dispatch(requestChallengers(latLon, challengerContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/challenger?lat=${latLon.lat}&lon=${latLon.lon}&challenger-contestant-id=${challengerContestantId}&page=${page}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: ChallengerResponse) =>
                    dispatch(receiveChallengers(response.challenger, response.contestants, page)))
        }

export const requestContestantsThunk: RequestContestantsCallType =
    (categoryId, page) =>
        (dispatch, getState) => {
            let latLon: LatLon = getState().latLon;
            dispatch(requestContestants(latLon, categoryId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/category/${getState().categoryType}?lat=${latLon.lat}&lon=${latLon.lon}&category-id=${categoryId}&page=${page}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: ContestantsResponse) =>
                    dispatch(receiveContestants(categoryId, response.contestants, page)))
        }

export const changeCategoryIdThunk: ChangeCategoryIdThunkType =
    (nextCategoryId, categoryType) =>
        (dispatch) => {
            dispatch(requestContestantsThunk(nextCategoryId, 1))
            dispatch(getMatchThunk(nextCategoryId, categoryType))
            dispatch({ type: CHANGE_CATEGORY_ID, nextCategoryId: nextCategoryId })
        }

export const changeChallengerThunk: ChangeChallengerIdThunkType =
    (challengerContestantId) =>
        (dispatch) => {
            dispatch(requestChallengersThunk(challengerContestantId, 1))
            dispatch({ type: CHANGE_CHALLENGER_ID })
        }

export const submitBoutThunk: SubmitBoutCallType =
    (challenger, winnerContestantId, loserContestantId, nextContestantId) =>
        (dispatch, getState) => {
            let state: StoreState = getState();
            requestChallengersIfNeeded(
                dispatch,
                challenger.contestant.contestantId,
                state.contestants.entryPage + 1,
                state.contestants.entries,
                state.contestants.skipContestantIds,
                state.contestants.currContestantIndex);
            dispatch(submitBout(state.boutMode, winnerContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/bout/category/${state.categoryType}/${challenger.contestant.categoryId}?winner-contestant-id=${winnerContestantId}&loser-contestant-id=${loserContestantId}&next-contestant-id=${nextContestantId}`,
                {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: SubmitBoutResponse) =>
                    dispatch(receiveNextContestant(response.nextContestant, nextContestantId)));
        }

export const searchContestantsCall: (latLon: LatLon, categoryType: CATEGORY_TYPE, contestantName: string) => Promise<Contestant[]> =
    (latLon, categoryType, contestantName) =>
        fetch(
            KINGS_API_BASE_URL + `/contestants/search/${categoryType}?lat=${latLon.lat}&lon=${latLon.lon}&contestant-name=${contestantName}`,
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
                state.contestants.entryPage + 1,
                state.contestants.entries,
                state.contestants.skipContestantIds,
                state.contestants.currContestantIndex);
            dispatch(toggleSkipContestantId(skipContestantId));
            dispatch({ type: SKIP_CONTESTANT, skipContestantId: skipContestantId })
        }

const requestChallengersIfNeeded = (dispatch: Dispatch<StoreState>,
    challengerContestantId: number,
    nextPage: number,
    entries: ContestantEntry[],
    skipContestantIds: number[],
    currContestantIndex: number) => {
    if (findNextContestantIndex(
        entries,
        skipContestantIds,
        currContestantIndex) === -1) {
        dispatch(requestChallengersThunk(challengerContestantId, nextPage));
    }
}

/*** LOCAL ACTIONS **/
export const toggleSkipContestantId: ToggleSkipContestantIdType =
    (skipContestantId: number) => ({
        type: TOGGLE_SKIP_CONTESTANT_ID,
        skipContestantId: skipContestantId
    })

const receiveMatch: (match: ContestantEntryPair | null) => ReceiveMatchResponseAction =
    (match) => ({
        type: RECEIVE_MATCH,
        match: match,
    });

const receiveNextContestant: (nextContestant: ContestantEntry | null, stayOnContestantId: number) => ReceiveNextContestantAction =
    (nextContestant, stayOnContestantId) => ({
        type: RECEIVE_NEXT_CONTESTANT,
        stayOnContestantId: stayOnContestantId,
        nextContestant: nextContestant,
    })

const submitBout: (boutMode: BOUT_MODE_TYPE, winnerContestantId: number) => SubmitBoutResponseAction =
    (boutMode, winnerContestantId) => ({
        type: SUBMIT_BOUT,
        boutMode: boutMode,
        winnerContestantId: winnerContestantId,
    });

const receiveChallengers: (challenger: ContestantEntry, fetchContestantsResponse: ContestantEntry[], page: number) => ReceiveChallengersResponseAction =
    (challenger: ContestantEntry, fetchContestantsResponse: ContestantEntry[], page: number) => ({
        type: RECEIVE_CHALLENGERS,
        challenger: challenger,
        contestants: fetchContestantsResponse,
        page: page,
    });

const receiveContestants: (categoryId: number, fetchContestantsResponse: ContestantEntry[], page: number) => ReceiveContestantsResponseAction =
    (categoryId: number, fetchContestantsResponse: ContestantEntry[], page: number) => ({
        type: RECEIVE_CONTESTANTS,
        contestants: fetchContestantsResponse,
        page: page,
    });

// these two are probably useless, unless you add a loading screen
const requestChallengers = (latLon: LatLon, challengerContestantId: number) => ({
    type: REQUEST_CHALLENGERS,
    latLon: latLon,
    challengerContestantId: challengerContestantId,
});

const requestContestants = (latLon: LatLon, categoryId: number) => ({
    type: REQUEST_CONTESTANTS,
    latLon: latLon,
    categoryId: categoryId,
});
