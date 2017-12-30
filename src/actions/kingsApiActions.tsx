import { RECEIVE_CONTESTANTS, REQUEST_CONTESTANTS, KINGS_API_ACTION } from '../constants'
import { ActionType, StoreState } from '../types/index'
import { Dispatch } from 'redux'

const AUTH_TOKEN = "Basic cGV0ZTo="

// TODO: type contestants JSON properly
export interface ContestantsResponseAction extends ActionType<KINGS_API_ACTION> {
    type: KINGS_API_ACTION,
    challengerContestantId: number,
    contestants: JSON
}

const requestContestants = (lat: number, lon: number, challengerContestantId: number) => ({
    type: REQUEST_CONTESTANTS,
    lat: lat,
    lon: lon,
    challengerContestantId: challengerContestantId,
})

//////////////////
// import { ThunkAction } from 'redux-thunk';
// export interface IExtraArgument {
// }

// // use a generic to define the type of the return according to the context (binded action or not)
// export type LoadChallengers<R> = (lat: number, lon: number, challengerContestantId: number) => R;

// export const fetchChallengers2: LoadChallengers<ThunkAction<Promise<ContestantsResponseAction>, StoreState, IExtraArgument>> =
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


export const fetchChallengers = (lat: number, lon: number, challengerContestantId: number) =>
    (dispatch: Dispatch<StoreState>) => {
        dispatch(requestContestants(lat, lon, challengerContestantId))
        return fetch(
            `http://localhost:8080/contestants/challenger?lat=${lat}&lon=${lon}&challenger-contestant-id=${challengerContestantId}`,
            {
                method: 'GET',
                credentials: "same-origin",
                // mode: 'no-cors',
                headers: {
                    Authorization: AUTH_TOKEN,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => dispatch(receiveContestants(challengerContestantId, json)))
    }


const receiveContestants: (challengerContestantId: number, contestants: JSON) => ContestantsResponseAction =
    (challengerContestantId: number, contestants: JSON) => ({
        type: RECEIVE_CONTESTANTS,
        challengerContestantId,
        contestants
    })


// export const receivePosts = (subreddit, json) => ({
//     type: RECEIVE_POSTS,
//     subreddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
 // })
