import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getValeurMax } from '../utils/CraFunctions';

function BigCountRadioButton({ type, value, label }) {

  const dispatch = useDispatch();

  const showSelect = useSelector(state => state.cra.showSelectRedirection);
  const cra = useSelector(state => state.cra);
  const [nbValeur, setNbValeur] = useState(type === 'participants' ? cra?.nbParticipants : cra?.accompagnement[value]);

  const toggleSelect = () => {
    if (value === 'redirection' && nbValeur === 0) {
      dispatch(craActions.showSelectRedirection(!showSelect));
    }
  };

  const onClickMore = () => {
    switch (type) {
      case 'participants':
        if (cra?.nbParticipants < 100) {
          dispatch(craActions.updateNbParticipants(Number(cra?.nbParticipants) + 1));
          setNbValeur(Number(cra?.nbParticipants) + 1);
        }
        break;
      case 'accompagnement':
        const accompagnement = cra?.accompagnement;
        if (cra?.nbParticipants && cra?.nbParticipants > cra?.nbParticipantsAccompagnement) {
          for (let key in cra?.accompagnement) {
            if (key === value) {
              accompagnement[key] += 1;
              setNbValeur(accompagnement[key]);
            }
          }
          dispatch(craActions.updateAccompagnement(accompagnement, cra?.nbParticipantsAccompagnement + 1));
        }
        break;
      default:
        break;
    }
  };

  const onClickLess = () => {
    switch (type) {
      case 'participants':
        if (cra?.nbParticipants > 1) {
          dispatch(craActions.updateNbParticipants(Number(cra?.nbParticipants) - 1));
          setNbValeur(Number(cra?.nbParticipants) - 1);
        }
        break;
      case 'accompagnement':
        if (cra?.nbParticipants && cra?.nbParticipants >= cra?.nbParticipantsAccompagnement) {
          const accompagnement = cra?.accompagnement;
          for (let key in cra?.accompagnement) {
            if (key === value) {
              accompagnement[key] -= 1;
              setNbValeur(accompagnement[key]);
            }
          }
          dispatch(craActions.updateAccompagnement(accompagnement, cra?.nbParticipantsAccompagnement - 1 < 0 ? 0 : cra?.nbParticipantsAccompagnement - 1));
        }
        break;
      default:
        break;
    }
  };

  const onChangeValue = e => {
    const reg = new RegExp('^[0-9]');
    let valeur = Number(e.target.value);
    setNbValeur(valeur);
    if (reg.test(valeur)) {
      if (type === 'participants') {
        valeur = valeur < 100 ? valeur : 100;
        dispatch(craActions.updateNbParticipants(valeur));
      } else if (type === 'accompagnement') {
        let nbParticipantsAutre = 0;
        const accompagnement = cra?.accompagnement;
        const valeurMax = getValeurMax(value, cra?.nbParticipants, accompagnement);
        valeur = valeur < valeurMax ? valeur : valeurMax;
        for (let key in cra?.accompagnement) {
          if (key === value) {
            accompagnement[key] = valeur;
          } else {
            nbParticipantsAutre += accompagnement[key];
          }
        }
        dispatch(craActions.updateAccompagnement(accompagnement, nbParticipantsAutre + valeur));
      }
    }
    setNbValeur(valeur);
  };

  return (
    <div className="radioButton">
      <div className="gradient-box">
        <button className="radioRattachement radioRattachement-selected"
          style={{ height: '144px', padding: 0 }}>
          <div className="countRadioLabel" onClick={toggleSelect}>
            <span className="fr-label" style={{ padding: '10px', color: 'black' }}>
              <input style={{ fontSize: '1.5rem', textAlign: 'center', width: '100%' }} type="number" min={0} max={100}
                value={nbValeur}
                onChange={e => {
                  onChangeValue(e);
                }}/>
              {label}
            </span>
          </div>
          <div onClick={onClickLess} className="countRadioCalcul" style={{ borderRight: '1.5px solid black' }}>
            <span className="fr-label labelCalculCustom">-</span>
          </div>
          <div onClick={onClickMore} className="countRadioCalcul">
            <span className="fr-label labelCalculCustom">+</span>
          </div>
        </button>
      </div>
    </div>
  );
}

BigCountRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default BigCountRadioButton;
