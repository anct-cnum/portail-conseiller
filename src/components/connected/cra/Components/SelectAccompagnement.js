import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lieuxReorientation } from '../../../../data/LieuxRedirection';

function SelectAccompagnement({ value, controlSelected, setChampAutre, champAutreActif, setChampAutreActif, setSelectOption }) {
  const [autre, setAutre] = useState(null);

  return (
    <div className={`${controlSelected === value ?
      'selectAccompagnementRedirection dropdown-expanded scrollOptions' : 'selectAccompagnement'}`}>
      <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
        {lieuxReorientation.map((opt, key) =>
          <li className="selecteurList" onClick={() => {
            setChampAutre(null);
            setChampAutreActif(false);
          }} key={key} value={opt}>
            {opt}
          </li>
        )}
        <li onClick={() => setChampAutreActif(true)} className={`autreColorWhite styleChampAutre ${champAutreActif ? 'autreColorWhiteSansHover' : ''}`}>
          <input
            className={`${champAutreActif ? 'autreColorWhite' : 'autreColorDark'} styleInputAutre borderInputButtonAutre textInputAutre`}
            placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection"
            onChange={e => setAutre(e.target.value)} value={autre ?? ''} />
          <div className={`${champAutreActif ? 'autreColorWhite' : 'autreColorDark'} borderInputButtonAutre tailledivCheck`} value={autre} onClick={() => {
            setSelectOption(autre);
            setChampAutre(autre);
          }}
          >
            { champAutreActif ? <img src="/logos/cra/logo-check-ok-dark.svg" /> : <img src="/logos/cra/logo-check-ok-grise.svg" /> }
          </div>
        </li>
      </ul>
    </div>
  );
}

SelectAccompagnement.propTypes = {
  value: PropTypes.string,
  controlSelected: PropTypes.string,
  setChampAutre: PropTypes.func,
  champAutreActif: PropTypes.bool,
  setChampAutreActif: PropTypes.func,
  setSelectOption: PropTypes.func,
  onClickRadio: PropTypes.func
};

export default SelectAccompagnement;
