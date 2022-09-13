import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { craActions } from '../../../../actions';

function RecurrenceButton() {

  const dispatch = useDispatch();
  const cra = useSelector(state => state.cra);

  const onClickMore = () => {
    if (cra?.nbParticipants > cra?.nbParticipantsRecurrents) {
      dispatch(craActions.updateRecurrence(cra?.nbParticipantsRecurrents + 1));
    }
  };

  const onClickLess = () => {
    dispatch(craActions.updateRecurrence(cra?.nbParticipantsRecurrents - 1));
  };
  useEffect(() => {
    if (cra?.nbParticipantsRecurrents > cra?.nbParticipants) {
      dispatch(craActions.updateRecurrence(0));
    }
  }, [cra?.nbParticipants]);

  return (
    <div className="checkboxButton">
      {(cra?.nbParticipantsRecurrents === 0 || cra?.nbParticipantsRecurrents === null) &&
        <button className="buttonRecurrence" onClick={onClickMore}>
          Entrez le nombre de personnes d&eacute;j&agrave; accompagn&eacute;e(s)...
        </button>
      }
      { (cra.nbParticipants > 1 && cra?.nbParticipantsRecurrents > 0) &&
        <div className="buttonRecurrence-filled">
          <div onClick={onClickMore} className="moreRecurrence">
            <span className="fr-label labelCalculCustom">+</span>
          </div>
          <div onClick={onClickLess} className="lessRecurrence" style={{ borderRight: '1.5px solid black' }}>
            <span className="fr-label labelCalculCustom">-</span>
          </div>
          <div className="labelRecurrence">
            <span>{cra?.nbParticipantsRecurrents}</span> personne(s) d&eacute;j&agrave; accompagn&eacute;e(s)
          </div>
        </div>
      }
      { (cra.nbParticipants === 1 && cra?.nbParticipantsRecurrents > 0) &&
        <div className="buttonRecurrence-filled">
          <div className="labelRecurrence-alt" onClick={onClickLess}>
            <span>{cra?.nbParticipantsRecurrents}</span> personne d&eacute;j&agrave; accompagn&eacute;e
          </div>
        </div>
      }
    </div>
  );
}

export default RecurrenceButton;
