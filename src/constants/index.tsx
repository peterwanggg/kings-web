import { ContestantEntry } from '../types/index'

// Actions
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

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export type RECEIVE_CATEGORIES = typeof RECEIVE_CATEGORIES;

export type KINGS_API_ACTION = RECEIVE_CHALLENGERS | RECEIVE_CONTESTANTS | RECEIVE_CATEGORIES | SUBMIT_BOUT;

export const CHANGE_CATEGORY_ID = 'CHANGE_CATEGORY_ID'
export type CHANGE_CATEGORY_ID = typeof CHANGE_CATEGORY_ID;


// CategoryTypes
export const RESTAURANT = 'restaurant';
export type RESTAURANT_TYPE = typeof RESTAURANT;
export type CATEGORY_TYPE = RESTAURANT_TYPE;

// DEFAULT VALUES
export const DEFAULT_CATEGORY = -1;

export const DEFAULT_CONTESTANT: ContestantEntry = {
    contestantId: -1,
    categoryId: 0,
    contestantName: "",
    imageUrl: "",
    apiProviderType: "",
    apiProviderId: ""
}
