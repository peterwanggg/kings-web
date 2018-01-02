import * as React from 'react';
import { ContestantEntry } from '../types/index';

export interface ContestantProps {
    contestant: ContestantEntry;
}

const Contestant = ({ contestant }: ContestantProps) => {
    return (
        <div>
            <img src={contestant.imageUrl} />
        </div>
    );
}

export default Contestant;
