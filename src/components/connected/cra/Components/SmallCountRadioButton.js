import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function SmallCountRadioButton({ type, typeKey, typeLabel, typeValue }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let nbParticipants = cra?.nbParticipants;
  let nbParticipantsAge = cra?.nbParticipantsAge;
  let nbParticipantsStatut = cra?.nbParticipantsStatut;
console.log(nbParticipantsAge);
  const onClickMore = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree < 480) {
          dispatch(craActions.updateDuree(Number(cra?.duree) + 30));
        }
        break;
      case 'age':
        if (nbParticipants > nbParticipantsAge) {
          let age = cra?.age;
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
          let statut = cra?.statut;
          for (let key in cra?.statut) {
            if (key === typeKey) {
              statut[key] += 1;
            }
          }
          nbParticipantsStatut++;
          dispatch(craActions.updateStatut(statut, nbParticipantsStatut));
        }
        break;
      default:
        break;
    }
  };

  const onClickLess = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree > 90) {
          dispatch(craActions.updateDuree(Number(cra?.duree) - 30));
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
      default:
        break;
    }
  };

  return (
    <div className="SmallCountRadioButton">
      <button id="radioRattachement"
        className="radioRattachement radioRattachement-selected"
        style={{ height: '104px', padding: 0 }}>
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
