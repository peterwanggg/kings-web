import {
    RESTAURANT,
    CATEGORY_TYPE,
    DEFAULT_CONTESTANT_ENTRY,
    DEFAULT_CATEGORY_ID,
    BOUT_MODE_TYPE,
    ROULETTE,
    RANK_TYPE,
    WIN_PERCENT,
    LOCATION_TYPE,
    DEFAULT_LAT_LON,
    DEFAULT_LOCATION
} from '../constants/index';

export interface StoreState {
    latLon: LatLon;
    location: KingsLocation;

    match: MatchState;
    // contestantEntries: ContestantEntry[];
    contestantEntries: ContestantEntryMap;
    skipContestantIds: number[];

    categories: Category[];
    categoryId: number;
    categoryType: CATEGORY_TYPE;
    categoriesTop: CategorySummary[];

    boutMode: BOUT_MODE_TYPE;
    rankType: RANK_TYPE;

    contestantModal: ContestantEntry | null;

    // contestants: ContestantState;
}

export type ContestantEntryMap = {[contestantId: number]: ContestantEntry}

export interface ContestantState {
    currContestantIndex: number;
    entries: ContestantEntry[];
    entryPage: number;
    challenger: ContestantEntry;
    skipContestantIds: number[];
}

export interface MatchState {
    left: ContestantEntry;
    right: ContestantEntry;
}

export interface ActionType<T extends string> {
    type: T;
}

// export interface ChallengerResponse {
//     challenger: ContestantEntry;
//     contestants: ContestantEntry[];
// }

export type GetMatchResponse = {
    match: ContestantEntryPair | null;
};

export type NextContestantResponse = {
    nextContestant: ContestantEntry | null;
}

export interface ContestantsResponse {
    contestants: ContestantEntry[];
}

export interface Bout {
    winnerContestantId: number;
    loserContestantId: number;
}

export type ContestantEntryPair = {
    left: ContestantEntry;
    right: ContestantEntry;
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
    winCount: number;
    loseCount: number;
    ranks: ContestantRanks;
}

export type ContestantRanks = {[rankType in RANK_TYPE]: number};

export type LatLon = {
    lat: number,
    lon: number,
};

export type Category = {
    categoryId: number;
    categoryName: string;
    categoryType: string;
};

export type CategorySummary = {
    category: Category;
    contestantEntries: ContestantEntry[];
};

export type KingsLocation = {
    locationId: number;
    locationName: string;
    locationType: LOCATION_TYPE;
    parentLocationId: number;
}

export const INITIAL_STATE: StoreState = {
    latLon: DEFAULT_LAT_LON,
    location: DEFAULT_LOCATION,

    match: {
        left: DEFAULT_CONTESTANT_ENTRY,
        right: DEFAULT_CONTESTANT_ENTRY
    },
    contestantEntries: {},
    skipContestantIds: [],

    categoriesTop: [],
    categoryId: DEFAULT_CATEGORY_ID,
    categories: [],
    categoryType: RESTAURANT,

    boutMode: ROULETTE,
    rankType: WIN_PERCENT,

    contestantModal: null,

    // contestants: {
    //     entries: [],
    //     entryPage: 0,
    //     currContestantIndex: 0,
    //     challenger: DEFAULT_CONTESTANT_ENTRY,
    //     skipContestantIds: []
    // },
};