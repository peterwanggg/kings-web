import { ContestantEntry, Contestant, ContestantStats } from '../types/index';

// Actions: Contestant
export const REQUEST_CONTESTANTS = 'REQUEST_CONTESTANTS';
export type REQUEST_CONTESTANTS = typeof REQUEST_CONTESTANTS;
export const RECEIVE_CONTESTANTS = 'RECEIVE_CONTESTANTS';
export type RECEIVE_CONTESTANTS = typeof RECEIVE_CONTESTANTS;

export const REQUEST_CHALLENGERS = 'REQUEST_CHALLENGERS';
export type REQUEST_CHALLENGERS = typeof REQUEST_CHALLENGERS;
export const RECEIVE_CHALLENGERS = 'RECEIVE_CHALLENGERS';
export type RECEIVE_CHALLENGERS = typeof RECEIVE_CHALLENGERS;

export const SUBMIT_BOUT = 'SUBMIT_BOUT';
export type SUBMIT_BOUT = typeof SUBMIT_BOUT;

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export type RECEIVE_CATEGORIES = typeof RECEIVE_CATEGORIES;

export const RECEIVE_TOP_CATEGORIES = 'RECEIVE_TOP_CATEGORIES';
export type RECEIVE_TOP_CATEGORIES = typeof RECEIVE_TOP_CATEGORIES;

export const TOGGLE_SKIP_CONTESTANT_ID = 'TOGGLE_SKIP_CONTESTANT_ID';
export type TOGGLE_SKIP_CONTESTANT_ID = typeof TOGGLE_SKIP_CONTESTANT_ID;

// Actions: Global
export const CHANGE_CATEGORY_ID = 'CHANGE_CATEGORY_ID';
export type CHANGE_CATEGORY_ID = typeof CHANGE_CATEGORY_ID;

export const CHANGE_BOUT_MODE = 'CHANGE_BOUT_MODE';
export type CHANGE_BOUT_MODE = typeof CHANGE_BOUT_MODE;

export const SET_CONTESTANT_MODAL = 'SET_CONTESTANT_MODAL';
export type SET_CONTESTANT_MODAL = typeof SET_CONTESTANT_MODAL;

// export const CHANGE_ROUTE = 'CHANGE_ROUT';
// export type CHANGE_ROUTE_ACTION = typeof CHANGE_ROUTE;

// RankTypes
export const WIN_PERCENT = 'winPercent';
export type WIN_PERCENT_RANK_TYPE = typeof WIN_PERCENT;
export type RANK_TYPE = WIN_PERCENT_RANK_TYPE;

// BoutModes
export const CHALLENGER = 'CHALLENGER';
export type CHALLENGER_MODE_TYPE = typeof CHALLENGER;
export const ROULETTE = 'ROULETTE';
export type ROULETTE_MODE_TYPE = typeof ROULETTE;
export type BOUT_MODE_TYPE = CHALLENGER_MODE_TYPE | ROULETTE_MODE_TYPE;

// CategoryTypes
export const RESTAURANT = 'restaurant';
export type RESTAURANT_TYPE = typeof RESTAURANT;
export type CATEGORY_TYPE = RESTAURANT_TYPE;

// Routes
export const BOUT_ROUTE = '/bouts';
export type BOUT_ROUTE_TYPE = typeof BOUT_ROUTE;
export const CATEGORIES_ROUTE = '/categories';
export type CATEGORIES_ROUTE_TYPE = typeof CATEGORIES_ROUTE;
export type ROUTE_TYPE = BOUT_ROUTE_TYPE | CATEGORIES_ROUTE_TYPE;

// DEFAULT VALUES
export const DEFAULT_CATEGORY_NAME = 'Drinks Only';
export const DEFAULT_CATEGORY_ID = -1;
export const DEFAULT_CONTESTANT_ID = -1;
export const DEFAULT_CONTESTANT: Contestant = {
    contestantId: DEFAULT_CONTESTANT_ID,
    categoryId: 0,
    contestantName: '',
    imageUrl: '',
    apiProviderType: '',
    apiProviderId: ''
};
export const DEFAULT_CONTESTANT_STATS: ContestantStats = {
    winCount: 0,
    loseCount: 0,
    ranks: {winPercent: 0}
};
export const DEFAULT_CONTESTANT_ENTRY: ContestantEntry = {
    contestant: DEFAULT_CONTESTANT,
    contestantStats: DEFAULT_CONTESTANT_STATS
};
