import * as React from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { ContestantEntry, ContestantEntryMap } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { setContestantModal } from '../actions/GlobalActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';
import '../index.css';
import * as _ from 'lodash';

export interface ContestantListProps {
    contestants: ContestantEntryMap;
    skipContestantIds: number[];
    leftContestantId: number;
    rightContestantId: number;
}

const rowRenderer: (contestants: ContestantEntryMap,
    leftContestantId: number,
    rightContestantId: number
) => ListRowRenderer =
    (contestantsMap, leftContestantId, rightContestantId) =>
        ({ index, isScrolling, key, style }) => {
            let contestantEntry: ContestantEntry = _.values(contestantsMap)[index];
            return (
                <div style={style} key={index}>
                    <ContestantPreviewContainer
                        key={contestantEntry.contestant.contestantId}
                        contestant={contestantEntry}
                        isSkipped={false}
                        isInBout={contestantEntry.contestant.contestantId === leftContestantId ||
                            contestantEntry.contestant.contestantId === rightContestantId}
                        setContestantModal={setContestantModal}
                        toggleSkipContestantId={(skipContestantId: number) => Promise.resolve()}
                    />
                </div>
            );
        };

const ContestantList =
    ({ contestants, skipContestantIds, leftContestantId, rightContestantId }: ContestantListProps) => {
        return (
            <div className="cList">
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            // noRowsRenderer={this._noRowsRenderer}
                            rowCount={_.size(contestants)}
                            rowHeight={140}
                            style={({ outline: 'none' })}
                            rowRenderer={rowRenderer(contestants, leftContestantId, rightContestantId)}
                            width={width}
                            // scrollToIndex={Math.max(
                            //     0,
                            //     (findNextContestantIndex(contestants, skipContestantIds, currContestantIndex) !== -1 ?
                            //         currContestantIndex + 1 : currContestantIndex) - 3)}
                            scrollToAlignment={"start"}
                        />
                    )}
                </AutoSizer>
            </div>

        );
    };

export default ContestantList;