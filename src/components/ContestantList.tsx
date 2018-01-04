import * as React from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { ContestantEntry } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { toggleSkipContestantId } from '../actions/ContestantActions';
import { setContestantModal } from '../actions/GlobalActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';
import { findNextContestantIndex } from '../utils/ContestantUtils';
import '../index.css'

export interface ContestantListProps {
    contestants: ContestantEntry[];
    skipContestantIds: number[]
    currContestantIndex: number;
}

const rowRenderer: (contestants: ContestantEntry[], currContestantIndex: number) => ListRowRenderer =
    (contestants, currContestantIndex) =>
        ({ index, isScrolling, key, style }) => {
            return (
                <div style={style} key={index}>
                    <ContestantPreviewContainer
                        key={contestants[index].contestant.contestantId}

                        contestant={contestants[index]}
                        isSkipped={false}
                        isPassed={currContestantIndex >= index}

                        setContestantModal={setContestantModal}
                        toggleSkipContestantId={toggleSkipContestantId}
                    />
                </div>
            )
        }

const ContestantList = ({ contestants, skipContestantIds, currContestantIndex }: ContestantListProps) => {
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
                        rowRenderer={rowRenderer(contestants, currContestantIndex)}
                        width={width}
                        scrollToIndex={findNextContestantIndex(contestants, skipContestantIds, currContestantIndex) !== -1 ?
                            currContestantIndex + 1 : currContestantIndex}
                        scrollToAlignment={"start"}
                    />
                )}
            </AutoSizer>
        </div>

    );
}

export default ContestantList