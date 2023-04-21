import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

import SelectAccompagnement from './SelectAccompagnement';
import { getValeurMax } from '../utils/CraFunctions';

function BigCountRadioButtonRedirection({ label, value }) {

  const dispatch = useDispatch();

  const showSelect = useSelector(state => state.cra?.showSelectRedirection);
  const cra = useSelector(state => state.cra);
  let { nbParticipants, nbParticipantsAccompagnement, nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme } = cra;

  const [nbValeur, setNbValeur] = useState(nbOrganisme);

  const toggleSelect = () => {
    if (nbValeur === 0) {
      dispatch(craActions.showSelectRedirection(!showSelect));
    }
  };

  const onClickMore = () => {
    if (nbParticipants && nbParticipants > nbParticipantsAccompagnement && nbParticipants - nbParticipantsAccompagnement >= 0) {
      nbOrganisme++;
      setNbValeur(nbOrganisme);
      dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme));
    }
  };

  const onClickLess = () => {
    if (cra?.nbParticipants && nbOrganisme > 0) {
      nbOrganisme--;
      setNbValeur(nbOrganisme < 0 ? 0 : nbOrganisme);
      dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme));
    }
  };

  const onChangeValue = e => {
    const reg = new RegExp('^[0-9]');
    let valeur = Number(e.target.value);
    if (reg.test(valeur)) {
      const valeurMax = getValeurMax('redirection', nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbParticipants);
      valeur = valeur < valeurMax ? valeur : valeurMax;
      setNbValeur(valeur);
      dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme));
    }
  };

  useEffect(() => {
    setNbValeur(nbOrganisme);
  }, [nbOrganisme]);

  return (
    <div className={`radioButton ${showSelect ? 'radioButtonRedirection' : ''}`}>
      <SelectAccompagnement />
      <div className="gradient-box border-top-none ">
        <button className="radioRattachement radioRattachement-selected" style={{ height: '144px', padding: 0 }}>
          <div className="countRadioLabel" onClick={toggleSelect}>
            <span className="fr-label">
              {value &&
              <>
                <input className="styleInputValueOrganisme" type="number" min={0} max={100}
                  value={nbValeur}
                  onChange={e => {
                    onChangeValue(e);
                  }}/>
                <span style={{ fontSize: '14px' }}>{label}</span>
              </>
              }
              {value === null &&
              <>
                <input className="styleInputValueOrganisme" type="number" min={0} max={100}
                  value={nbValeur}
                  onChange={e => {
                    onChangeValue(e);
                  }}/>
                <span className="selectionner-autre">{label}</span>
              </>
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
