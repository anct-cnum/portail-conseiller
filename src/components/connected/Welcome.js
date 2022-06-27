import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import ReactTooltip from 'react-tooltip';

function Welcome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const user = useSelector(state => state.authentication.user.user);
  const lienPix = `${process.env.REACT_APP_PIX_URL}?control1714940=${conseiller?.prenom}&control1714939=${conseiller?.nom}&control1714941=${user?.name}`;
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const lienWebmail = process.env.REACT_APP_WEBMAIL_URL;
  const lienRdvSolidarites = process.env.REACT_APP_RDV_SOLIDARITES_URL;

  return (
    <>
      <div className="welcome">
        <div className="rf-container rf-container--fluid fond-sombre">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-mt-15w rf-mb-3w">
                    { conseiller && !conseiller?.supHierarchique &&
                      <div className="div-info-rappel-hierarchique rf-mb-3w rf-py-1w">
                        <i className="ri-information-line information icone-info-rappel"></i>
                        <p className="margin-info">
                          Afin que votre responsable hi&eacute;rarchique puisse recevoir toutes les informations concernant le dispositif et vous accompagner
                          au mieux, merci de nous indiquer ses coordonn&eacute;es en compl&eacute;tant le formulaire dans l&apos;onglet Mes informations,
                          contact hi&eacute;rarchique sur la page d&apos;accueil en haut &agrave; droite de votre Espace Coop.
                        </p>
                      </div>
                    }
                    <h2 className="titre">
                      <img src="/logos/home-connected/hexagone-1.svg" className="hexagone"/>
                      Services
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row espacement-centre-groupe-icon rf-mt-6w">
                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-3 menu-btn rf-mb-3w">
                    <Link to="/compte-rendu-activite" title="Acc&eacute;der &agrave; mon outil de suivi d&rsquo;activit&eacute;">
                      <img src="/logos/home-connected/icone-cra.svg" className="icone-btn icone-cra"/>
                      Suivi d&rsquo;activit&eacute;
                    </Link>
                  </div>
                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-2 menu-btn rf-mb-3w">
                    <a href={lienMattermost} target="blank" title="Acc&egrave;s espace discussion">
                      <img src="/logos/home-connected/icone-discussion.svg" className="icone-btn icone-mattermost"/>
                      Espace de discussion
                      <span data-tip="
                        <div><b>Astuce :</b> l’espace de discussion fonctionne via le logiciel libre Mattermost.
                        Si vous le souhaitez, il est possible de l’installer sur votre ordinateur ou votre t&eacute;l&eacute;phone
                        afin de pouvoir y acc&eacute;der directement.</div>
                        <br/>
                        <div>Pour le t&eacute;l&eacute;charger : www.mattermost.com/download/ </div>
                        <br/>
                        <div>Pour le param&eacute;trer : </div>
                        <div>serveur : https://discussion.conseiller-numerique.gouv.fr </div>
                        <div>identifiants : votre mail et votre mot de passe Conseiller num&eacute;rique. </div>
                        <div>Cette fonctionnalit&eacute; sera disponible prochainement.</div>">
                        <i className="ri-information-line information"></i>
                      </span>
                    </a>
                  </div>
                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-3 menu-btn rf-mb-3w">
                    <Link to="/ressourcerie" title="Acc&eacute;der &agrave; la ressourcerie">
                      <img src="/logos/home-connected/icone-ressourcerie.svg" className="icone-btn icone-ressourcerie"/>
                      Ressourcerie
                    </Link>
                  </div>
                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-2 menu-btn rf-mb-3w">
                    <a href={lienPix} target="blank" title="Acc&eacute;der &agrave; Pix">
                      <img src="/logos/home-connected/icone-pix.svg" className="icone-btn icone-pix"/>
                      Pix
                    </a>
                  </div>
                </div>
                <div className="rf-grid-row espacement-centre-groupe-icon rf-mt-8w">

                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-3 menu-btn rf-mb-3w">
                    <Link to="/statistiques" title="Acc&eacute;der &agrave; aux statistiques">
                      <img src="/logos/home-connected/icone-statistiques.svg" className="icone-btn icone-statistiques"/>
                      Gestion, statistiques
                    </Link>
                  </div>

                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-2 menu-btn rf-mb-3w">
                    <Link to="/mes-lieux-activite" title="Acc&eacute;der &agrave; la ressourcerie">
                      <img src="/logos/home-connected/icone-lieux.svg" className="icone-btn icone-ressourcerie"/>
                      Lieux d&rsquo;activit&eacute;
                    </Link>
                  </div>

                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-3 menu-btn rf-mb-3w">
                    <a href={lienRdvSolidarites} target="blank" title="Acc&eacute;der &agrave; RDV Solidarit&eacute;s">
                      <img src="/logos/home-connected/logo-rdv-solidarites.svg" className="icone-btn icone-rdv-solidarites"/>
                      RDV Solidarit&eacute;s
                    </a>
                  </div>
                  <div className="rf-col-6 rf-col-sm-3 rf-col-md-2 menu-btn rf-mb-3w">
                    <a href={lienWebmail} target="blank" title="Acc&eacute;der &agrave; ma boîte mail">
                      <img src="/logos/home-connected/icone-courriel.svg" className="icone-btn icone-mail"/>
                      Acc&eacute;der au web mail
                      <span data-tip="
                        <div><b>Astuce:</b> pour configurer votre adresse prenom.nom@conseiller-numerique.com sur votre client
                        mail (Outlook, Thinderbird, etc.), voici les param&egrave;tres IMAP/POP:</div>
                       <ul>
                        <li>Serveur de courrier entrant : mail.gandi.net</li>
                        <li>Port : 993 pour IMAP en SSL (ou 995 pour POP en SSL)</li>
                        <li>M&eacute;thode de chiffrement : SSL/TLS</li>
                        <li>Serveur de courrier sortant : mail.gandi.net</li>
                        <li>Port : 465</li>
                        <li>Ne pas activer l'authentification SPA.</li>
                       </ul>">
                        <i className="ri-information-line information"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-mt-15w rf-mb-3w">
                    <h2 className="titre">
                      <img src="/logos/home-connected/hexagone-4.svg" className="hexagone"/>
                      Supports
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 fond-sombre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-6 rf-mt-6w">
                    <img src="/logos/home-connected/pres-guide-bien-demarrer-ma-mission.png" className="rf-mr-md-1w img-home"/>
                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf" target="blank"
                      className="document-btn rf-mt-5w rf-mb-4w" title="Kit bien d&eacute;marrer ma mission">
                      T&eacute;l&eacute;chargez le kit &laquo;&nbsp; Bien d&eacute;marrer ma mission &nbsp;&raquo;
                    </a>
                    <p className="document-text">
                      Ce document contient tout ce qu&rsquo;il faut savoir pour bien commencer votre activit&eacute; de
                      Conseiller num&eacute;rique France Services depuis votre inscription jusqu&rsquo;&agrave; votre entr&eacute;e
                      en poste.
                    </p>
                  </div>
                  <div className="rf-col-12 rf-col-md-6 rf-mt-6w">
                    <img src="/logos/home-connected/previews-elements-communication.png" className="rf-ml-md-3v img-home"/>
                    <a href="https://www.conseiller-numerique.gouv.fr/kit-communication" title="kit de communication" target="blank"
                      className="kit-communication-btn rf-mt-5w rf-mb-4w">
                        Acc&eacute;der au kit de communication
                    </a>
                    <p className="kit-communication-text">
                      Pour votre communication interne ou externe&nbsp;:&nbsp;papeterie, r&eacute;seaux sociaux, signal&eacute;tiques,
                      etc, cette seconde mise &agrave; jour du kit de communication est mis &agrave; votre disposition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rf-container rf-container--fluid fond-sombre">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-lg-6">
                    <h2 className="titre rf-my-7w rf-mt-15w">
                      <img src="/logos/home-connected/hexagone-3.svg" className="hexagone"/>
                      Nouveaut&eacute;s Coop et am&eacute;liorations &agrave; venir
                    </h2>
                    <span><b>Nouveaut&eacute;s&nbsp; de juin 2022&nbsp;:&nbsp;</b></span>
                    <p>
                      – Interface des lieux d&rsquo;activit&eacute; pour la carte nationale des conseillers<br/>
                    </p>
                    <span><b>Mai 2022&nbsp;:&nbsp;</b></span>
                    <p>
                      – Publication de la troisi&egrave;me &eacute;dition du kit de communication<br/>
                    </p>
                    <span><b>Am&eacute;liorations à venir&nbsp;:&nbsp;</b></span>
                    <p style={{ maxWidth: '570px' }}>
                      – Blog d&rsquo;actualit&eacute;s de la communaut&eacute; des conseillers num&eacute;riques<br/>
                      – Outil de suivi d&rsquo;activit&eacute;&nbsp;:&nbsp;am&eacute;lioration des statistiques, guides
                        utilisateur, nouvelle interface de saisie<br/>
                      – Campagne de communication Conseiller num&eacute;rique France Services dans la presse
                        r&eacute;gionale sur l&rsquo;ensemble du territoire<br/>
                    </p>
                    <a></a>
                  </div>
                  <div className="rf-col-12 rf-col-lg-6 rf-my-7w rf-mt-15w">
                    <img src="/logos/home-connected/utilisateurs.svg" className="img-home-futur"/>
                  </div>
                  <div className="rf-col-12 rf-mt-2w rf-mb-12w center-button">
                    <Link to="/a-propos" title="Acc&eacute;der &agrave; la page &agrave; propos" className="propos-btn">
                      &Agrave; propos des services en ligne des conseillers num&eacute;riques
                    </Link>
                  </div>
                </div>
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
