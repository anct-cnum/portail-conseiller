import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getValeurMax } from '../utils/CraFunctions';

function BigCountRadioButton({ type, value, label }) {

  const dispatch = useDispatch();

  const showSelect = useSelector(state => state.cra.showSelectRedirection);
  const cra = useSelector(state => state.cra);
  let { nbParticipants, nbParticipantsAccompagnement, nbIndividuel, nbAtelier, nbRedirection, nbOrganisme } = cra;
  const [nbValeur, setNbValeur] = useState(
    type === 'participants' ? cra?.nbParticipants : cra?.['nb' + [value.charAt(0).toUpperCase() + value.slice(1)]]
  );

  const toggleSelect = () => {
    if (value === 'redirection' && nbValeur === 0) {
      dispatch(craActions.showSelectRedirection(!showSelect));
    }
  };

  const onClickMore = () => {
    switch (type) {
      case 'participants':
        if (nbParticipants < 100) {
          dispatch(craActions.updateNbParticipants(Number(nbParticipants) + 1));
          setNbValeur(Number(nbParticipants) + 1);
        }
        break;
      case 'accompagnement':
        if (nbParticipants && nbParticipants > nbParticipantsAccompagnement) {
          if (nbParticipants - nbParticipantsAccompagnement > 0) {
            setNbValeur(nbValeur + 1);
            if (value === 'individuel') {
              nbIndividuel++;
            }
            if (value === 'atelier') {
              nbAtelier++;
            }
            dispatch(craActions.updateAccompagnement(nbIndividuel, nbAtelier, nbRedirection, nbOrganisme));
          }
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
        if (cra?.nbParticipants) {
          const valeur = nbValeur - 1;
          setNbValeur(valeur < 0 ? 0 : valeur);
          if (value === 'individuel' && nbIndividuel > 0) {
            nbIndividuel--;
          }
          if (value === 'atelier' && nbAtelier > 0) {
            nbAtelier--;
          }
          dispatch(craActions.updateAccompagnement(nbIndividuel, nbAtelier, nbRedirection, nbOrganisme));
        }
        break;
      default:
        break;
    }
  };

  const onChangeValue = e => {
    const reg = new RegExp('^[0-9]');
    let valeur = Number(e.target.value);
    if (reg.test(valeur)) {
      if (type === 'participants') {
        valeur = valeur < 100 ? valeur : 100;
        setNbValeur(valeur);
        dispatch(craActions.updateNbParticipants(valeur));
      } else if (type === 'accompagnement') {
        if (cra?.nbParticipants && valeur >= 0) {
          const valeurMax = getValeurMax(value, nbIndividuel, nbAtelier, nbRedirection, nbParticipants);
          if (value === 'individuel' && nbIndividuel > 0) {
            nbIndividuel = valeur < valeurMax ? valeur : valeurMax;
          }
          if (value === 'atelier' && nbAtelier > 0) {
            nbAtelier = valeur < valeurMax ? valeur : valeurMax;
          }
          setNbValeur(valeur < valeurMax ? valeur : valeurMax);
          dispatch(craActions.updateAccompagnement(nbIndividuel, nbAtelier, nbRedirection, nbOrganisme));
        }
      }
    }

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
