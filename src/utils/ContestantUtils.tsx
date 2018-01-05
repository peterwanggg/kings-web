import { ContestantEntry } from "../types/index";
import * as _ from 'lodash';
import { DEFAULT_CONTESTANT_ID } from "../constants/index";

export const findNextContestantIndex =
    (contestants: ContestantEntry[], skipContestantIds: number[], currContestantIndex: number): number => {
        if (currContestantIndex === contestants.length - 1) {
            return -1;
        }
        return _.findIndex(
            contestants,
            contestant => !_.includes(skipContestantIds, contestant.contestant.contestantId),
            currContestantIndex + 1);
    }

export const isPassed = (contestantId: number, contestantsEntries: ContestantEntry[], challengerContestantId: number, currContestantIndex: number): boolean =>
    _.findIndex(contestantsEntries, cE => cE.contestant.contestantId == contestantId) < currContestantIndex
    && contestantId != challengerContestantId

export const isNilContestant = (contestantEntry: ContestantEntry) =>
    _.isNil(contestantEntry) || contestantEntry.contestant.contestantId === DEFAULT_CONTESTANT_ID
