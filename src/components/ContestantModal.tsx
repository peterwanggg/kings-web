import * as React from 'react';
import * as ReactModal from 'react-modal';
import { ContestantEntry } from '../types/index';
import Contestant from './Contestant';
import * as _ from 'lodash';
import { SetContestantModalType } from '../actions/GlobalActions';
import ContestantStats from './ContestantStats';

export interface ContestantModalProps {
    contestant: ContestantEntry;
    showStats: boolean;
    setContestantModal: SetContestantModalType;
}

ReactModal.setAppElement('#root');



const ContestantModal = ({ contestant, showStats, setContestantModal }: ContestantModalProps) => {
    if (_.isNil(contestant)) {
        return (
            <div />
        );
    }
    const closeModal = () => setContestantModal(null)
    return (
        <div>
            <ReactModal
                isOpen={!_.isNil(contestant)}
                onRequestClose={closeModal}
            >
                <a className="button is-rounded is-clearfixed is-pulled-right" onClick={closeModal}>Close</a>

                <Contestant contestant={contestant} />

                {showStats ?
                    <ContestantStats stats={contestant.contestantStats} />
                    :
                    <div>Submit bout to see this contestant's stats!</div>
                }
            </ReactModal>
        </div>
    )
}

export default ContestantModal;