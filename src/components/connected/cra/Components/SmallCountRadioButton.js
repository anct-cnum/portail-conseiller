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

  const onClickMore = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree < 480) {
          dispatch(craActions.updateDuree(Number(cra?.duree) + 15));
        }
        break;
      case 'age':
        if (nbParticipants > nbParticipantsAge) {
          const age = cra?.age;
          for (let key in cra?.age) {
            if (key === typeKey) {
              age[key] += 1;
            }
          }
          nbParticipantsAge++;
          dispatch(craActions.updateAge(age, nbParticipantsAge));
        }
        break;
      case 'statut':
        if (nbParticipants > nbParticipantsStatut) {
          const statut = cra?.statut;
          for (let key in cra?.statut) {
            if (key === typeKey) {
              statut[key] += 1;
            }
          }
          nbParticipantsStatut++;
          dispatch(craActions.updateStatut(statut, nbParticipantsStatut));
        }
        break;
      case 'accompagnement':
        if (nbParticipants > nbParticipantsAccompagnement) {
          const accompagnement = cra?.accompagnement;
          for (let key in cra?.accompagnement) {
            if (key === typeKey) {
              accompagnement[key] += 1;
            }
          }
          nbParticipantsAccompagnement++;
          dispatch(craActions.updateAccompagnement(accompagnement, nbParticipantsAccompagnement));
        }
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
        let age = cra?.age;
        for (let key in cra?.age) {
          if (key === typeKey) {
            age[key] -= 1;
          }
        }
        nbParticipantsAge--;
        dispatch(craActions.updateAge(age, nbParticipantsAge));
        break;
      case 'statut':
        let statut = cra?.statut;
        for (let key in cra?.statut) {
          if (key === typeKey) {
            statut[key] -= 1;
          }
        }
        nbParticipantsStatut--;
        dispatch(craActions.updateStatut(statut, nbParticipantsStatut));
        break;
      case 'accompagnement':
        const accompagnement = cra?.accompagnement;
        for (let key in cra?.accompagnement) {
          if (key === typeKey) {
            accompagnement[key] -= 1;
          }
        }
        nbParticipantsAccompagnement--;
        dispatch(craActions.updateAccompagnement(accompagnement, nbParticipantsAccompagnement));

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
