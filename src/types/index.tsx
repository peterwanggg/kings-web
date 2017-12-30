export interface StoreState {
    // languageName: string;
    // enthusiasmLevel: number;
    contestants: JSON
}

export interface ActionType<T extends string> {
    type: T
}

export const INITIAL_STATE: StoreState = {
    contestants: JSON.parse('""')
}

// export declare type ActionCreatorsMapObject<T> = {
//   [K in keyof T]: any;
// }
