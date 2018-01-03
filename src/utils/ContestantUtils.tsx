import { ContestantEntry } from "../types/index";
import * as _ from 'lodash';

export const findNextContestantIndex =
    (contestants: ContestantEntry[], skipContestantIds: number[], currContestantIndex: number): number => {
        if (currContestantIndex >= contestants.length - 1) {
            return -1;
        }
        return _.findIndex(
            contestants,
            contestant => !_.includes(skipContestantIds, contestant.contestantId),
            currContestantIndex + 1);
    }