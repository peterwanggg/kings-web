export interface StoreState {
    latLon: LatLon,
    contestants: ContestantEntry[]
}

export interface ActionType<T extends string> {
    type: T
}

export const INITIAL_STATE: StoreState = {
    latLon: {lat: 37.7749, lon:122.4194},
    contestants: []
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

// export declare type ActionCreatorsMapObject<T> = {
//   [K in keyof T]: any;
// }
