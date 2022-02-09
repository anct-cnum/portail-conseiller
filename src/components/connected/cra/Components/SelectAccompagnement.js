import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lieuxReorientation } from '../utils/ArrayLieuxReorientation.json';

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
          <div className={`${champAutreActif ? 'autreColorWhite' : 'autreColorDark'} borderInputButtonAutre tailledivCheck`} value="OK" onClick={() => {
            setSelectOption(autre);
            setChampAutre(autre);
          }}
          >
            { champAutreActif ?
              <svg width="18px" height="16px" viewBox="0 0 18 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <title>check-noir</title>
                <g id="check-noir" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <polyline id="Path-8" stroke="#2A2A2A" strokeWidth="2" points="0 6.51428995 6.92880951 13.5801965 17.4148172 3"></polyline>
                </g>
              </svg> :
              <svg width="18px" height="16px" viewBox="0 0 18 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <title>check-grise</title>
                <g id="check-grise" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <polyline id="Path-8" stroke="#929292" strokeWidth="2" points="0 6.51428995 6.92880951 13.5801965 17.4148172 3"></polyline>
                </g>
              </svg>
            }
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
  setSelectOption: PropTypes.func
};

export default SelectAccompagnement;
