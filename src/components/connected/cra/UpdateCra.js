import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../helpers';
import CodePostal from './CodePostal';
import Canal from './Canal';
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
          <div className="fr-col-12 fr-col-lg-2 centre-titre">
            <img src="/logos/home-connected/icone-cra.svg" style={{ width: '114px', height: '78px' }} />
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <h1 className="titre centre-titre">Mon suivi d&rsquo;activit&eacute;</h1>
          </div>
          {(error && !loading) &&
            <div className="fr-col-12 fr-mt-12w">
              Une erreur est survenue, le suivi d&rsquo;activit&eacute; n&rsquo;a pas pu &ecirc;tre trouv&eacute; !
            </div>
          }
          {(!error && !loading) &&
            <>
              <div className="fr-col-12 fr-col-lg-2 url-a-propos">
                {urlAPropos &&
                  <a className="a-propos" href={urlAPropos} target="blank" rel="noreferrer" >&Agrave; propos<br/>
                  du suivi d&rsquo;activit&eacute;
                  </a>
                }
              </div>
              <div className="fr-col-12 fr-col-md-2"></div>
              <div className="fr-col-12 fr-mt-3w">
                Dernier enregistrement de ce compte rendu d&rsquo;activit&eacute; le <b>{dayjs(dateUpdate).format('DD/MM/YYYY à HH:mm')}</b>
              </div>
            </>
          }
        </div>
        {(!error && !loading) &&
          <>
            <CodePostal/>
            <Canal/>
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
