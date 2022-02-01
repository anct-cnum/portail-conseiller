import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SelectAccompagnement({ value, controlSelected }) {
  const [array, _] = useState([
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
    'Service de police', 'gendarmerie',
    'Tiers-lieu / fablab'
  ]);

  return (
    <div className={`${value === 'redirection' && controlSelected === value ?
      'selectAccompagnementRedirection dropdown-expanded scrollOptions' : 'selectAccompagnement'}`}>
      <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
        {array.map((opt, key) =>
          <li className="selecteurList" key={key} value={opt} style={{ padding: '1em 2em', textAlign: 'left' }}>
            {opt}
          </li>
        )}
      </ul>
    </div>
  );
}

SelectAccompagnement.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
  controlSelected: PropTypes.string
};

export default SelectAccompagnement;
