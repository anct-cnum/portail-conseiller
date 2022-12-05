import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../helpers';
import Activite from './Activite';
import Age from './Age';
import Themes from './Themes';
import Statut from './Statut';
import Duree from './Duree';
import Accompagnement from './Accompagnement';
import ValidationButton from './Components/ValidationButton';
import Footer from '../../Footer';
import Recurrence from './Recurrence';
import { craActions } from '../../../actions';
import dayjs from 'dayjs';
import CanalEtAdresse from './CanalEtAdresse';

function UpdateCra({ match }) {
  const dispatch = useDispatch();
  const idCra = match.params.idCra;
  const urlAPropos = process.env.REACT_APP_AIDE_URL +
    '/article/comment-le-conseiller-numerique-rend-il-compte-de-ses-activites-et-a-quoi-cela-sert-il-16n3yhq/';
  const printFlashbag = useSelector(state => state.cra?.printFlashbag);
  const error = useSelector(state => state.cra?.error);
  const loading = useSelector(state => state.cra?.loading);
  const dateUpdate = useSelector(state => state.cra?.updatedAt);

  useEffect(() => {
    if (printFlashbag) {
      history.push('/historique');
    }
  }, [printFlashbag]);

  useEffect(() => {
    if (!error && idCra) {
      dispatch(craActions.getCra(idCra));
    }
  }, [idCra]);
  return (
    <>
      <div className="fr-container cra">
        <div className="fr-grid-row fr-grid-row--center fr-my-md-12w fr-pt-1w fr-pb-3w">
          <div className="fr-col-12 fr-col-lg-1 centrer">
            <img src="/logos/home-connected/icone-cra.svg" style={{ width: '114px', height: '78px' }} />
          </div>
          <div className="fr-col-12 fr-col-lg-9">
            <h1 className="titre centrer fr-ml-12w">Enregistrer une activit&eacute;</h1>
          </div>
          <div className="fr-col-12 fr-col-lg-2">
            {urlAPropos &&
              <a className="fr-btn-secondaire btn-guide" href={urlAPropos} target="blank" rel="noreferrer" >
                <i className="ri-lightbulb-line ri-xl"></i>&nbsp;Guide utilisateur
              </a>
            }
          </div>
          {(error && !loading) &&
            <div className="fr-col-12 fr-mt-12w flashBag invalid">
              Une erreur est survenue, le suivi d&rsquo;activit&eacute; n&rsquo;a pas pu &ecirc;tre trouv&eacute; !<br/>
              Erreur : {error}
            </div>
          }
          <div className="fr-col-12 fr-mt-3w">
            Dernier enregistrement de ce compte rendu d&rsquo;activit&eacute; le <b>{dayjs(dateUpdate).format('DD/MM/YYYY à HH:mm')}</b>
          </div>
        </div>
        {(!error && !loading) &&
          <>
            <CanalEtAdresse/>
            <Activite/>
            <Recurrence/>
            <Age/>
            <Statut/>
            <Themes/>
            <Duree/>
            <Accompagnement/>
            <ValidationButton/>
          </>
        }
      </div>

      <Footer type="support"/>
    </>
  );
}

UpdateCra.propTypes = {
  match: PropTypes.object
};
export default UpdateCra;
