import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { statistiqueActions } from '../../../../actions';
import PropTypes from 'prop-types';

function ElementCodePostal(props) {

  const dispatch = useDispatch();

  const [departement, setDepartement] = useState(null);

  function selectDepartement(event) {
    setDepartement(event.target.value !== '' ? event.target.value : null);
  }

  function getDepartementsCras() {
    return;
  }

  return (
    <select className="rf-select rf-mb-2w" value={departement === null ? '' : departement} onChange={selectDepartement}>
      <option value="">Tout département</option>
      {getDepartementsCras().map(idx =>
        <option key={idx} value={num_dep}>{num_dep} - {dep_name}</option>
      )}
    </select>
  );
}

ElementCodePostal.propTypes = {
  codePostal: PropTypes.string,
};

export default ElementCodePostal;
