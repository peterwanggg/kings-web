import * as React from 'react';
import './Hello.css';
// import { SubmitBoutCallType } from '../actions/ContestantActions';
import { ContestantEntry } from "../types/index"
import Contestant from './Contestant';
import * as _ from 'lodash'
import 'react-select/dist/react-select.css';
import 'bulma/css/bulma.css'

export interface BoutProps {
    // contestants
    challenger: ContestantEntry;
    otherContestant: ContestantEntry;

    // dispatch functions
    submitBoutDispatch: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise<void>;

}

const Bout = ({ challenger, otherContestant, submitBoutDispatch }: BoutProps) => {
    if (_.isNil(otherContestant)) {
        return (
            <div>No more contestants!</div>
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