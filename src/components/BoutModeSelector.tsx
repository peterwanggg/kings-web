import * as React from 'react';
import { BOUT_MODE_TYPE, CHALLENGER, ROULETTE } from '../constants/index';
import { ChangeBoutModeType } from '../actions/GlobalActions';

export interface BoutModeSelectorProps {
    boutMode: BOUT_MODE_TYPE;
    dispatchChangeBoutMode: ChangeBoutModeType;
}

const buttonClassName =
    (boutMode: BOUT_MODE_TYPE, buttonBoutMode: BOUT_MODE_TYPE) =>
        "button is-rounded is-fullwidth " + ((boutMode === buttonBoutMode) ? "is-success is-selected" : "")

const Contestant = ({ boutMode, dispatchChangeBoutMode }: BoutModeSelectorProps) => {
    return (
        <div className="tile is-vertical">
            <div className="tile is-child">
                <span
                    className={buttonClassName(boutMode, CHALLENGER)}
                    onClick={() => dispatchChangeBoutMode(CHALLENGER)}
                >
                    {CHALLENGER}
                </span>
            </div>
            <div className="tile is-child">
                <span
                    className={buttonClassName(boutMode, ROULETTE)}
                    onClick={() => dispatchChangeBoutMode(ROULETTE)}
                >
                    {ROULETTE}
                </span>
            </div>
        </div>
    );
}

export default Contestant;
