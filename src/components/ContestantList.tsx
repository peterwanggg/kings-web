import * as React from 'react';
import { List, ListRowRenderer } from 'react-virtualized';
import { ContestantEntry } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
// import ContestantPreview from './ContestantPreview';
import {  toggleSkipContestantId } from '../actions/ContestantActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';

export interface ContestantListProps {
    contestants: ContestantEntry[];
    currContestantIndex: number;
}

const rowRenderer: (contestants: ContestantEntry[]) => ListRowRenderer =
    (contestants: ContestantEntry[]) =>
        ({ index, isScrolling, key, style }) => {
            return (
                <ContestantPreviewContainer
                    key={contestants[index].contestantId}
                    contestant={contestants[index]}
                    toggleSkipContestantId={toggleSkipContestantId}
                    isSkipped={false}
                />
            )
        }

const ContestantList = ({ contestants, currContestantIndex }: ContestantListProps) => {
    return (
        <List
            height={500}
            // noRowsRenderer={this._noRowsRenderer}
            rowCount={contestants.length}
            rowHeight={120}
            rowRenderer={rowRenderer(contestants)}
            width={500}
            scrollToIndex={currContestantIndex}
        />
    );
}

export default ContestantList