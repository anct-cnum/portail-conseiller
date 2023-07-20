import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Conseiller({ conseiller, currentPage, trClass, role }) {

  const isUserActif = conseiller?.emailCNError !== undefined && conseiller?.mattermost !== undefined;

  return (
    <>
      <tr className={trClass + ' conseiller'}>
        <td>{conseiller?.prenom}</td>
        <td>{conseiller?.nom}</td>
        { role === 'admin_coop' &&
          <td className="structure">{conseiller?.nomStructure?.toUpperCase()}</td>
        }
        <td>{conseiller?.codePostal}</td>
        <td
          data-tooltip-id="infobulle-menu"
          data-tooltip-content="Date Prise de Poste">
          {conseiller?.datePrisePoste ? dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY') : <>Non renseign&eacute;e</>}
        </td>
        <td
          data-tooltip-id="infobulle-menu"
          data-tooltip-content="Date Fin Formation">
          {conseiller?.dateFinFormation ? dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY') : <>Non renseign&eacute;e</>}
        </td>
        <td className="center-text"
          data-tooltip-id="infobulle-menu"
          data-tooltip-content="Groupe CRA">
          {conseiller?.groupeCRA}
        </td>
        <td className="center-text"
          data-tooltip-id="infobulle-menu"
          data-tooltip-content="Certification">
          {conseiller?.certifie ? <img src="logos/icone-check.svg"/> : <img src="logos/icone-croix.svg" /> }
        </td>
        <td><div
          data-tooltip-id="infobulle-menu"
          data-tooltip-html="Activ&eacute;" className={isUserActif ? 'circle-true' : 'circle-false'}></div></td>
        <td
          data-tooltip-id="infobulle-menu"
          data-tooltip-html="CRA saisis sur la p&eacute;riode">{conseiller?.craCount}</td>
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
  trClass: PropTypes.string,
  role: PropTypes.string
};

export default Conseiller;
