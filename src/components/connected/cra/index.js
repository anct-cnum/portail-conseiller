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
import FlashMessage from 'react-flash-message';
import { useLocation } from 'react-router';
import Recurrence from './Recurrence';

function Cra() {

  const location = useLocation();
  const urlAPropos =
  process.env.REACT_APP_AIDE_URL + '/article/comment-le-conseiller-numerique-rend-il-compte-de-ses-activites-et-a-quoi-cela-sert-il-16n3yhq/';

  //Forcer affichage en haut de la page pour voir le flashbag
  if (location?.printFlashbag === true) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }

  return (
    <>
      { location?.printFlashbag === true &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Votre suivi d&rsquo;activit&eacute; a bien &eacute;t&eacute; enregistr&eacute;&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      <div className="rf-container cra">
        <div className="rf-grid-row rf-grid-row--center rf-my-md-12w rf-pt-1w rf-pb-3w">
          <div className="rf-col-12 rf-col-lg-2 centre-titre">
            <img src="/logos/home-connected/icone-cra.svg" style={{ width: '114px', height: '78px' }} />
          </div>
          <div className="rf-col-12 rf-col-lg-6">
            <h1 className="titre centre-titre">Mon suivi d&rsquo;activit&eacute;</h1>
          </div>
          <div className="rf-col-12 rf-col-lg-2 url-a-propos">
            {urlAPropos &&
              <a className="a-propos" href={urlAPropos} target="blank" rel="noreferrer" >&Agrave; propos<br/>
              du suivi d&rsquo;activit&eacute;
              </a>
            }
          </div>
          <div className="rf-col-12 rf-col-md-2"></div>
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
    </>
  );
}

export default Cra;
