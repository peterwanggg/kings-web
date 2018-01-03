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
    return (
        <div>
            {_.isNil(otherContestant) ?
                <div>
                    No more contestants!
                </div>
                :
                <div className="tile is-parent">
                    <div className="tile is-child is-fullwidth">
                        <button className="button is-fullwidth is-large" onClick={() => submitBoutDispatch(
                            challenger,
                            challenger.contestantId,
                            otherContestant.contestantId)} >
                            Challenger: 👑 {challenger.contestantName} 👑
                        </button>
                        <Contestant contestant={challenger} />
                    </div>

                    <div className="tile is-child is-fullwidth">
                        <button className="button is-fullwidth is-large" onClick={() => submitBoutDispatch(
                            challenger,
                            otherContestant.contestantId,
                            challenger.contestantId)} >
                            Other Contestant: 👑 {otherContestant.contestantName} 👑
                        </button>
                        <Contestant contestant={otherContestant} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Bout;