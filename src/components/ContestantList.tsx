import * as React from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { ContestantEntry } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { toggleSkipContestantId } from '../actions/ContestantActions';
import { setContestantModal } from '../actions/GlobalActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';
import { findNextContestantIndex, isPassed } from '../utils/ContestantUtils';
import '../index.css'

export interface ContestantListProps {
    contestants: ContestantEntry[];
    skipContestantIds: number[]
    currContestantIndex: number;
    challengerContestantId: number;
}

const rowRenderer: (contestants: ContestantEntry[], currContestantIndex: number, challengerContestantId: number) => ListRowRenderer =
    (contestants, currContestantIndex, challengerContestantId) =>
        ({ index, isScrolling, key, style }) => {
            let contestantEntry: ContestantEntry = contestants[index];

            return (
                <div style={style} key={index}>
                    <ContestantPreviewContainer
                        key={contestantEntry.contestant.contestantId}
                        contestant={contestantEntry}
                        isSkipped={false}
                        isPassed={isPassed(
                            contestantEntry.contestant.contestantId,
                            contestants,
                            challengerContestantId,
                            currContestantIndex)}
                        isInBout={index === currContestantIndex ||
                            contestantEntry.contestant.contestantId === challengerContestantId}
                        setContestantModal={setContestantModal}
                        toggleSkipContestantId={toggleSkipContestantId}
                    />
                </div>
            )
        }


const ContestantList = ({ contestants, skipContestantIds, currContestantIndex, challengerContestantId }: ContestantListProps) => {
    return (
        <div className="cList">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        // noRowsRenderer={this._noRowsRenderer}
                        rowCount={contestants.length}
                        rowHeight={140}
                        style={({ outline: 'none' })}
                        rowRenderer={rowRenderer(contestants, currContestantIndex, challengerContestantId)}
                        width={width}
                        scrollToIndex={Math.max(
                            0,
                            (findNextContestantIndex(contestants, skipContestantIds, currContestantIndex) !== -1 ?
                                currContestantIndex + 1 : currContestantIndex) - 3)}
                        scrollToAlignment={"start"}
                    />
                )}
            </AutoSizer>
        </div>

    );
}

export default ContestantList