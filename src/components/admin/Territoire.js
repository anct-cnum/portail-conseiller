import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Territoire({ territoire, currentPage, trClass }) {

  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;

  return (
    <>
      <tr className={trClass + ' territoire'}>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="CRA enregistr&eacute;es">{territoire?.CRAEnregistres ?? 0}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Personnes accompagn&eacute;es">{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-content="Dotation de conseillers">{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Conum activ&eacute;s">{territoire?.cnfsActives ?? 0}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Conum en attente d&rsquo;activation">{territoire?.cnfsInactives ?? 0}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Taux d&rsquo;activation">{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link className="fr-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques`,
            territoire: territoire,
            currentPage: currentPage,
            origin: '/territoires' }}>
              D&eacute;tails
          </Link>
          <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white"/>
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
