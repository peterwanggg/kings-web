import * as React from 'react';
import { ContestantEntry } from '../types/index';
import { ToggleSkipContestantIdType } from '../actions/ContestantActions';
import { SetContestantModalType } from '../actions/GlobalActions';
import 'font-awesome/css/font-awesome.css'

export interface ContestantPreviewProps {
    contestant: ContestantEntry;
    isSkipped: boolean;
    isPassed: boolean;

    // action
    toggleSkipContestantId: ToggleSkipContestantIdType;
    setContestantModal: SetContestantModalType;
}

const skipCheckbox =
    (contestant: ContestantEntry, isSkipped: boolean, isPassed: boolean, toggleSkipContestantId: ToggleSkipContestantIdType) => {
        const spanClassName = (isSkipped: boolean, isPassed: boolean) =>
            "icon is-large " + (isPassed ? "has-text-info" : (isSkipped ? "has-text-warning" : "has-text-success"))
        const iClassName = (isSkipped: boolean, isPassed: boolean) =>
            isPassed ? "fa fa-repeat" : isSkipped ? "fa fa-minus" : "fa fa-check"
        return (
            <span className={spanClassName(isSkipped, isPassed)} onClick={() => toggleSkipContestantId(contestant.contestant.contestantId)}>
                <i className={iClassName(isSkipped, isPassed)} />
            </span>

        )
    }

const ContestantPreview = ({ contestant, isSkipped, isPassed, toggleSkipContestantId, setContestantModal }: ContestantPreviewProps) => {
    return (
        <div className="tile is-ancestor box">
            <div className="tile is-1">
                {skipCheckbox(contestant, isSkipped, isPassed, toggleSkipContestantId)}
            </div>

            <div className="tile is-parent" onClick={() => { setContestantModal(contestant) }} >
                <div className="tile">
                    <figure className="image is-96x96">
                        <img src={contestant.contestant.imageUrl} onClick={() => { setContestantModal(contestant) }} />
                    </figure>
                </div>
                <div className="tile">
                    {contestant.contestant.contestantName}
                </div>
            </div>
        </div>

    );
}

export default ContestantPreview;
