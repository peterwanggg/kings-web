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
                <div /> :

                <div className="columns">
                    <div className="column">
                        Challenger:
                        <Contestant contestant={challenger} />
                    </div>

                    <div className="column">
                        Other Guy:
                        <Contestant contestant={otherContestant} />
                    </div>

                    <div>
                        <button onClick={() => submitBoutDispatch(
                            challenger,
                            challenger.contestantId,
                            otherContestant.contestantId)} >
                            CHALLENGER
                        </button>
                        <button onClick={() => submitBoutDispatch(
                            challenger,
                            otherContestant.contestantId,
                            challenger.contestantId)} >
                            OTHER GUY
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Bout;