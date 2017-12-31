
export interface StoreState {
    latLon: LatLon;
    contestants: ContestantState;
    categoryId: number;
}

export interface ContestantState {
    currContestantIndex: number;
    entries: ContestantEntry[];
    challenger: ContestantEntry;
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


export const TEMP_CONTESTANT: ContestantEntry = {
    contestantId: -1,
    categoryId: 0,
    contestantName: "",
    imageUrl: "",
    apiProviderType: "",
    apiProviderId: ""
}


export const INITIAL_STATE: StoreState = {
    latLon: { lat: 47.6522155000, lon: -122.3543657000 },
    contestants: {
        entries: [],
        currContestantIndex: 0,
        challenger: TEMP_CONTESTANT,
    },
    categoryId: 24,
}