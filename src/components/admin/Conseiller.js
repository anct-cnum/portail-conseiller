import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';

function Conseiller({ conseiller, currentPage }) {

  return (
    <tr className="conseiller">
      <td>{conseiller?.prenom}</td>
      <td>{conseiller?.nom}</td>
      <td>{conseiller?.nomStructure}</td>
      <td>{conseiller?.codePostal}</td>
      <td>{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</td>
      <td>{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</td>
      <td>{conseiller?.userCreated ? 'Oui' : 'Non' }</td>
      <td><div className={conseiller?.userCreated ? 'circle-true' : 'circle-false'}></div></td>
      <td></td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
