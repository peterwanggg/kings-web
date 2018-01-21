import {
    RECEIVE_CONTESTANTS,
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
    RECEIVE_CONTESTANT_SKIPS,
} from '../constants'
import { ActionType, StoreState, ContestantEntry, LatLon, Contestant, ContestantsResponse, GetMatchResponse, NextContestantResponse, ContestantEntryPair } from '../types/index'
import { Dispatch } from 'redux'
import * as _ from 'lodash'
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

export interface ReceiveContestantSkipsResponseAction extends ActionType<RECEIVE_CONTESTANT_SKIPS> {
    type: RECEIVE_CONTESTANT_SKIPS;
    contestantSkips: number[]
}

export interface SubmitBoutResponseAction extends ActionType<SUBMIT_BOUT> {
    type: SUBMIT_BOUT,
    boutMode: BOUT_MODE_TYPE,
    winnerContestantId: number,
    loserContestantId: number,
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
    (id: number,
        idType: "contestant" | "category",
        categoryType: CATEGORY_TYPE,
        skipContestantId: number | undefined
    ) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveMatchResponseAction>

export type ChangeCategoryIdThunkType =
    (categoryId: number, categoryType: CATEGORY_TYPE) =>
        (dispatch: Dispatch<StoreState>) => void

export type ChangeChallengerIdThunkType =
    (challengerContestantId: number, categoryId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => void

export type RequestContestantsCallType =
    (categoryId: number, page: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<ReceiveContestantsResponseAction>

export type SubmitBoutCallType =
    (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number, nextContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<NextContestantResponse>

export type SkipContestantThunkCallType =
    (skipContestantId: number, otherContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => void

export type ToggleSkipContestantIdThunkType =
    (skipContestantId: number) =>
        (dispatch: Dispatch<StoreState>, getState: () => StoreState) => Promise<void>

type RequestSkipsThunkType =
    (categoryId: number) =>
        (dispatch: Dispatch<StoreState>) => Promise<ReceiveContestantSkipsResponseAction>

/*** API CALL ACTIONS ***/
export const getMatchThunk: GetMatchThunkType =
    (id, idType, categoryType, skipContestantId) =>
        (dispatch) => {
            let url: string = KINGS_API_BASE_URL + `/bout/${categoryType}/${idType}/${id}`;
            if (!_.isNil(skipContestantId)) {
                url += `?skip-contestant-id=${skipContestantId}`;
            }
            return fetch(
                url,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: GetMatchResponse) => dispatch(receiveMatch(response.match)))
        }

export const requestContestantsThunk: RequestContestantsCallType =
    (categoryId, page) =>
        (dispatch, getState) => {
            // dispatch(requestContestants(latLon, categoryId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/category/${getState().categoryType}/${categoryId}?location-id=${getState().location.locationId}&page=${page}`,
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
            // dispatch(requestContestantsThunk(nextCategoryId, 1));
            dispatch(loadNewCategory(nextCategoryId));
            dispatch(getMatchThunk(nextCategoryId, "category", categoryType, undefined));
            // dispatch({ type: CHANGE_CATEGORY_ID, nextCategoryId: nextCategoryId });
        }

export const changeChallengerThunk: ChangeChallengerIdThunkType =
    (challengerContestantId, nextCategoryId) =>
        (dispatch, getState) => {
            // if (nextCategoryId != getState().categoryId) {
            //     dispatch({ type: CHANGE_CATEGORY_ID, nextCategoryId: nextCategoryId });
            // }
            // dispatch(requestContestantsThunk(nextCategoryId, 1));
            dispatch(loadNewCategory(nextCategoryId));
            dispatch(getMatchThunk(challengerContestantId, "contestant", getState().categoryType, undefined));
            dispatch({ type: CHANGE_CHALLENGER_ID });
        }

const loadNewCategory =
    (categoryId: number) =>
        (dispatch: Dispatch<StoreState>) => {
            dispatch(requestContestantsThunk(categoryId, 1));
            dispatch(requestSkipsThunk(categoryId));
            dispatch({ type: CHANGE_CATEGORY_ID, nextCategoryId: categoryId });
        }

export const submitBoutThunk: SubmitBoutCallType =
    (challenger, winnerContestantId, loserContestantId, nextContestantId) =>
        (dispatch, getState) => {
            let state: StoreState = getState();
            dispatch(submitBout(state.boutMode, winnerContestantId, loserContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/bout/${state.categoryType}/category/${challenger.contestant.categoryId}?winner-contestant-id=${winnerContestantId}&loser-contestant-id=${loserContestantId}&next-contestant-id=${nextContestantId}`,
                {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((response: NextContestantResponse) =>
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
            dispatch(toggleSkipContestantIdThunk(skipContestantId));
            dispatch(getMatchThunk(otherContestantId, "contestant", getState().categoryType, skipContestantId))
            dispatch({ type: SKIP_CONTESTANT, skipContestantId: skipContestantId })
        }

export const toggleSkipContestantIdThunk: ToggleSkipContestantIdThunkType =
    (skipContestantId) =>
        (dispatch, getState) => {
            dispatch({ type: TOGGLE_SKIP_CONTESTANT_ID, skipContestantId: skipContestantId })
            let meth = _.includes(getState().skipContestantIds, skipContestantId) ? 'DELETE' : 'POST';
            return fetch(
                KINGS_API_BASE_URL + `/contestants/skip/${getState().categoryId}/${skipContestantId}`,
                {
                    method: meth,
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => { })
        }

const requestSkipsThunk: RequestSkipsThunkType =
    (categoryId) =>
        (dispatch) => {
            return fetch(
                KINGS_API_BASE_URL + `/contestants/skip/${categoryId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: DEFAULT_HEADERS,
                })
                .then(response => response.json())
                .then((skips: number[]) => dispatch(receiveSkips(skips)))
        }

/*** LOCAL ACTIONS **/
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

const submitBout: (boutMode: BOUT_MODE_TYPE, winnerContestantId: number, loserContestantId: number) => SubmitBoutResponseAction =
    (boutMode, winnerContestantId, loserContestantId) => ({
        type: SUBMIT_BOUT,
        boutMode: boutMode,
        winnerContestantId: winnerContestantId,
        loserContestantId: loserContestantId,
    });

const receiveContestants: (categoryId: number, fetchContestantsResponse: ContestantEntry[], page: number) => ReceiveContestantsResponseAction =
    (categoryId: number, fetchContestantsResponse: ContestantEntry[], page: number) => ({
        type: RECEIVE_CONTESTANTS,
        contestants: fetchContestantsResponse,
        page: page,
    });

const receiveSkips: (contestantSkips: number[]) => ReceiveContestantSkipsResponseAction =
    (contestantSkips) => ({
        type: RECEIVE_CONTESTANT_SKIPS,
        contestantSkips: contestantSkips,
    })

