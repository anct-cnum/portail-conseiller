import React from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function SquareButton({ value, label, type, cra }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);

  const onClickSquare = e => {
    switch (type) {
      case 'age':
        if (cra?.nbParticipants && cra?.nbParticipants > cra?.nbParticipantsAge) {
          const age = cra?.age;
          for (let key in cra?.age) {
            if (key === value) {
              age[key] += 1;
            }
          }
          dispatch(craActions.updateAge(age, cra?.nbParticipantsAge + 1));
        }
        break;
      case 'statut':
        if (cra?.nbParticipants && cra?.nbParticipants > cra?.nbParticipantsStatut) {
          const statut = cra?.statut;
          for (let key in cra?.statut) {
            if (key === value) {
              statut[key] += 1;
            }
          }
          dispatch(craActions.updateStatut(statut, cra?.nbParticipantsStatut + 1));
        }
        break;
      case 'duree':
        dispatch(craActions.updateDuree(e.target.getAttribute('value')));
        break;
      default:
        break;
    }
  };

  return (
    <div className="squareButton" onClick={onClickSquare} value={value}>
      <button
        id="squareRattachement"
        className={`squareRattachement ${controlSelected === value ? 'squareRattachement-selected' : ''}`}
        value={value}>
        <span
          className={`rf-label squareLabel ${controlSelected === value ? 'squareRattachement-selected' : ''}`}
          value={value}>
          {label}
        </span>
      </button>
    </div>
  );
}

SquareButton.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  cra: PropTypes.object,
};

export default SquareButton;
