import { ContestantEntry, Contestant, ContestantStats, KingsLocation } from '../types/index';

// Actions: Contestant
export const RECEIVE_MATCH = 'RECEIVE_MATCH';
export type RECEIVE_MATCH = typeof RECEIVE_MATCH;

export const RECEIVE_NEXT_CONTESTANT = 'RECEIVE_NEXT_CONTESTANT';
export type RECEIVE_NEXT_CONTESTANT_TYPE = typeof RECEIVE_NEXT_CONTESTANT;

// export const REQUEST_CONTESTANTS = 'REQUEST_CONTESTANTS';
// export type REQUEST_CONTESTANTS = typeof REQUEST_CONTESTANTS;
export const RECEIVE_CONTESTANTS = 'RECEIVE_CONTESTANTS';
export type RECEIVE_CONTESTANTS = typeof RECEIVE_CONTESTANTS;

export const RECEIVE_CONTESTANT_SKIPS = 'RECEIVE_CONTESTANT_SKIPS';
export type RECEIVE_CONTESTANT_SKIPS = typeof RECEIVE_CONTESTANT_SKIPS;

export const SUBMIT_BOUT = 'SUBMIT_BOUT';
export type SUBMIT_BOUT = typeof SUBMIT_BOUT;

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export type RECEIVE_CATEGORIES = typeof RECEIVE_CATEGORIES;

export const RECEIVE_TOP_CATEGORIES = 'RECEIVE_TOP_CATEGORIES';
export type RECEIVE_TOP_CATEGORIES = typeof RECEIVE_TOP_CATEGORIES;

export const TOGGLE_SKIP_CONTESTANT_ID = 'TOGGLE_SKIP_CONTESTANT_ID';
export type TOGGLE_SKIP_CONTESTANT_ID = typeof TOGGLE_SKIP_CONTESTANT_ID;

export const SKIP_CONTESTANT = 'SKIP_CONTESTANT';
export type SKIP_CONTESTANT = typeof SKIP_CONTESTANT;

// Actions: Global
export const CHANGE_CATEGORY_ID = 'CHANGE_CATEGORY_ID';
export type CHANGE_CATEGORY_ID = typeof CHANGE_CATEGORY_ID;

export const CHANGE_CHALLENGER_ID = 'CHANGE_CHALLENGER_ID'
export type CHANGE_CHALLENGER_ID = typeof CHANGE_CHALLENGER_ID;

export const CHANGE_BOUT_MODE = 'CHANGE_BOUT_MODE';
export type CHANGE_BOUT_MODE = typeof CHANGE_BOUT_MODE;

export const SET_CONTESTANT_MODAL = 'SET_CONTESTANT_MODAL';
export type SET_CONTESTANT_MODAL = typeof SET_CONTESTANT_MODAL;

// LocationTypes
export const ZONE = 'zone';
export type ZONE_TYPE = typeof ZONE;
export const CITY = 'city';
export type CITY_TYPE = typeof CITY;
export const SUBZONE = 'subzone';
export type SUBZONE_TYPE = typeof SUBZONE;
export type LOCATION_TYPE = ZONE_TYPE | CITY_TYPE | SUBZONE_TYPE;


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
export const DEFAULT_LAT_LON = { lat: 47.6522155000, lon: -122.3543657000 };
export const DEFAULT_LOCATION: KingsLocation = {
    locationId: 2,
    locationName: "Fremont",
    locationType: SUBZONE,
    parentLocationId: 1,
}
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
    ranks: { winPercent: 0 }
};
export const DEFAULT_CONTESTANT_ENTRY: ContestantEntry = {
    contestant: DEFAULT_CONTESTANT,
    contestantStats: DEFAULT_CONTESTANT_STATS,
};
