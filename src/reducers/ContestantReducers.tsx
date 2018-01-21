import {
    RECEIVE_CONTESTANTS,
    SUBMIT_BOUT,
    TOGGLE_SKIP_CONTESTANT_ID,
    RECEIVE_MATCH,
    RECEIVE_NEXT_CONTESTANT,
    RECEIVE_CONTESTANT_SKIPS
} from '../constants';
import {
    INITIAL_STATE,
    ContestantEntry,
    MatchState,
    ContestantEntryMap,
} from '../types/index';
import {
    ReceiveContestantsResponseAction,
    SubmitBoutResponseAction,
    ToggleSkipContestantIdAction,
    ReceiveMatchResponseAction,
    ReceiveNextContestantAction,
    ReceiveContestantSkipsResponseAction
} from '../actions/ContestantActions';
import * as _ from 'lodash';

export const match =
    (state: MatchState = INITIAL_STATE.match,
        action: ReceiveMatchResponseAction | ReceiveNextContestantAction
    ): MatchState => {
        switch (action.type) {
            case RECEIVE_MATCH:
                if (_.isNil(action.match)) {
                    return INITIAL_STATE.match;
                }
                if (state.right.contestant.contestantId === action.match.left.contestant.contestantId) {
                    return {
                        left: action.match.right,
                        right: action.match.left,
                    }
                } else {
                    return {
                        left: action.match.left,
                        right: action.match.right,
                    }
                }
            case RECEIVE_NEXT_CONTESTANT:
                if (_.isNil(action.nextContestant)) {
                    return INITIAL_STATE.match;
                }
                return {
                    left: state.left.contestant.contestantId === action.stayOnContestantId ?
                        state.left : action.nextContestant,
                    right: state.right.contestant.contestantId === action.stayOnContestantId ?
                        state.right : action.nextContestant
                }
            default:
                return state;
        }
    }

export const contestantEntries =
    (state: ContestantEntryMap = INITIAL_STATE.contestantEntries,
        action: ReceiveContestantsResponseAction | SubmitBoutResponseAction
    ): ContestantEntryMap => {
        switch (action.type) {
            case RECEIVE_CONTESTANTS:
                return _.keyBy(action.contestants, contestantEntry => contestantEntry.contestant.contestantId);
            case SUBMIT_BOUT:
                let updatedEntries: ContestantEntryMap = state;
                if (!_.isNil(updatedEntries[action.winnerContestantId])) {
                    updatedEntries[action.winnerContestantId] = updateContestantStats(
                        updatedEntries[action.winnerContestantId],
                        true)
                }
                if (!_.isNil(updatedEntries[action.loserContestantId])) {
                    updatedEntries[action.loserContestantId] = updateContestantStats(
                        updatedEntries[action.loserContestantId],
                        false)
                }
                return updatedEntries;
            default:
                return state;
        }
    }

export const skipContestantIds =
    (state: number[] = INITIAL_STATE.skipContestantIds,
        action: ToggleSkipContestantIdAction | ReceiveContestantSkipsResponseAction
    ): number[] => {
        switch (action.type) {
            case RECEIVE_CONTESTANT_SKIPS:
                return action.contestantSkips;
            case TOGGLE_SKIP_CONTESTANT_ID:
                let nextState: number[] =
                    _.includes(state, action.skipContestantId) ?
                        _.pull(state, action.skipContestantId) :
                        _.concat(state, action.skipContestantId)
                return nextState;
            default:
                return state;
        }
    }

// do not split this up into separate reducers, `contestants` is much easier to reason about
// in terms individual actions than the same action split up into multiple `contestant.XXX` reducers
// export const contestants =
//     (state: ContestantState = INITIAL_STATE.contestants, action:
//         ReceiveContestantsResponseAction |
//         SubmitBoutResponseAction |
//         ReceiveChallengersResponseAction |
//         ToggleSkipContestantIdAction |
//         ChangeBoutModeAction |
//         SkipContestantAction
//     ) => {
//         switch (action.type) {
//             case CHANGE_BOUT_MODE:
//                 return {
//                     ...state,
//                     entries: action.nextBoutMode === ROULETTE &&
//                         findNextContestantIndex(state.entries, state.skipContestantIds, state.currContestantIndex) !== -1 ?
//                         _.concat(
//                             _.take(state.entries, state.currContestantIndex + 1),
//                             _.shuffle(_.takeRight(state.entries, state.entries.length - state.currContestantIndex - 1))
//                         ) : state.entries
//                 };
//             // case TOGGLE_SKIP_CONTESTANT_ID:
//             //     return {
//             //         ...state,
//             //         skipContestantIds: _.includes(state.skipContestantIds, action.skipContestantId) ?
//             //             _.pull(state.skipContestantIds, action.skipContestantId) :
//             //             _.concat(state.skipContestantIds, action.skipContestantId)
//             //     };
//             case RECEIVE_CHALLENGERS:
//                 return {
//                     ...state,
//                     entryPage: action.page,
//                     entries: action.page === 1 ?
//                         action.contestants : _.concat(state.entries, action.contestants),
//                     challenger: action.challenger,
//                     currContestantIndex: action.page === 1 ?
//                         0
//                         : action.contestants.length > 0 ? state.entries.length : 0
//                 };
//             case RECEIVE_CONTESTANTS:
//                 return {
//                     ...state,
//                     entryPage: action.page,
//                     entries: action.page === 1 ?
//                         action.contestants :
//                         _.concat(state.entries, action.contestants),
//                     challenger: action.contestants.length > 1 ?
//                         action.contestants[0] :
//                         DEFAULT_CONTESTANT_ENTRY,
//                     currContestantIndex: action.page === 1 ?
//                         action.contestants.length > 1 ?
//                             1
//                             : INITIAL_STATE.contestants.currContestantIndex
//                         : action.contestants.length > 0 ? state.entries.length : 0
//                 }
//             // case SKIP_CONTESTANT:
//             //     return {
//             //         ...state,
//             //         challenger: action.skipContestantId === state.challenger.contestant.contestantId ?
//             //             state.entries[state.currContestantIndex] : state.challenger,
//             //         currContestantIndex: findNextContestantIndex(state.entries, state.skipContestantIds, state.currContestantIndex)
//             //     };
//             case SUBMIT_BOUT:
//                 let updatedEntries = state.entries;
//                 updatedEntries[state.currContestantIndex] = updateContestantStats(
//                     updatedEntries[state.currContestantIndex],
//                     action.winnerContestantId === updatedEntries[state.currContestantIndex].contestant.contestantId)
//                 let updatedChallenger = updateContestantStats(
//                     state.challenger,
//                     action.winnerContestantId === state.challenger.contestant.contestantId);

//                 return {
//                     ...state,
//                     entries: updatedEntries,
//                     challenger: action.boutMode === CHALLENGER ?
//                         updatedChallenger :
//                         state.challenger.contestant.contestantId === action.winnerContestantId ?
//                             updatedChallenger : updatedEntries[state.currContestantIndex],
//                     currContestantIndex: findNextContestantIndex(
//                         state.entries, state.skipContestantIds, state.currContestantIndex)
//                 };
//             default:
//                 return state;
//         }
//     }

const updateContestantStats = (contestantEntry: ContestantEntry, didWin: boolean): ContestantEntry => {
    if (_.isNil(contestantEntry)) {
        return contestantEntry;
    }

    if (didWin) {
        contestantEntry.contestantStats.winCount = contestantEntry.contestantStats.winCount + 1;
    } else {
        contestantEntry.contestantStats.loseCount = contestantEntry.contestantStats.loseCount + 1;
    }
    return contestantEntry;
}