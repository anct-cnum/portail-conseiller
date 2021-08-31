import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';

function Conseiller({ conseiller }) {

  return (
    <>
      <tr className="conseiller">
        <td>{conseiller?.prenom}</td>
        <td>{conseiller?.nom}</td>
        <td className="structure">{conseiller?.nomStructure?.toUpperCase()}</td>
        <td>{conseiller?.codePostal}</td>
        <td>{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</td>
        <td>{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</td>
        <td>{conseiller?.userCreated ? 'Oui' : 'Non' }</td>
        <td><div className={conseiller?.userCreated ? 'circle-true' : 'circle-false'}></div></td>
        <td></td>
      </tr>
      <tr className="conseiller">
        <td colSpan="9"><hr/></td>
      </tr>
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
