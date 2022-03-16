import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

import SelectAccompagnement from './SelectAccompagnement';

function SmallCountRadioButton({ type, typeKey, typeLabel, typeValue }) {

  const dispatch = useDispatch();
  const cra = useSelector(state => state.cra);
  const nbParticipants = cra?.nbParticipants;
  let nbParticipantsAge = cra?.nbParticipantsAge;
  let nbParticipantsStatut = cra?.nbParticipantsStatut;
  let nbParticipantsAccompagnement = cra.nbParticipantsAccompagnement;

  const ajoutRetraitNbParticipants = (groupe, groupeNbParticipants, action, condition, operateur) => {
    if (condition) {
      for (let key in groupe) {
        if (key === typeKey) {
          if (operateur === 'plus') {
            groupe[key] += 1;
          } else {
            groupe[key] -= 1;
          }
        }
      }
      if (operateur === 'plus') {
        groupeNbParticipants++;
      } else {
        groupeNbParticipants--;
      }
      dispatch(action(groupe, groupeNbParticipants));
    }
  };

  const onClickMore = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree < 480) {
          dispatch(craActions.updateDuree(Number(cra?.duree) + 15));
        }
        break;
      case 'age':
        ajoutRetraitNbParticipants(cra?.age, nbParticipantsAge, craActions.updateAge, nbParticipants > nbParticipantsAge, 'plus');
        break;
      case 'statut':
        ajoutRetraitNbParticipants(cra?.statut, nbParticipantsStatut, craActions.updateStatut, nbParticipants > nbParticipantsStatut, 'plus');
        break;
      case 'accompagnement':
        ajoutRetraitNbParticipants(cra?.accompagnement, nbParticipantsAccompagnement, craActions.updateAccompagnement,
          nbParticipants > nbParticipantsAccompagnement, 'plus');
        break;
      default:
        break;
    }
  };

  const onClickLess = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree > 60) {
          dispatch(craActions.updateDuree(Number(cra?.duree) - 15));
        }
        break;
      case 'age':
        ajoutRetraitNbParticipants(cra?.age, nbParticipantsAge, craActions.updateAge, true, 'moins');
        break;
      case 'statut':
        ajoutRetraitNbParticipants(cra?.statut, nbParticipantsStatut, craActions.updateStatut, true, 'moins');
        break;
      case 'accompagnement':
        ajoutRetraitNbParticipants(cra?.accompagnement, nbParticipantsAccompagnement, craActions.updateAccompagnement, true, 'moins');
        break;
      default:
        break;
    }
  };

  return (
    <div className="SmallCountRadioButton">
      <button id="radioRattachement"
        className={type !== 'duree' ? 'radioRattachementAlt radioRattachement-selected' : 'radioRattachement radioRattachement-selected'}
        style={{ height: '104px', padding: 0 }}>

        {type === 'accompagnement' &&
          <SelectAccompagnement />
        }

        <div className={type === 'duree' ? 'countSmallRadioLabel' : 'countSmallSquareLabel'}>
          <span className="rf-label labelSmallCount">
            {type === 'duree' &&
              <>{Math.floor(cra?.duree / 60)}h{(cra?.duree % 60).toLocaleString('fr-FR', { minimumIntegerDigits: 2 })}</>
            }
            { (type === 'statut' || type === 'age') &&
            <>
              <div className="ageStatusValueSmallCount">{typeValue}</div>
              <span className="ageStatusLabelSmallCount">{typeLabel}</span>
            </>
            }
          </span>

        </div>
        <div onClick={onClickLess} className={type === 'duree' ? 'countSmallRadioCalcul' : 'countSmallSquareCalcul'}
          style={{ borderRight: '1.5px solid black' }}>
          <span className="rf-label labelCalculCustom">-</span>
        </div>
        <div onClick={onClickMore} className={type === 'duree' ? 'countSmallRadioCalcul' : 'countSmallSquareCalcul'}>
          <span className="rf-label labelCalculCustom">+</span>
        </div>
      </button>
    </div>
  );
}

SmallCountRadioButton.propTypes = {
  type: PropTypes.string,
  typeKey: PropTypes.string,
  typeValue: PropTypes.number,
  typeLabel: PropTypes.string,
};

export default SmallCountRadioButton;
