import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Territoire({ territoire, currentPage, trClass }) {

  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;

  return (
    <>
      <tr className={trClass + ' territoire'}>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td>{territoire?.CRAEnregistres ?? 0}</td>
        <td>{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td>{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td>{territoire?.cnfsActives ?? 0}</td>
        <td>{territoire?.cnfsInactives ?? 0}</td>
        <td>{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link className="rf-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques`,
            territoire: territoire,
            currentPage: currentPage,
            origin: '/territoires' }}>
              D&eacute;tails
          </Link>
        </td>
      </tr>
    </>
  );
}

Territoire.propTypes = {
  territoire: PropTypes.object,
  currentPage: PropTypes.number,
  trClass: PropTypes.string,
};

export default Territoire;
