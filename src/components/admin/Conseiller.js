import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../actions';

function Conseiller({ conseiller, currentPage }) {

  const dispatch = useDispatch();

  return (
    <tr className="conseiller">
      <td>{conseiller?.prenom}</td>
      <td>{conseiller?.nom}</td>
      <td></td>
      <td>{conseiller?.codePostal}</td>
      <td> {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</td>
      <td> {dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</td>
      <td>  {conseiller?.userCreated} </td>
      <td>   {conseiller?.userCreated ? 'Oui' : 'Non' } </td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
