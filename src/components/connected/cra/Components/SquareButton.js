import React from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function SquareButton({ value, label, type, cra }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);

  const ajoutNbParticipants = (valeur, groupe, groupeNbParticipants, totalNbParticipants, action) => {

    const filtre = Object.values(groupe).filter(tranche => tranche === totalNbParticipants).length;

    if (groupeNbParticipants === 0) {
      groupe[valeur] = totalNbParticipants;
      dispatch(action(groupe, totalNbParticipants));

    } else if (totalNbParticipants > groupeNbParticipants) {
      for (let key in groupe) {
        if (key === valeur) {
          groupe[key] += 1;
        }
      }
      dispatch(action(groupe, groupeNbParticipants + 1));
    } else if (filtre > 0) {
      for (let key in groupe) {
        if (key === valeur) {
          groupe[key] += 1;
        } else if (groupe[key] === groupeNbParticipants) {
          groupe[key] -= 1;
        }
      }
      dispatch(action(groupe, totalNbParticipants));
    }
  };

  const onClickSquare = e => {
    switch (type) {
      case 'age':
        if (cra?.nbParticipants) {
          ajoutNbParticipants(value, cra?.age, cra?.nbParticipantsAge, cra?.nbParticipants, craActions.updateAge);
        }
        break;
      case 'statut':
        if (cra?.nbParticipants) {
          ajoutNbParticipants(value, cra?.statut, cra?.nbParticipantsStatut, cra?.nbParticipants, craActions.updateStatut);
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
        className={type === 'duree' ? `squareRattachement ${controlSelected === value ? 'squareRattachement-selected' : ''}` :
          `squareRattachementAlt ${controlSelected === value ? 'squareRattachement-selected' : ''}`
        }
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
