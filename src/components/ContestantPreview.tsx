import * as React from 'react';
import { ContestantEntry } from '../types/index';
import { ToggleSkipContestantIdType } from '../actions/ContestantActions';
import { SetContestantModalType } from '../actions/GlobalActions';
import 'font-awesome/css/font-awesome.css'

export interface ContestantPreviewProps {
    contestant: ContestantEntry;
    isSkipped: boolean;
    isPassed: boolean;
    isInBout: boolean;

    // action
    toggleSkipContestantId: ToggleSkipContestantIdType;
    setContestantModal: SetContestantModalType;
}

const skipCheckbox = (contestant: ContestantEntry,
    isSkipped: boolean,
    isPassed: boolean,
    isInBout: boolean,
    toggleSkipContestantId: ToggleSkipContestantIdType) => {

    const spanClassName = (isSkipped: boolean, isPassed: boolean, isInBout: boolean) =>
        "icon is-large " +
        (isInBout ? "has-text-danger" :
            (isPassed ? "has-text-info" :
                (isSkipped ? "has-text-warning" : "has-text-success")))

    const iClassName = (isSkipped: boolean, isPassed: boolean, isInBout: boolean) =>
        isInBout ? "fa fa-arrow-left" :
            isPassed ? "fa fa-repeat" :
                isSkipped ? "fa fa-minus" : "fa fa-check"

    return (
        <span className={spanClassName(isSkipped, isPassed, isInBout)} onClick={() => toggleSkipContestantId(contestant.contestant.contestantId)}>
            <i className={iClassName(isSkipped, isPassed, isInBout)} />
        </span>
    )
}

const ContestantPreview = ({ contestant, isSkipped, isPassed, isInBout, toggleSkipContestantId, setContestantModal }: ContestantPreviewProps) => {
    return (
        <div className="tile is-ancestor box">
            <div className="tile is-1">
                {skipCheckbox(contestant, isSkipped, isPassed, isInBout, toggleSkipContestantId)}
            </div>

            <div className="tile is-parent" onClick={() => { setContestantModal(contestant) }} >

                <div className="tile">
                    <figure className="image is-96x96">
                        <img src={contestant.contestant.imageUrl} onClick={() => { setContestantModal(contestant) }} />
                    </figure>
                </div>

                <div className="tile is-parent is-vertical">
                    <div className="tile">
                        {contestant.contestant.contestantName}
                    </div>
                    {isPassed ?
                        <div className="tile">
                            {contestant.contestantStats.winCount} - {contestant.contestantStats.loseCount}
                        </div>
                        :
                        <div />
                    }
                </div>
            </div>
        </div>

    );
}

export default ContestantPreview;
