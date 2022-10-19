import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';
import { history } from '../../../helpers';

function Cra() {

  const urlAPropos =
  process.env.REACT_APP_AIDE_URL + '/article/comment-le-conseiller-numerique-rend-il-compte-de-ses-activites-et-a-quoi-cela-sert-il-16n3yhq/';
  const printFlashbag = useSelector(state => state.cra.printFlashbag);

  useEffect(() => {
    if (printFlashbag) {
      history.push('historique');
    }
  }, [printFlashbag]);

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
          <div className="fr-col-12 fr-col-md-2"></div>
        </div>
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
