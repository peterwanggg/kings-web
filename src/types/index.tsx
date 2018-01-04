import { RESTAURANT, CATEGORY_TYPE, DEFAULT_CONTESTANT_ENTRY, DEFAULT_CATEGORY_ID, BOUT_MODE_TYPE, ROULETTE } from "../constants/index";

export interface StoreState {
    latLon: LatLon;

    categories: Category[];
    categoryId: number;
    categoryType: CATEGORY_TYPE;

    boutMode: BOUT_MODE_TYPE;

    contestants: ContestantState;
}

export interface ContestantState {
    currContestantIndex: number;
    entries: ContestantEntry[];
    challenger: ContestantEntry;
    skipContestantIds: number[];
}

export interface ActionType<T extends string> {
    type: T
}

export interface ContestantEntry {
    contestant: Contestant;
    contestantStats: ContestantStats;
}

export interface Contestant {
    apiProviderId: string;
    apiProviderType: string;
    categoryId: number;
    contestantId: number;
    contestantName: string;
    imageUrl: string;
}

export interface ContestantStats {
    categoryId: number;
    contestantId: number;
    winCount: number;
    loseCount: number;
}

export type LatLon = {
    lat: number,
    lon: number
}

export type Category = {
    categoryId: number;
    categoryName: string;
    categoryType: string;
}

export const INITIAL_STATE: StoreState = {
    latLon: { lat: 47.6522155000, lon: -122.3543657000 },

    categoryId: DEFAULT_CATEGORY_ID,
    categories: [],
    categoryType: RESTAURANT,

    boutMode: ROULETTE,

    contestants: {
        entries: [],
        currContestantIndex: 0,
        challenger: DEFAULT_CONTESTANT_ENTRY,
        skipContestantIds: []
    },
}