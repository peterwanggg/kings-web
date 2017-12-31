export const REQUEST_CONTESTANTS = 'REQUEST_CONTESTANTS'
export type REQUEST_CONTESTANTS = typeof REQUEST_CONTESTANTS;
export const RECEIVE_CONTESTANTS = 'RECEIVE_CONTESTANTS'
export type RECEIVE_CONTESTANTS = typeof RECEIVE_CONTESTANTS;

export const REQUEST_CHALLENGERS = 'REQUEST_CHALLENGERS'
export type REQUEST_CHALLENGERS = typeof REQUEST_CHALLENGERS;
export const RECEIVE_CHALLENGERS = 'RECEIVE_CHALLENGERS'
export type RECEIVE_CHALLENGERS = typeof RECEIVE_CHALLENGERS;

export const SUBMIT_BOUT = 'SUBMIT_BOUT'
export type SUBMIT_BOUT = typeof SUBMIT_BOUT;
// export const RECEIVE_SUBMIT_BOUT = 'RECEIVE_SUBMIT_BOUT'
// export type RECEIVE_SUBMIT_BOUT = typeof RECEIVE_SUBMIT_BOUT;

export type KINGS_API_ACTION = RECEIVE_CHALLENGERS | RECEIVE_CONTESTANTS ;