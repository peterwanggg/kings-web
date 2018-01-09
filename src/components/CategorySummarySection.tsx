import * as React from 'react';
import { CategorySummary, ContestantEntry, Contestant } from '../types/index';
import * as _ from 'lodash';
import { RANK_TYPE, ROUTE_TYPE, BOUT_ROUTE } from '../constants/index';
import * as numeral from 'numeral'
// import { ChangeCategoryIdThunkAction, ChangeChallengerIdThunkAction } from '../actions/ContestantActions';

type dispatchChangeRoute = (route: ROUTE_TYPE) => void;
type dispatchChangeChallengerIdThunk = (challengerContestantId: number) => void;
type dispatchChangeCategoryIdThunk = (categoryId: number) => void;


export interface CategorySummaryProps {
    rankType: RANK_TYPE;
    categorySummary: CategorySummary;

    dispatchChangeRoute: dispatchChangeRoute;
    dispatchChangeChallengerIdThunk: dispatchChangeChallengerIdThunk;
    dispatchChangeCategoryIdThunk: dispatchChangeCategoryIdThunk;
}

const judgeChallenger = (challenger: Contestant,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchChangeChallengerIdThunk: dispatchChangeChallengerIdThunk) => {

    dispatchChangeRoute(BOUT_ROUTE);
    dispatchChangeChallengerIdThunk(challenger.contestantId);
}

const judgeCategory = (categoryId: number,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchChangeCategoryIdThunk: dispatchChangeCategoryIdThunk) => {

    dispatchChangeRoute(BOUT_ROUTE);
    dispatchChangeCategoryIdThunk(categoryId);
}

const renderContestantRow = (rankType: RANK_TYPE,
    entry: ContestantEntry,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchChangeChallengerIdThunk: dispatchChangeChallengerIdThunk) => {

    let contestant = entry.contestant;
    let stats = entry.contestantStats;
    let bouts = stats.winCount + stats.loseCount;
    let rank = _.get(stats.ranks, rankType);
    return (
        <tr key={entry.contestant.contestantId}>
            <th>{_.get(stats.ranks, rankType)}</th>
            <th onClick={() => judgeChallenger(contestant, dispatchChangeRoute, dispatchChangeChallengerIdThunk)}>
                <a className="button">⚔️️</a>
            </th>
            <td>{(rank === 1 ? "👑 " : "") + contestant.contestantName + (rank === 1 ? " 👑" : "")}</td>
            <td>{stats.winCount}</td>
            <td>{stats.loseCount}</td>
            <td>{bouts}</td>
            <td>{numeral(stats.winCount / bouts).format('0 %')}</td>
        </tr>
    );
}

const CategorySummarySection = ({
    rankType,
    categorySummary,
    dispatchChangeRoute,
    dispatchChangeChallengerIdThunk,
    dispatchChangeCategoryIdThunk }: CategorySummaryProps) => {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title hoverable" onClick={() => judgeCategory(
                        categorySummary.category.categoryId,
                        dispatchChangeRoute,
                        dispatchChangeCategoryIdThunk
                    )}>
                        ⚔️ {categorySummary.category.categoryName}
                    </h1>

                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Judge Now</th>
                                <th>Contestant</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Bouts</th>
                                <th>Win Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(categorySummary.contestantEntries,
                                    entry => renderContestantRow(rankType, entry, dispatchChangeRoute, dispatchChangeChallengerIdThunk))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CategorySummarySection;
