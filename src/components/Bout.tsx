import * as React from 'react';
import './Hello.css';
import { SubmitBoutCallType, searchContestantsCall, ChangeChallengerThunkType } from '../actions/kingsApiActions';
import { ChangeCategoryIdType } from '../actions/globalPreferenceActions';
import { ContestantEntry, LatLon, Category } from "../types/index"
import Contestant from './Contestant';
import * as _ from 'lodash'
import Select, { Options, Option, Async } from 'react-select'
import 'react-select/dist/react-select.css';
import { CATEGORY_TYPE } from '../constants';

export interface BoutProps {
    // global
    latLon: LatLon;
    categoryType: CATEGORY_TYPE;
    categoryId: number;
    categories: Category[];

    // contestants
    challenger: ContestantEntry;
    contestantsEntries: ContestantEntry[];
    currContestantIndex: number;

    // dispatch functions
    submitBoutThunk: SubmitBoutCallType;
    changeCategoryId: ChangeCategoryIdType;
    changeChallengerThunk: ChangeChallengerThunkType;
}

const Bout = ({
    latLon,
    categoryType,
    categoryId,
    categories,

    challenger,
    contestantsEntries,
    currContestantIndex,

    submitBoutThunk,
    changeCategoryId,
    changeChallengerThunk }: BoutProps) => {

    let otherContestant: ContestantEntry = contestantsEntries[currContestantIndex];

    return (
        <div>
            <div>
                <Async
                    name="challenger"
                    clearable={false}
                    onChange={(value: ContestantEntry) => changeChallengerThunk(value)}
                    valueKey="contestantId" labelKey="contestantName"
                    loadOptions={(input: string) => searchContestants(
                        latLon, categoryType, input)} />
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
                        <button onClick={() => submitBoutThunk(
                            challenger,
                            challenger.contestantId,
                            otherContestant.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            CHALLENGER
                        </button>
                        <button onClick={() => submitBoutThunk(
                            challenger,
                            otherContestant.contestantId,
                            challenger.contestantId,
                            challenger.categoryId,
                            currContestantIndex)} >
                            OTHER GUY
                        </button>

                        {/* <button onClick={() => requestContestantsThunk(latLon, challenger.categoryId)}>
                            FETCH
                        </button> */}
                    </div>
                </div>
            }
        </div>
    );
}

const searchContestants =
    (latLon: LatLon, categoryType: CATEGORY_TYPE, searchString: string) => {
        if (_.isEmpty(searchString) || searchString.length < 2) {
            return Promise.resolve({ options: [] })
        }
        return searchContestantsCall(latLon, categoryType, searchString)
            .then((entries: ContestantEntry[]) => {
                return { options: entries }
            })
    }

const transformCategoriesToSelectOptions =
    (categories: Category[]): Options => _.map(categories, category => ({
        value: category.categoryId,
        label: category.categoryName
    }))


export default Bout;