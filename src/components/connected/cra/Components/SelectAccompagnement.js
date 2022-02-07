import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SelectAccompagnement({ value, controlSelected, setChampAutre }) {
  const lieuxReorientation = [
    'ANTS',
    'Assistante sociale',
    'CAF',
    'CARSAT',
    'CCAS',
    'CEFS',
    'CIP',
    'CPAM',
    'DGFIP',
    'France Services',
    'Mairie',
    'Médiathèque',
    'Mission locale',
    'Pôle emploi',
    'Préfecture',
    'Sous-préfecture',
    'Service de police',
    'Gendarmerie',
    'Tiers-lieu / fablab'
  ];
  const [autre, setAutre] = useState(null);
  const [champAutreActif, setChampAutreActif] = useState(false);

  return (
    <div className={`${controlSelected === value ?
      'selectAccompagnementRedirection dropdown-expanded scrollOptions' : 'selectAccompagnement'}`}>
      <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
        {lieuxReorientation.map((opt, key) =>
          <li style={{ padding: '1em 2em', textAlign: 'left' }} className="selecteurList" onClick={() => {
            setChampAutre('');
            setChampAutreActif(false);
          }} key={key} value={opt}>
            {opt}
          </li>
        )}
        <li style={{ height: '40px', width: '90%', color: 'black', marginBottom: '25px', display: 'flex', alignItems: 'stretch', marginInline: 'auto' }}
          onClick={() => setChampAutreActif(true)}
          className="autreColorWhite"
        >
          <input style={{ color: 'black', height: 'auto', width: '100%', borderRadius: '4px 0 0 0' }}
            className={`${champAutreActif ? 'autreColorWhite' : 'autreColorDark autreColorWhite'} autretest`}
            placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection"
            onChange={e => setAutre(e.target.value)} value={autre} />
          <button className={`${champAutreActif ? 'autreColorWhite' : 'autreColorDark autreColorWhite'}`} value="OK" onClick={setChampAutre(autre)}
            style={{ width: '52px', borderRadius: '0 6px 0 0' }}
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
          </button>
        </li>
      </ul>
    </div>
  );
}

SelectAccompagnement.propTypes = {
  value: PropTypes.string,
  controlSelected: PropTypes.string,
  setChampAutre: PropTypes.func
};

export default SelectAccompagnement;
