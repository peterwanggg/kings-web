import * as React from 'react';
import './Hello.css';
import { RequestChallengersCallType, submitBoutCall, SubmitBoutCallType } from '../actions/kingsApiActions';
import { ContestantEntry, LatLon } from "../types/index"
import Contestant from './Contestant';
import * as _ from 'lodash'

export interface BoutProps {
    latLon: LatLon;
    challenger: ContestantEntry;
    contestantsEntries: ContestantEntry[];
    currContestantIndex: number;

    // dispatch functions
    requestChallengersCall?: RequestChallengersCallType;
    submitBoutCall?: SubmitBoutCallType;
}

const Bout = ({ latLon, contestantsEntries, challenger, requestChallengersCall, currContestantIndex }: BoutProps) => {
    let otherContestant: ContestantEntry = contestantsEntries[currContestantIndex];

    return (
        <div>
            {_.isNil(otherContestant) ?
                <div /> :

                <div className="hello">
                    <div className="greeting">
                        Challenger:
                        <Contestant contestant={challenger} />
                    </div>

                    <div className="greeting">
                        Other Guy:
                        <Contestant contestant={otherContestant} />
                    </div>

                    <div>
                        <button onClick={() => submitBoutCall(
                            challenger.contestantId,
                            otherContestant.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            CHALLENGER
                        </button>
                        <button onClick={() => submitBoutCall(
                            otherContestant.contestantId,
                            challenger.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            OTHER GUY
                </button>
                    </div>
                </div>
            }
        </div>
    );
}
export default Bout;


{/* <button onClick={() => requestChallengersCall(latLon, challenger.contestantId)}>
                    FETCH
                </button> */}