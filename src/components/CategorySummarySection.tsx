import * as React from 'react';
import { CategorySummary, ContestantEntry } from '../types/index';
import * as _ from 'lodash';
import { RANK_TYPE } from '../constants/index';
import * as numeral from 'numeral'

export interface CategorySummaryProps {
    rankType: RANK_TYPE;
    categorySummary: CategorySummary;
}

const renderContestantRow = (rankType: RANK_TYPE, entry: ContestantEntry) => {
    let contestant = entry.contestant;
    let stats = entry.contestantStats;
    let bouts = stats.winCount + stats.loseCount;
    return (
        <tr>
            <th>{_.get(stats.ranks, rankType)}</th>
            <td>{contestant.contestantName}</td>
            <td>{stats.winCount}</td>
            <td>{stats.loseCount}</td>
            <td>{bouts}</td>
            <td>{numeral(stats.winCount / bouts).format('0 %')}</td>
        </tr>
    );
}

const CategorySummarySection = ({ rankType, categorySummary }: CategorySummaryProps) => {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {categorySummary.category.categoryName}
                    </h1>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Rank</th>
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
                                    entry => renderContestantRow(rankType, entry))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CategorySummarySection;
