import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ conseiller, currentPage, trClass }) {

  return (
    <>
      <tr className={trClass + ' conseiller'}>
        <td>{conseiller?.prenom}</td>
        <td>{conseiller?.nom}</td>
        <td className="structure">{conseiller?.nomStructure?.toUpperCase()}</td>
        <td>{conseiller?.codePostal}</td>
        <td>{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</td>
        <td>{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</td>
        <td>{conseiller?.certifie ? <img src="logos/icone-check.svg"/> : <img src="logos/icone-croix.svg" /> }</td>
        <td><div className={conseiller?.userCreated ? 'circle-true' : 'circle-false'}></div></td>
        <td>
          <Link className="rf-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/conseiller/${conseiller?._id}`,
            currentPage: currentPage,
            origin: '/accueil' }}>
              Afficher
          </Link>
        </td>
      </tr>
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
  trClass: PropTypes.string
};

export default Conseiller;
