import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

import SelectAccompagnement from './SelectAccompagnement';
import { getValeurMax } from '../utils/CraFunctions';

function BigCountRadioButtonRedirection({ label, value }) {

  const dispatch = useDispatch();

  const showSelect = useSelector(state => state.cra.showSelectRedirection);
  const cra = useSelector(state => state.cra);

  const [nbValeur, setNbValeur] = useState(cra?.nbRedirection);

  const toggleSelect = () => {
    if (nbValeur === 0) {
      dispatch(craActions.showSelectRedirection(!showSelect));
    }
  };

  const onClickMore = () => {
    if (cra?.nbParticipants && cra?.nbParticipants > cra?.nbParticipantsAccompagnement) {
      const accompagnement = cra?.accompagnement;
      const valeurMax = getValeurMax('redirection', cra?.nbParticipants, accompagnement);
      setNbValeur(nbValeur < valeurMax ? nbValeur + 1 : valeurMax);
      dispatch(craActions.updateAccompagnementRedirection(accompagnement, cra?.nbParticipantsAccompagnement + 1, cra?.organismes, nbValeur + 1));
    }
  };

  const onClickLess = () => {
    if (cra?.nbParticipants && cra?.nbParticipants >= cra?.nbParticipantsAccompagnement) {
      const accompagnement = cra?.accompagnement;
      const valeurMax = getValeurMax('redirection', cra?.nbParticipants, accompagnement);
      if (nbValeur - 1 < 0) {
        setNbValeur(0);
      } else {
        setNbValeur(nbValeur < valeurMax ? nbValeur - 1 : valeurMax);
      }
      dispatch(craActions.updateAccompagnementRedirection(accompagnement,
        cra?.nbParticipantsAccompagnement - 1 < 0 ? 0 : cra?.nbParticipantsAccompagnement - 1,
        cra?.organismes, nbValeur - 1 < 0 ? 0 : nbValeur - 1));
    }
  };

  const onChangeValue = e => {
    const reg = new RegExp('^[0-9]');
    let valeur = Number(e.target.value);
    setNbValeur(valeur);
    if (reg.test(valeur)) {
      let nbParticipantsAutre = 0;
      const accompagnement = cra?.accompagnement;
      const valeurMax = getValeurMax('redirection', cra?.nbParticipants, accompagnement);
      valeur = valeur < valeurMax ? valeur : valeurMax;
      for (let key in cra?.accompagnement) {
        if (key === 'redirection') {
          accompagnement[key] = valeur;
        } else {
          nbParticipantsAutre += accompagnement[key];
        }
      }
      dispatch(craActions.updateAccompagnementRedirection(accompagnement, nbParticipantsAutre + valeur, cra?.organismes, valeur));

    }
    setNbValeur(valeur);
  };

  return (
    <div className={showSelect ? 'radioButton radioButtonRedirection' : 'radioButton'}>
      <SelectAccompagnement />
      <div className="gradient-box border-top-none ">
        <button className="radioRattachement radioRattachement-selected" style={{ height: '144px', padding: 0 }}>
          <div className="countRadioLabel" onClick={toggleSelect}>
            <span className="fr-label" style={{ padding: '10px', color: 'black' }}>
              {value &&
              <>
                <input style={{ fontSize: '1.5rem', textAlign: 'center', width: '100%' }} type="number" min={0} max={100}
                  value={nbValeur}
                  onChange={e => {
                    onChangeValue(e);
                  }}/>
                {label}
              </>
              }
              {value === null &&
                <span className="selectionner-autre">{label}</span>
              }
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

BigCountRadioButtonRedirection.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default BigCountRadioButtonRedirection;
