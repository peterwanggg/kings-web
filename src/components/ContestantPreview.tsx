import * as React from 'react';
import { ContestantEntry } from '../types/index';
import { ToggleSkipContestantIdType } from '../actions/ContestantActions';

export interface ContestantPreviewProps {
    contestant: ContestantEntry;
    isSkipped: boolean;
    isPassed: boolean;

    // action
    toggleSkipContestantId: ToggleSkipContestantIdType;
}

const ContestantPreview = ({ contestant, isSkipped, isPassed, toggleSkipContestantId }: ContestantPreviewProps) => {
    return (
        <div className="box">
            <input
                disabled={isPassed}
                type="checkbox"
                checked={!isSkipped}
                onChange={() => toggleSkipContestantId(contestant.contestantId)}
            />
            {contestant.contestantName}
            <figure className="image is-96x96">
                <img src={contestant.imageUrl} />
            </figure>
        </div>

    );
}

export default ContestantPreview;
