import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Territoire({ territoire, currentPage, trClass }) {

  return (
    <>
      <tr className={trClass + ' territoire'}>
        <td>{territoire?.codeDepartement}</td>
        <td>{territoire?.nomDepartement}</td>
        <td>{territoire?.personnesAccompagnees}</td>
        <td>{territoire?.nombreConseillersCoselec}</td>
        <td>{territoire?.cnfsActives}</td>
        <td>{territoire?.cnfsInactives}</td>
        <td>{territoire?.tauxActivation} %</td>
        <td>
          <Link className="rf-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques/territoire/${territoire?.code}`,
            currentPage: currentPage,
            origin: '/candidats' }}>
              Détails
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
