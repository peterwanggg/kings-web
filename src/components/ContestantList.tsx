import * as React from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { ContestantEntry } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { toggleSkipContestantId } from '../actions/ContestantActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';
import '../index.css'

export interface ContestantListProps {
    contestants: ContestantEntry[];
    currContestantIndex: number;
}

const rowRenderer: (contestants: ContestantEntry[]) => ListRowRenderer =
    (contestants: ContestantEntry[]) =>
        ({ index, isScrolling, key, style }) => {
            return (
                <div style={style}>
                    <ContestantPreviewContainer
                        key={contestants[index].contestantId}
                        contestant={contestants[index]}
                        toggleSkipContestantId={toggleSkipContestantId}
                        isSkipped={false}
                    />
                </div>
            )
        }

const ContestantList = ({ contestants, currContestantIndex }: ContestantListProps) => {
    return (
        <div className="cList">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        // noRowsRenderer={this._noRowsRenderer}
                        rowCount={contestants.length}
                        rowHeight={120}
                        rowRenderer={rowRenderer(contestants)}
                        width={width}
                        scrollToIndex={currContestantIndex}
                        scrollToAlignment={"start"}
                    />
                )}
            </AutoSizer>
        </div>

    );
}

export default ContestantList