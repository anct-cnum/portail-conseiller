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

  return (
    <div className={`${controlSelected === value ?
      'selectAccompagnementRedirection dropdown-expanded scrollOptions' : 'selectAccompagnement'}`}>
      <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
        {lieuxReorientation.map((opt, key) =>
          <li style={{ padding: '1em 2em', textAlign: 'left' }} className="selecteurList" onClick={() => setChampAutre('')} key={key} value={opt}>
            {opt}
          </li>
        )}
      </ul>
      <div style={{ display: 'flex', paddingBottom: '1 rem' }}>
        <input className="rf-input" placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection" onChange={e => setAutre(e.target.value)} />
        <button className="rf-btn" value="OK" onClick={setChampAutre(autre)}>OK</button>
      </div>
    </div>
  );
}

SelectAccompagnement.propTypes = {
  value: PropTypes.string,
  controlSelected: PropTypes.string,
  setChampAutre: PropTypes.func
};

export default SelectAccompagnement;
