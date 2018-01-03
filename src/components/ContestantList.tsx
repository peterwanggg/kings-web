import * as React from 'react';
import {
    AutoSizer,
    List,
    ListRowRenderer,
} from 'react-virtualized';
import { ContestantEntry, LatLon } from '../types/index';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { toggleSkipContestantId, ReceiveChallengersResponseAction } from '../actions/ContestantActions';
import ContestantPreviewContainer from '../containers/ContestantPreviewContainer';
import { findNextContestantIndex } from '../utils/ContestantUtils';
import '../index.css'
import * as _ from 'lodash';

export interface ContestantListProps {
    latLon: LatLon;

    contestants: ContestantEntry[];
    challenger: ContestantEntry;
    skipContestantIds: number[]
    currContestantIndex: number;

    dispatchRequestChallengers: (latLon: LatLon, challenger: ContestantEntry, offset: number) => Promise<ReceiveChallengersResponseAction>
}

const rowRenderer: (contestants: ContestantEntry[], currContestantIndex: number) => ListRowRenderer =
    (contestants, currContestantIndex) =>
        ({ index, isScrolling, key, style }) => {
            return (
                <div style={style} key={index}>
                    {_.isNil(contestants[index]) ?
                        <div />
                        :
                        <ContestantPreviewContainer
                            contestant={contestants[index]}
                            toggleSkipContestantId={toggleSkipContestantId}
                            isSkipped={false}
                            isPassed={currContestantIndex >= index}
                        />
                    }
                </div>
            )
        }

const ContestantList = ({ latLon, contestants, challenger, skipContestantIds, currContestantIndex, dispatchRequestChallengers }: ContestantListProps) => {
    return (
        <div className="cList">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        // noRowsRenderer={this._noRowsRenderer}
                        rowCount={contestants.length}
                        rowHeight={120}
                        rowRenderer={rowRenderer(contestants, currContestantIndex)}
                        width={width}
                        // ref={registerChild}
                        scrollToIndex={findNextContestantIndex(contestants, skipContestantIds, currContestantIndex) != -1 ?
                            currContestantIndex + 1 : currContestantIndex}
                        scrollToAlignment={"start"}
                    />
                )}
            </AutoSizer>
        </div >
    );
}









// const isRowLoaded: (contestants: ContestantEntry[]) => (params: Index) => boolean =
//     contestants => params => {
//         console.log("is row loaded=" + (index.index < numContestants) + ", numContestants=" + numContestants + ", index=" + index.index)
//         // return index.index < numContestants;
//         return _.isNil(contestants[params.index])
//     }

// const remoteRowCount: number = 100

// const ContestantList = ({ latLon, contestants, challenger, skipContestantIds, currContestantIndex, dispatchRequestChallengers }: ContestantListProps) => {
//     return (
//         <div className="cList">
//             {_.isEmpty(contestants) || _.isNil(challenger) ?
//                 <div>Loading</div>
//                 :
//                 <InfiniteLoader
//                     // minimumBatchSize={1}
//                     isRowLoaded={isRowLoaded(contestants)}
//                     // isRowLoaded={(index: any) => false}
//                     loadMoreRows={
//                         (params: IndexRange) => {
//                             console.log("load more rows");
//                             return dispatchRequestChallengers(latLon, challenger, params.startIndex)
//                         }
//                     }
//                     rowCount={remoteRowCount}
//                 >
//                     {({ onRowsRendered, registerChild }) => (
//                 <AutoSizer>
//                     {({ height, width }) => (
//                         <List
//                             height={height}
//                             // noRowsRenderer={this._noRowsRenderer}
//                             rowCount={contestants.length}
//                             rowHeight={120}
//                             rowRenderer={rowRenderer(contestants, currContestantIndex)}
//                             width={width}
//                         // ref={registerChild}
//                         // scrollToIndex={findNextContestantIndex(contestants, skipContestantIds, currContestantIndex) != -1 ?
//                         //     currContestantIndex + 1 : currContestantIndex}
//                         // scrollToAlignment={"start"}
//                         />
//                     )}
//                 </AutoSizer>
//                     )}
//                 </InfiniteLoader>
//             }
//         </div >

//     );
// }

export default ContestantList