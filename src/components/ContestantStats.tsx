import * as React from 'react';
import { ContestantStats } from '../types/index';

export interface ContestantProps {
    stats: ContestantStats;
}

const ContestantStats = ({ stats }: ContestantProps) => {
    return (
        <div>
            Record: {stats.winCount} - {stats.loseCount}
        </div>
    );
}
export default ContestantStats;
