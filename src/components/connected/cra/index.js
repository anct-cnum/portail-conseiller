import React, { useEffect } from 'react';
import CanalEtAdresse from './CanalEtAdresse';
import Activite from './Activite';
import Age from './Age';
import Themes from './Themes';
import Statut from './Statut';
import Duree from './Duree';
import Accompagnement from './Accompagnement';
import ValidationButton from './Components/ValidationButton';
import Footer from '../../Footer';
import Recurrence from './Recurrence';
import { useDispatch, useSelector } from 'react-redux';
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';
import { history } from '../../../helpers';
import { permanenceActions } from '../../../actions';

function Cra() {
  const dispatch = useDispatch();
  const urlAPropos =
  process.env.REACT_APP_AIDE_URL + '/article/comment-le-conseiller-numerique-rend-il-compte-de-ses-activites-et-a-quoi-cela-sert-il-16n3yhq/';
  const printFlashbag = useSelector(state => state.cra.printFlashbag);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  useEffect(() => {
    if (printFlashbag) {
      history.push('historique');
    }
  }, [printFlashbag]);
  useEffect(() => {
    if (conseiller) {
      dispatch(permanenceActions.getMesPermanences(conseiller._id));
    }
  }, [conseiller]);
  return (
    <>
      <div className="fr-container cra">
        <div className="fr-grid-row fr-grid-row--center fr-my-md-12w fr-pt-1w fr-pb-3w">
          <div className="fr-col-12 fr-col-lg-1 centrer">
            <img src="/logos/home-connected/icone-cra.svg" className="icon-cra" />
          </div>
          <div className="fr-col-12 fr-col-lg-9">
            <h1 className="titre centrer fr-ml-md-12w">Enregistrer une activit&eacute;</h1>
          </div>
          <div className="fr-col-12 fr-col-lg-2 centrer">
            {urlAPropos &&
              <a className="fr-btn-secondaire btn-guide" href={urlAPropos} target="blank" rel="noopener noreferrer" >
                <i className="ri-lightbulb-line ri-xl"></i>&nbsp;Guide utilisateur
              </a>
            }
          </div>
          <div className="fr-col-12 fr-col-md-2"></div>
        </div>
        <CanalEtAdresse/>
        <Activite/>
        <Recurrence/>
        <Age/>
        <Statut/>
        <Themes/>
        <Duree/>
        <Accompagnement/>
        <ValidationButton/>
      </div>
      <Footer type="support"/>
      <AddToHomeScreen translate={{
        safariTapShare: `Pour installer l'icône sur votre écran d'accueil cliquer sur`,
        safariAddHomeScreen: `"Sur l'écran d'accueil"`,
        chromiumAddHomeScreen: `Pour installer l'icône sur votre écran d'accueil allez dans le menu du navigateur et "Ajouter à l'écran d'accueil"`
      }}/>
    </>
  );
}

export default Cra;
