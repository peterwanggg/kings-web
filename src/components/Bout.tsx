import * as React from 'react';
import { ContestantEntry } from "../types/index"
import Contestant from './Contestant';
import 'react-select/dist/react-select.css';
import 'bulma/css/bulma.css'
import { isNilContestant } from '../utils/ContestantUtils';
import { SkipContestantAction } from '../actions/ContestantActions';

export interface BoutProps {
    // contestants
    challenger: ContestantEntry;
    otherContestant: ContestantEntry;

    // dispatch functions
    dispatchSubmitBout: (challenger: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise<void>;
    dispatchSkipContestant: (skipContestantId: number, otherContestantId: number) => SkipContestantAction;
}

const Bout = ({ challenger, otherContestant, dispatchSubmitBout, dispatchSkipContestant }: BoutProps) => {
    if (isNilContestant(otherContestant)
        || isNilContestant(challenger)
        || challenger.contestant.contestantId === otherContestant.contestant.contestantId) {
        return (
            <div className="tile is-parent">No more contestants!</div>
        )
    }

    return (
        <div className="tile is-parent">
            <div className="tile is-child hoverable" onClick={() => dispatchSubmitBout(
                challenger,
                challenger.contestant.contestantId,
                otherContestant.contestant.contestantId)}
            >
                <h2>Challenger: {challenger.contestant.contestantName}
                <a className="button" onClick={() => dispatchSkipContestant(
                    challenger.contestant.contestantId,
                    otherContestant.contestant.contestantId)}
                >
                    Skip
                </a></h2>
                <Contestant contestant={challenger} />
            </div>

            <div className="tile is-child hoverable" onClick={() => dispatchSubmitBout(
                challenger,
                otherContestant.contestant.contestantId,
                challenger.contestant.contestantId)}
            >
                <h2>Contestant: {otherContestant.contestant.contestantName}
                <a
                    className="button"
                    onClick={() => dispatchSkipContestant(
                        otherContestant.contestant.contestantId,
                        challenger.contestant.contestantId)}
                >
                    Skip
                </a></h2>
                <Contestant contestant={otherContestant} />
            </div>
        </div>

    );
}

export default Bout;