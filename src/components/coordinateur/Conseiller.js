import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Conseiller({ conseiller, currentPage, role }) {

  const isUserActif = conseiller?.mattermost?.id ?? false;

  return (
    <>
      <tr className="conseiller">
        <td>{conseiller?.prenom}</td>
        <td>{conseiller?.nom}</td>
        { role === 'admin_coop' &&
          <td className="structure">{conseiller?.nomStructure?.toUpperCase()}</td>
        }
        <td>{conseiller?.codePostal}</td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Date Prise de Poste">
          {conseiller?.datePrisePoste ? dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY') : <>Non renseign&eacute;e</>}
        </td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="Date Fin Formation">
          {conseiller?.dateFinFormation ? dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY') : <>Non renseign&eacute;e</>}
        </td>
        <td><div data-tooltip-id="infobulle-menu"
          data-tooltip-html="Activ&eacute;" className={isUserActif ? 'circle-true' : 'circle-false'}></div></td>
        <td data-tooltip-id="infobulle-menu"
          data-tooltip-html="CRA saisis">{conseiller?.craCount}</td>
        <td>
          <Link className="fr-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/conseiller/${conseiller?._id}`,
            currentPage: currentPage,
            origin: '/accueil' }}>
              Afficher
          </Link>
          <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white"/>
        </td>
      </tr>
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
  role: PropTypes.string
};

export default Conseiller;
