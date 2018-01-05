import * as React from 'react';
import { CategorySummary, ContestantEntry, Contestant } from '../types/index';
import * as _ from 'lodash';
import { RANK_TYPE, ROUTE_TYPE, BOUT_ROUTE } from '../constants/index';
import * as numeral from 'numeral'
import { ReceiveChallengersResponseAction, ReceiveContestantsResponseAction } from '../actions/ContestantActions';

type dispatchChangeRoute = (route: ROUTE_TYPE) => void;
type dispatchRequestChallengersThunk = (challenger: Contestant) => Promise<ReceiveChallengersResponseAction>
type dispatchRequestContestantsThunk = (categoryId: number) => Promise<ReceiveContestantsResponseAction>

export interface CategorySummaryProps {
    rankType: RANK_TYPE;
    categorySummary: CategorySummary;
    dispatchChangeRoute: dispatchChangeRoute;
    dispatchRequestChallengersThunk: dispatchRequestChallengersThunk;
    dispatchRequestContestantsThunk: dispatchRequestContestantsThunk
    // dispatchChangeCategoryId: dispatchChangeCategoryId;
}

const judgeChallenger = (challenger: Contestant,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchRequestChallengersThunk: dispatchRequestChallengersThunk) => {

    dispatchChangeRoute(BOUT_ROUTE);
    dispatchRequestChallengersThunk(challenger);
}

const judgeCategory = (categoryId: number,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchRequestContestantsThunk: dispatchRequestContestantsThunk) => {

    dispatchChangeRoute(BOUT_ROUTE);
    dispatchRequestContestantsThunk(categoryId);
}

const renderContestantRow = (rankType: RANK_TYPE,
    entry: ContestantEntry,
    dispatchChangeRoute: dispatchChangeRoute,
    dispatchRequestChallengersThunk: dispatchRequestChallengersThunk) => {

    let contestant = entry.contestant;
    let stats = entry.contestantStats;
    let bouts = stats.winCount + stats.loseCount;
    let rank = _.get(stats.ranks, rankType);
    return (
        <tr>
            <th>{_.get(stats.ranks, rankType)}</th>
            <th onClick={() => judgeChallenger(contestant, dispatchChangeRoute, dispatchRequestChallengersThunk)}>
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
    dispatchRequestChallengersThunk,
    dispatchRequestContestantsThunk }: CategorySummaryProps) => {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title hoverable" onClick={() => judgeCategory(
                        categorySummary.category.categoryId,
                        dispatchChangeRoute,
                        dispatchRequestContestantsThunk
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
                                    entry => renderContestantRow(rankType, entry, dispatchChangeRoute, dispatchRequestChallengersThunk))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CategorySummarySection;
