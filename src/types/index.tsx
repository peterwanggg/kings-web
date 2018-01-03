import { RESTAURANT, CATEGORY_TYPE, DEFAULT_CONTESTANT, DEFAULT_CATEGORY } from "../constants/index";

export interface StoreState {
    latLon: LatLon;

    categories: Category[];
    categoryId: number;
    categoryType: CATEGORY_TYPE;

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
    apiProviderId: string;
    apiProviderType: string;
    categoryId: number;
    contestantId: number;
    contestantName: string;
    imageUrl: string;
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

    categoryId: DEFAULT_CATEGORY,
    categories: [],
    categoryType: RESTAURANT,

    contestants: {
        entries: [],
        currContestantIndex: 1,
        challenger: DEFAULT_CONTESTANT,
        skipContestantIds: []
    },
}