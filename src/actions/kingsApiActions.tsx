import { RECEIVE_CONTESTANTS, REQUEST_CONTESTANTS, SUBMIT_BOUT, KINGS_API_ACTION, REQUEST_CHALLENGERS, RECEIVE_CHALLENGERS } from '../constants'
import { ActionType, StoreState, ContestantEntry, LatLon } from '../types/index'
import { Dispatch } from 'redux'
// import * as _ from 'lodash'

const AUTH_TOKEN = "Basic cGV0ZTo=";
const KINGS_API_BASE_URL = "http://localhost:8080";

// response action types
export interface RequestChallengersResponseAction extends ActionType<KINGS_API_ACTION> {
    type: KINGS_API_ACTION,
    challengerContestantId: number,
    contestants: ContestantEntry[]
}
export interface RequestContestantsResponseAction extends ActionType<KINGS_API_ACTION> {
    type: KINGS_API_ACTION,
    categoryId: number,
    contestants: ContestantEntry[]
}

export interface SubmitBoutResponseAction extends ActionType<KINGS_API_ACTION> {
    type: SUBMIT_BOUT,
    currContestantIndex: number,
}

// call types
export type RequestChallengersCallType = (
    latLon: LatLon,
    challengerContestantId: number) =>
    (dispatch: Dispatch<StoreState>) => Promise<RequestChallengersResponseAction>

export type RequestContestantsCallType = (
    latLon: LatLon,
    categoryId: number) =>
    (dispatch: Dispatch<StoreState>) => Promise<RequestContestantsResponseAction>

export type SubmitBoutCallType = (
    winnerContestantId: number,
    loserContestantId: number,
    categoryId: number,
    currContestantIndex: number) =>
    (dispatch: Dispatch<StoreState>) => Promise<void>

// api calls
export const requestContestantsCall: RequestContestantsCallType =
    (latLon: LatLon, categoryId: number) =>
        (dispatch: Dispatch<StoreState>) => {
            dispatch(requestContestants(latLon, categoryId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/category?lat=${latLon.lat}&lon=${latLon.lon}&category-id=${categoryId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: {
                        Authorization: AUTH_TOKEN,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(json => dispatch(receiveContestants(categoryId, json)))
        }


export const requestChallengersCall: RequestChallengersCallType =
    (latLon: LatLon, challengerContestantId: number) =>
        (dispatch: Dispatch<StoreState>) => {
            dispatch(requestChallengers(latLon, challengerContestantId))
            return fetch(
                KINGS_API_BASE_URL + `/contestants/challenger?lat=${latLon.lat}&lon=${latLon.lon}&challenger-contestant-id=${challengerContestantId}`,
                {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: {
                        Authorization: AUTH_TOKEN,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(json => dispatch(receiveChallengers(challengerContestantId, json)))
        }

export const submitBoutCall: SubmitBoutCallType =
    (winnerContestantId: number, loserContestantId: number, categoryId: number, currContestantIndex: number) =>
        (dispatch: Dispatch<StoreState>) => {
            dispatch(submitBout(currContestantIndex))
            return fetch(
                KINGS_API_BASE_URL + `/bout?winner-contestant-id=${winnerContestantId}&loser-contestant-id=${loserContestantId}&category-id=${categoryId}`,
                {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        Authorization: AUTH_TOKEN,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
        }

// local calls
const submitBout: (currContestantIndex: number) => SubmitBoutResponseAction =
    (currContestantIndex) => ({
        type: SUBMIT_BOUT,
        currContestantIndex: currContestantIndex,
    })

const receiveChallengers: (challengerContestantId: number, fetchContestantsResponse: ContestantEntry[]) => RequestChallengersResponseAction =
    (challengerContestantId: number, fetchContestantsResponse: ContestantEntry[]) => ({
        type: RECEIVE_CHALLENGERS,
        challengerContestantId,
        contestants: fetchContestantsResponse
    })
const receiveContestants: (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => RequestContestantsResponseAction =
    (categoryId: number, fetchContestantsResponse: ContestantEntry[]) => ({
        type: RECEIVE_CONTESTANTS,
        categoryId,
        contestants: fetchContestantsResponse
    })

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





 //////////////////
// import { ThunkAction } from 'redux-thunk';
// export interface IExtraArgument {
// }

// // use a generic to define the type of the return according to the context (binded action or not)
// export type LoadChallengers<R> = (lat: number, lon: number, challengerContestantId: number) => R;

// export const fetchChallengers2: LoadChallengers<ThunkAction<Promise<RequestChallengersResponseAction>, StoreState, IExtraArgument>> =
//     (lat, lon, challengerContestantId) => {
//         return (dispatch: Dispatch<StoreState>, getState) => {
//             dispatch(requestContestants(lat, lon, challengerContestantId))
//             return fetch(
//                 `http://localhost:8080/contestants/challenger?lat=${lat}&lon=${lon}&challenger-contestant-id=${challengerContestantId}`,
//                 {
//                     method: 'GET',
//                     credentials: "same-origin",
//                     // mode: 'no-cors',
//                     headers: {
//                         Authorization: AUTH_TOKEN,
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                     }
//                 })
//                 .then(response => response.json())
//                 .then(json => dispatch(receiveContestants(challengerContestantId, json)))
//         }
//     };
//////////////////