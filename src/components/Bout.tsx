import * as React from 'react';
import './Hello.css';
import { ContestantsResponseAction } from '../actions/kingsApiActions';
import { Dispatch } from 'redux'
import { StoreState, ContestantEntry, LatLon} from "../types/index"
import * as _ from 'lodash'


export interface BoutProps {
    latLon: LatLon;
    challengerContestantId: number;

    contestants?: ContestantEntry[],
    fetchChallengers: (latLon: LatLon, challengerContestantId: number) =>
        (dispatch: Dispatch<StoreState>) =>
            Promise<ContestantsResponseAction>;
}


function Bout({ contestants, fetchChallengers }: BoutProps) {
    return (
        <div className="hello">
            <div className="greeting">
                {_.map(contestants, contestant => {
                    console.log(contestant.contestantName)
                    return (
                        <div>
                            {contestant.contestantName}
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => fetchChallengers(
                    {lat: 47.6522155000, lon: -122.3543657000},
                    4)}>-</button>
            </div>
        </div>
    );
}


export default Bout;

