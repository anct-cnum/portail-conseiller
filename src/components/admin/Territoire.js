import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Territoire({ territoire, currentPage, trClass }) {

  return (
    <>
      <tr className={trClass + ' territoire'}>
        <td>{territoire?.code}</td>
        <td>{territoire?.nom}</td>
        <td>{territoire?.personnesAccompagnees}</td>
        <td>{territoire?.dotationCnFS}</td>
        <td>{territoire?.nombreCnFSActive}</td>
        <td>{territoire?.nombreCnFSInactive}</td>
        <td>{territoire?.tauxActivation}</td>
        <td>
          <Link className="rf-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques/territoire/${territoire?.code}`,
            currentPage: currentPage,
            origin: '/candidats' }}>
              Afficher
          </Link>
        </td>
      </tr>
    </>
  );
}

Territoire.propTypes = {
  territoire: PropTypes.object,
  currentPage: PropTypes.number,
  trClass: PropTypes.string
};

export default Territoire;
