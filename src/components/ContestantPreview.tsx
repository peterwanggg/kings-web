import * as React from 'react';
import { ContestantEntry } from '../types/index';
import { ToggleSkipContestantIdType } from '../actions/ContestantActions';
import { SetContestantModalType } from '../actions/GlobalActions';
import 'font-awesome/css/font-awesome.css'

export interface ContestantPreviewProps {
    contestant: ContestantEntry;
    isSkipped: boolean;
    isInBout: boolean;

    // action
    toggleSkipContestantId: ToggleSkipContestantIdType;
    setContestantModal: SetContestantModalType;
}

const aClassName = (isInBout: boolean) => isInBout ? "" : "button";

const spanClassName = (isSkipped: boolean, isInBout: boolean) =>
    "icon is-large " +
    (isInBout ? "has-text-danger" :
        isSkipped ? "has-text-warning" : "has-text-success")

const iClassName = (isSkipped: boolean, isInBout: boolean) =>
    isInBout ? "fa fa-arrow-left" :
        isSkipped ? "fa fa-minus" : "fa fa-check"

const skipCheckbox = (contestant: ContestantEntry,
    isSkipped: boolean,
    isInBout: boolean,
    toggleSkipContestantId: ToggleSkipContestantIdType,
    setContestantModal: SetContestantModalType) => {

    return (
        <a
            className={aClassName(isInBout)}
            onClick={() => !isInBout ?
                toggleSkipContestantId(contestant.contestant.contestantId) :
                setContestantModal(contestant)}
        >
            <span className={spanClassName(isSkipped, isInBout)}>
                <i className={iClassName(isSkipped, isInBout)} />
            </span>
        </a>
    )
}

const ContestantPreview = ({ contestant, isSkipped, isInBout, toggleSkipContestantId, setContestantModal }: ContestantPreviewProps) => {
    return (
        <div className="tile is-ancestor box">
            <div className="tile is-1">
                {skipCheckbox(contestant, isSkipped, isInBout, toggleSkipContestantId, setContestantModal)}
            </div>

            <div className="tile is-parent hoverable" onClick={() => { setContestantModal(contestant) }} >
                <div className="tile">
                    <figure className="image is-96x96">
                        <img src={contestant.contestant.imageUrl} />
                    </figure>
                </div>

                <div className="tile is-parent is-vertical">
                    <div className="tile">
                        {contestant.contestant.contestantName}
                    </div>
                    <div className="tile">
                        {contestant.contestantStats.winCount} - {contestant.contestantStats.loseCount}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ContestantPreview;
