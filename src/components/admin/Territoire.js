import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function Territoire({ territoire, currentPage, trClass }) {

  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;

  return (
    <>
      <tr className={trClass + ' territoire'}>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td data-tip="CRA enregistrées">{territoire?.CRAEnregistres ?? 0}</td>
        <td data-tip="Personnes accompagnées">{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td data-tip="Dotation de conseillers">{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td data-tip="CnFS activés">{territoire?.cnfsActives ?? 0}</td>
        <td data-tip="CnFS en attente d'activation">{territoire?.cnfsInactives ?? 0}</td>
        <td data-tip="Taux d'activation">{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link className="rf-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques`,
            territoire: territoire,
            currentPage: currentPage,
            origin: '/territoires' }}>
              D&eacute;tails
          </Link>
        </td>
        <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
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
