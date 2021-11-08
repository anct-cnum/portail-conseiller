import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FlashMessage from 'react-flash-message';
import ReactTooltip from 'react-tooltip';

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
  const lienWebmail = process.env.REACT_APP_WEBMAIL_URL;

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
        <div className="rf-container-fluid">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-mt-12w rf-mb-3w">
                    <h2 className="titre">
                      <img src="/logos/home-connected/hexagone-1.svg" className="hexagone"/>
                      Mes services
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 fond-sombre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-md-1"> </div>
                  <div className="rf-col-6 rf-col-md-3 rf-my-8w menu-btn">
                    <Link to="/compte-rendu-activite" title="Accéder à mon outil de suivi d&rsquo;activité">
                      <img src="/logos/home-connected/icone-cra.svg" className="icone-btn rf-mb-3v"/>
                      Suivi d&rsquo;activit&eacute;
                    </Link>
                  </div>
                  <div className="rf-col-6 rf-col-md-3 rf-my-8w menu-btn">
                    <a href={lienMattermost} target="blank" title="Accès espace discussion">
                      <img src="/logos/home-connected/icone-discussion.svg" className="icone-btn rf-mb-3v"/>
                      Espace de discussion
                      <span data-tip="
                        <div><b>Astuce :</b> l’espace de discussion fonctionne via le logiciel libre Mattermost.
                        Si vous le souhaitez, il est possible de l’installer sur votre ordinateur ou votre téléphone
                        afin de pouvoir y accéder directement.</div>
                        <br/>
                        <div>Pour le télécharger : www.mattermost.com/download/ </div>
                        <br/>
                        <div>Pour le paramétrer : </div>
                        <div>serveur : https://discussion.conseiller-numerique.gouv.fr </div>
                        <div>identifiants : votre mail et votre mot de passe Conseiller numérique. </div>
                        <div>Cette fonctionnalité sera disponible prochainement.</div>">
                        <i className="ri-information-line information"></i>
                      </span>
                    </a>
                  </div>
                  <div className="rf-col-6 rf-col-md-3 rf-my-8w menu-btn">
                    <Link to="/ressourcerie" title="Accéder à la ressourcerie">
                      <img src="/logos/home-connected/icone-ressourcerie.svg" className="icone-btn rf-mb-3v"/>
                      Ressourcerie
                    </Link>
                  </div>
                  <div className="rf-col-md-1"> </div>
                  <div className="rf-col-6 rf-col-md-3 rf-my-8w menu-btn">
                    <a href={lienPix} target="blank" title="Accéder à Pix">
                      <img src="/logos/home-connected/icone-pix.svg" className="icone-btn rf-mb-3v"/>
                      Pix
                    </a>
                  </div>
                  <div className="rf-col-6 rf-col-md-3 rf-my-8w menu-btn">
                    <a href={lienWebmail} target="blank" title="Accéder à ma boîte mail">
                      <img src="/logos/home-connected/icone-courriel.svg" className="icone-btn rf-mb-3v"/>
                      Acc&eacute;der au web mail
                      <span data-tip="
                        <div><b>Astuce:</b> pour configurer votre adresse prenom.nom@conseiller-numerique.com sur votre client
                        mail (Outlook, Thinderbird, etc.), voici les paramètres IMAP:</div>
                       <ul>
                        <li>Serveur de courrier entrant : mail.gandi.net</li>
                        <li>Port : 993</li>
                        <li>Méthode de chiffrement : SSL/TLS</li>
                        <li>Serveur de courrier sortant : mail.gandi.net</li>
                        <li>Port : 465</li>
                        <li>Ne pas activer l'authentification SPA.</li>
                       </ul>">
                        <i className="ri-information-line information"></i>
                      </span>
                    </a>
                  </div>
                  <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
                </div>
              </div>
            </div>

            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-mt-9w rf-mb-3w">
                    <h2 className="titre">
                      <img src="/logos/home-connected/hexagone-2.svg" className="hexagone"/>
                      Mes Supports
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 fond-sombre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-6 rf-mt-7w">
                    <img src="/logos/home-connected/pres-guide-bien-demarrer-ma-mission.png" className="rf-mr-md-1w img-home"/>
                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf" target="blank"
                      className="document-btn rf-mt-5w rf-mb-4w" title="Kit bien démarrer ma mission">
                      Téléchargez le kit « Bien démarrer ma mission »
                    </a>
                    <p className="rf-mb-8w rf-mr-md-1w">
                      Ce document contient tout ce qu’il faut savoir pour bien commencer votre activité de Conseiller
                      numérique France Services depuis votre inscription jusqu’à votre entrée en poste : les bons réflexes
                      à avoir, les outils d’inclusion numérique à connaître,
                      l’organisation des structures de médiation numérique sur les territoires ainsi que leurs contacts.
                    </p>
                  </div>
                  <div className="rf-col-12 rf-col-md-6 rf-mt-7w">
                    <img src="/logos/home-connected/pres-kit-communication.png" className="rf-ml-md-1w img-home"/>
                    <a href="https://www.conseiller-numerique.gouv.fr/kit-communication" title="kit de communication" target="blank"
                      className="kit-communication-btn rf-ml-md-1w rf-mt-5w rf-mb-4w">
                        Accéder au kit de communication
                    </a>
                    <p className="rf-mb-8w rf-ml-md-1w">
                      Pour votre communication interne ou externe : papeterie, réseaux sociaux, signalétiques, etc, un kit
                      de communication est mis à votre disposition. Cette seconde version comprend notamment la mise à jour de ces éléments :
                      illustrations, signature mail, cartes de visites imprimables, charte graphique, supports pour les réseaux sociaux, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-mt-9w rf-mb-3w">
                    <h2 className="titre">
                      <img src="/logos/home-connected/hexagone-3.svg" className="hexagone"/>
                      Les fonctionnalités à venir sur l’espace Coop
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 fond-sombre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-6 rf-mt-7w rf-mb-3w">
                    – les actualités régulières de la communauté Conseiller numérique France Services ;<br/>
                    – des temps de rencontres dédiés ;<br/>
                    – un fil d’actualités.<br/>
                    – une fonction de prise de rendez-vous ;<br/>
                    – une visualisation nationale des lieux de médiation numérique accessible<br/>
                    via le site vitrine des conseillers numériques France Services.<br/>
                    <br/>
                    <p>Consultez régulièrement votre e-mail pour être tenu au courant des activités et des mises à jour.</p>
                  </div>
                  <div className="rf-col-12 rf-col-md-6">
                    <img src="/logos/home-connected/illustration-bas-de-page.svg" className="rf-ml-md-1w img-home"/>
                  </div>
                </div>
                <div className="rf-col-12 rf-mb-12w"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
