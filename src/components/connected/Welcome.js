import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FlashMessage from 'react-flash-message';

function Welcome() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const user = useSelector(state => state.authentication.user.user);
  const lienPix = `${process.env.REACT_APP_PIX_URL}?control1714940=${conseiller?.prenom}&control1714939=${conseiller?.nom}&control1714941=${user?.name}`;
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;

  //Forcer affichage en haut de la page pour voir le flashbag
  if (location?.printFlashbag === true) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }

  return (
    <>
      <div className="welcome">
        { location?.printFlashbag === true &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Votre suivi d&rsquo;activité a bien été enregistré&nbsp;<i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
        }
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 rf-col-md-10">
              <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-8w">Bienvenue sur <br className="br-sm"/>l&rsquo;Espace Coop</h1>
            </div>

            <div className="rf-col-12 rf-col-lg-4 listBoutonsWelcome">
              <div className="centre">
                <Link className="cra-btn rf-mb-3w" to="/compte-rendu-activite" title="Accéder à mon outil de suivi d&rsquo;activité">
                  <span className="cra-logo-btn"></span>
                  <span className="cra-texte-btn">Accéder à mon outil <br/> de suivi d&rsquo;activité</span>
                </Link>
              </div>
            </div>

            <div className="rf-col-12 rf-col-lg-4">
              <div className="centre">
                <a className="mattermost-btn rf-mb-3w" href={lienMattermost} target="blank"
                  title="Accès espace discussion">
                  <span className="mattermost-logo-btn"></span>
                  <span className="mattermost-texte-btn">Accéder à l&rsquo;espace <br/> de discussion</span>
                </a>
              </div>
            </div>

            <div className="rf-col-12 rf-col-lg-4">
              <div className="centre">
                <a className="pix-btn rf-mb-3w" href={lienPix} target="blank"
                  title="Accéder à Pix">
                  <span className="pix-logo-btn"></span>
                  <span className="pix-texte-btn">Accéder à Pix</span>
                </a>
              </div>
            </div>


            <div className="rf-col-12 bloc-document">
              <div className="rf-container-fluid">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-12 rf-col-md-10 rf-mt-3w rf-mt-md-6w rf-mb-5w rf-mb-md-8w">
                    <h2 className="sous-titre">
                      Téléchargez le kit « Bien démarrer ma mission » pour en apprendre davantage sur le Suivi <br className="br-hidden"/>
                      d&rsquo;activité et l&rsquo;usage des données, sur l&rsquo;outil Pix , et bien d&rsquo;autres sujets.
                    </h2>
                  </div>

                  <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w center-md">
                    <p className="rf-ml-md-1w align-left-sm">Ce document PDF contient tout ce qu&rsquo;il faut savoir <br className="br-hidden"/>
                      pour bien commencer votre activité de Conseiller <br className="br-hidden"/>
                      numérique France Services depuis votre inscription <br className="br-hidden"/>
                      jusqu&rsquo;à votre entrée en poste : les bons réflexes à avoir, <br className="br-hidden"/>
                      les outils d&rsquo;inclusion numérique à connaître, <br className="br-hidden"/>
                      l&rsquo;organisation des structures de médiation numérique <br className="br-hidden"/>
                      sur les territoires ainsi que leurs contacts.
                    </p>

                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf"
                      target="blank"
                      className="document-btn rf-ml-md-1w rf-mb-5w"
                      title="Kit bien démarrer ma mission">
                      Téléchargez le document
                    </a>
                  </div>
                  <div className="rf-col-12 rf-col-md-5 center-md">
                    <img className="document-img rf-mb-6w rf-mb-md-9w rf-ml-md-5w" src="/logos/home-connected/bien-démarrer-ma-mission.png"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 rf-col-md-10 rf-mb-5w rf-mb-md-6w rf-mt-8w rf-mt-md-9w">
              <h2 className="sous-titre">Les autres fonctionnalités à venir sur
                <a href="https://coop.conseiller-numerique.gouv.fr/login" target="blank" title="site coop" style={{ boxShadow: 'none' }}>
                  &nbsp;coop.conseiller-numerique.gouv.fr
                </a>
              </h2>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-6w center-md">
              <img className="futur-img" src="/logos/home-connected/preview-pix.png"/>
            </div>

            <div className="rf-col-12 rf-col-md-5 rf-mb-7w rf-mb-md-9w align-left-sm center-md">
              <p className="rf-mb-5w  rf-mb-md-6w rf-ml-md-5w">
                – La possibilité de consulter ses mails sur la Coop&nbsp;;<br/>
                – les actualités régulières de la communauté Conseiller numérique France Services&nbsp;;<br/>
                – des temps de rencontres dédiés&nbsp;; <br/>
                – la bibliothèque d&rsquo;outils d&rsquo;inclusion numérique&nbsp;; <br/>
                – un forum et une ressourcerie participatifs.
              </p>

              <p className="rf-ml-md-5w">Consultez régulièrement votre e-mail pour être tenu au <br/>courant des activités et des mises à jour. </p>
            </div>

            <div className="rf-col-12 bloc-document rf-mb-7w rf-mb-md-9w">
              <div className="rf-container-fluid">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-12 rf-col-md-10 rf-mt-3w rf-mt-md-6w rf-mb-5w rf-mb-md-8w">
                    <h2 className="sous-titre">
                      Le kit de communication Conseiller numérique France Services
                    </h2>
                  </div>

                  <div className="rf-col-12 rf-col-md-5 rf-mb-md-6w center-md">
                    <p className="rf-ml-md-1w align-left-sm">Pour votre communication interne ou externe : papeterie, <br className="br-hidden"/>
                      réseaux sociaux, signalétiques, etc, un kit de communication est
                      mis à votre disposition. Il comprend à ce jour, les éléments <br className="br-hidden"/>
                      suivants :  <br className="br-hidden"/>
                      – modèle de cartes de visites imprimables&nbsp;; <br className="br-hidden"/>
                      – supports pour réseaux sociaux et charte graphique&nbsp;; <br className="br-hidden"/>
                      – logos et illustrations&nbsp;; <br className="br-hidden"/>
                      – modèle d&rsquo;étiquettes.
                    </p>

                    <a href="https://www.conseiller-numerique.gouv.fr/kit-communication" title="kit de communication" target="blank"
                      className="kit-communication-btn rf-ml-md-1w rf-mb-5w">
                        Accéder au kit de communication
                    </a>
                  </div>
                  <div className="rf-col-12 rf-col-md-5 center-md">
                    <img className="kit-communication-img rf-mb-6w rf-mb-md-9w rf-ml-md-5w" src="/logos/home-connected/supports-kit-communication.png"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 rf-mb-md-6w"></div>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
