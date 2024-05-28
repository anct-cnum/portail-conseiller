import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SupprimerPermanence from './SupprimerPermanence';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../actions';
import { Tooltip } from 'react-tooltip';

function MaPermanence({ permanence, conseillerId, trClass }) {
  const dispatch = useDispatch();
  const typeAcces = {
    libre: 'Accès libre',
    rdv: 'Sur Rendez-vous',
    prive: 'Accès fermé au public'
  };
  const islieuPrincipal = permanence?.lieuPrincipalPour?.includes(conseillerId);

  const countCra = useSelector(state => state.cra.countCra);
  const [count, setCount] = useState([]);

  useEffect(() => {
    if (permanence?._id && !countCra) {
      dispatch(craActions.countByPermanence(permanence._id));
    }
  }, [permanence]);

  useEffect(() => {
    if (countCra && !count?.find(cra => cra === countCra)) {
      count.push(countCra);
      setCount(count);
    }
  }, [countCra]);

  return (
    <tr className={trClass + ' permanence'}>
      <td>
        {!permanence?.adresse &&
          <>
            <span className="ri-error-warning-fill warning-adresse"
              data-tooltip-id="infobulle-menu"
              data-tooltip-html="Vous avez remont&eacute; un probl&egrave;me d&rsquo;adresse, celui-ci est en cours de traitement."></span>
            <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white"/>
          </>
        }
        {permanence?.nomEnseigne}</td>
      <td>
        <span className={islieuPrincipal ? 'circle-true' : 'circle-false'}/>
      </td>
      <td>
        {(permanence?.adresse?.numeroRue ?? '') + ' ' + permanence?.adresse?.rue }<br/>
        {permanence?.adresse?.codePostal + ' ' + permanence?.adresse?.ville}
      </td>
      <td>
        <ul>
          {permanence?.typeAcces?.map((type, idx) => {
            return (<li key={idx}>{typeAcces[type]}</li>);
          })}
        </ul>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Link className="fr-btn modifier-btn" style={{ boxShadow: 'none' }}
          to={`/mon-lieu-activite/${permanence?._id}`}
          state={{
            islieuPrincipal: islieuPrincipal,
            idPermanence: permanence?._id
          }}>
            Modifier
        </Link>
        <SupprimerPermanence permanence={permanence} isDisabled={islieuPrincipal} count={count?.find(cra => cra.id === permanence?._id)?.count}/>
      </td>
    </tr>
  );
}

MaPermanence.propTypes = {
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  trClass: PropTypes.string,
};

export default MaPermanence;
