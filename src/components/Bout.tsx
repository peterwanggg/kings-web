import * as React from 'react';
import { ContestantEntry } from "../types/index"
import Contestant from './Contestant';
import 'react-select/dist/react-select.css';
import 'bulma/css/bulma.css'
import { isNilContestant } from '../utils/ContestantUtils';

export interface BoutProps {
    // contestants
    challenger: ContestantEntry;
    otherContestant: ContestantEntry;

    // dispatch functions
    submitBoutDispatch: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise<void>;

}

const Bout = ({ challenger, otherContestant, submitBoutDispatch }: BoutProps) => {
    if (isNilContestant(otherContestant)
        || isNilContestant(challenger)
        || challenger.contestant.contestantId === otherContestant.contestant.contestantId) {
        return (
            <div className="tile is-parent">No more contestants!</div>
        )
    }

    return (
        <div className="tile is-parent">
            <div className="tile is-child">
                <button className="button is-fullwidth is-large" onClick={() => submitBoutDispatch(
                    challenger,
                    challenger.contestant.contestantId,
                    otherContestant.contestant.contestantId)} >
                    Challenger: 👑 {challenger.contestant.contestantName} 👑
                        </button>
                <Contestant contestant={challenger} />
            </div>

            <div className="tile is-child">
                <button className="button is-fullwidth is-large" onClick={() => submitBoutDispatch(
                    challenger,
                    otherContestant.contestant.contestantId,
                    challenger.contestant.contestantId)} >
                    Other Contestant: 👑 {otherContestant.contestant.contestantName} 👑
                        </button>
                <Contestant contestant={otherContestant} />
            </div>
        </div>

    );
}


export default Bout;