import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SelectAccompagnement({ value, controlSelected, setValeurInput }) {
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
    'Service de police',
    'Gendarmerie',
    'Tiers-lieu / fablab'
  ]);
  const [autre, setAutre] = useState(null);

  return (
    <div className={`${controlSelected === value ?
      'selectAccompagnementRedirection dropdown-expanded scrollOptions' : 'selectAccompagnement'}`}>
      <ul style={{ color: 'white', listStyleType: 'none', padding: 0 }}>
        {array.map((opt, key) =>
          <li className="selecteurList" onClick={() => setValeurInput('')} key={key} value={opt} style={{ padding: '1em 2em', textAlign: 'left' }}>
            {opt}
          </li>
        )}
      </ul>
      <input className="rf-input" placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection" onChange={e => setAutre(e.target.value)} />
      <button className="rf-btn" value="OK" onClick={setValeurInput(autre)}>OK</button>
    </div>
  );
}

SelectAccompagnement.propTypes = {
  value: PropTypes.string,
  controlSelected: PropTypes.string,
  setValeurInput: PropTypes.func
};

export default SelectAccompagnement;
