import React from 'react';
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


  return (
    <div className="checkboxButton">
      {(cra?.nbParticipantsRecurrents === 0 || cra?.nbParticipantsRecurrents === null) &&
        <button className="buttonRecurrence" onClick={onClickMore}>
          Entrez le nombre de personnes d&eacute;j&agrave; accompagn&eacute;e(s)...
        </button>
      }
      {cra?.nbParticipantsRecurrents > 0 &&
      <div className="buttonRecurrence-filled">
        <div onClick={onClickLess} className="lessRecurrence" style={{ borderRight: '1.5px solid black' }}>
          <span className="rf-label labelCalculCustom">-</span>
        </div>
        <div onClick={onClickMore} className="moreRecurrence">
          <span className="rf-label labelCalculCustom">+</span>
        </div>
        <div className="laberRecurrence">
          <span>{cra?.nbParticipantsRecurrents}</span> personnes d&eacute;j&agrave; accompagn&eacute;e(s)
        </div>
      </div>

      }
    </div>
  );
}

export default RecurrenceButton;
