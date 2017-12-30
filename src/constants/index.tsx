export const REQUEST_CONTESTANTS = 'REQUEST_CONTESTANTS'
export type REQUEST_CONTESTANTS = typeof REQUEST_CONTESTANTS;

export const RECEIVE_CONTESTANTS = 'RECEIVE_CONTESTANTS'
export type RECEIVE_CONTESTANTS = typeof RECEIVE_CONTESTANTS;

export type KINGS_API_ACTION = RECEIVE_CONTESTANTS | REQUEST_CONTESTANTS;