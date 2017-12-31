import * as React from 'react';
import './Hello.css';
import { SubmitBoutCallType } from '../actions/kingsApiActions';
import { ChangeCategoryIdType } from '../actions/globalPreferenceActions';
import { ContestantEntry, LatLon, Category } from "../types/index"
import Contestant from './Contestant';
import * as _ from 'lodash'
import Select, { Options, Option } from 'react-select'
import 'react-select/dist/react-select.css';

export interface BoutProps {
    // global
    latLon: LatLon;
    categoryId: number;
    categories: Category[];

    // contestants
    challenger: ContestantEntry;
    contestantsEntries: ContestantEntry[];
    currContestantIndex: number;

    // dispatch functions
    submitBoutCall: SubmitBoutCallType;
    changeCategoryId: ChangeCategoryIdType;
}

const transformCategoriesToSelectOptions =
    (categories: Category[]): Options =>
        _.map(categories, category => ({
            value: category.categoryId,
            label: category.categoryName,
        })
        )

const Bout = ({
    latLon,
    categoryId,
    categories,
    contestantsEntries,
    challenger,
    currContestantIndex,
    submitBoutCall,
    changeCategoryId }: BoutProps) => {

    let otherContestant: ContestantEntry = contestantsEntries[currContestantIndex];

    return (
        <div>
            <div>
                <Select
                    name="categories"
                    value={categoryId}
                    clearable={false}
                    onChange={(selectedOption: Option) => {
                        changeCategoryId(Number(selectedOption.value))
                    }}
                    options={transformCategoriesToSelectOptions(categories)} />
            </div>


            {_.isNil(otherContestant) ?
                <div /> :

                <div className="hello">
                    <div className="greeting">
                        Challenger:
                        <Contestant contestant={challenger} />
                    </div>

                    <div className="greeting">
                        Other Guy:
                        <Contestant contestant={otherContestant} />
                    </div>

                    <div>
                        <button onClick={() => submitBoutCall(
                            challenger.contestantId,
                            otherContestant.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            CHALLENGER
                        </button>
                        <button onClick={() => submitBoutCall(
                            otherContestant.contestantId,
                            challenger.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            OTHER GUY
                        </button>

                        {/* <button onClick={() => requestContestantsCall(latLon, challenger.categoryId)}>
                            FETCH
                        </button> */}
                    </div>
                </div>
            }
        </div>
    );
}



export default Bout;