import * as React from 'react';
import { ContestantEntry } from "../types/index"
import Contestant from './Contestant';
import 'react-select/dist/react-select.css';
import 'bulma/css/bulma.css'
import { isNilContestant } from '../utils/ContestantUtils';
import { SkipContestantAction, ReceiveNextContestantAction } from '../actions/ContestantActions';
import { BOUT_MODE_TYPE, CHALLENGER } from '../constants/index';

export interface BoutProps {
    // contestants
    left: ContestantEntry;
    right: ContestantEntry;
    boutMode: BOUT_MODE_TYPE;

    // dispatch functions
    dispatchSubmitBout: (left: ContestantEntry, winnerContestantId: number, loserContestantId: number) => Promise<ReceiveNextContestantAction>;
    dispatchSkipContestant: (skipContestantId: number, otherContestantId: number) => SkipContestantAction;
}

const Bout = ({ left, right, boutMode, dispatchSubmitBout, dispatchSkipContestant }: BoutProps) => {
    if (isNilContestant(right)
        || isNilContestant(left)
        || left.contestant.contestantId === right.contestant.contestantId) {
        return (
            <div className="tile is-parent">No more contestants!</div>
        )
    }

    return (
        <div className="tile is-parent">
            {boutMode === CHALLENGER ? <div /> :
                <a className="button" onClick={() => dispatchSkipContestant(
                    left.contestant.contestantId,
                    right.contestant.contestantId)}
                >Skip</a>
            }
            <div className="tile is-child hoverable" onClick={() => dispatchSubmitBout(
                left,
                left.contestant.contestantId,
                right.contestant.contestantId)}
            >
                <h2>Challenger: {left.contestant.contestantName}</h2>
                <Contestant contestant={left} />
            </div>


            <a className="button" onClick={() => dispatchSkipContestant(
                    right.contestant.contestantId,
                    left.contestant.contestantId)}
            >Skip</a>
            <div className="tile is-child hoverable" onClick={() => dispatchSubmitBout(
                left,
                right.contestant.contestantId,
                left.contestant.contestantId)}
            >
                <h2>Contestant: {right.contestant.contestantName}</h2>
                <Contestant contestant={right} />
            </div>
        </div>

    );
}

export default Bout;