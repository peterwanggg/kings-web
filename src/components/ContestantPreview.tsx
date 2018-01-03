import * as React from 'react';
import { ContestantEntry } from '../types/index';
import { ToggleSkipContestantIdType } from '../actions/ContestantActions';

export interface ContestantPreviewProps {
    contestant: ContestantEntry;
    isSkipped: boolean;
    isPassed: boolean;
    toggleSkipContestantId: ToggleSkipContestantIdType;
}

const ContestantPreview = ({ contestant, isSkipped, isPassed, toggleSkipContestantId }: ContestantPreviewProps) => {
    return (
        <div>
            <input
                disabled={isPassed}
                type="checkbox"
                checked={!isSkipped}
                onChange={() => toggleSkipContestantId(contestant.contestantId)}
            />
            {contestant.contestantName}
            <img height="100" width="100" src={contestant.imageUrl} />
        </div>
    );
}

export default ContestantPreview;
