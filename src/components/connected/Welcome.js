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
  const lienLaBase = `${process.env.REACT_APP_LABASE_URL}?email=${conseiller?.emailCN?.address}`;
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const lienWebmail = process.env.REACT_APP_WEBMAIL_URL;
  const lienRdvAideNumerique = process.env.REACT_APP_RDV_AIDE_NUMERIQUE_URL;

  return (
    <>
      <div className="welcome">
        { conseiller && !conseiller?.supHierarchique &&
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-mt-15w fr-mb-3w">
              <div className="info-rappel-hierarchique fr-mb-3w fr-py-1w">
                <i className="ri-information-line information icone-info-rappel"></i>
                <p className="margin-info">
                  Afin que votre responsable hi&eacute;rarchique puisse recevoir toutes les informations concernant le dispositif et vous accompagner
                  au mieux, merci de nous indiquer ses coordonn&eacute;es en compl&eacute;tant le formulaire dans l&apos;onglet Mes informations,
                  contact hi&eacute;rarchique sur la page d&apos;accueil en haut &agrave; droite de votre Espace Coop.
                </p>
              </div>
            </div>
          </div>
        </div>
        }
        <div className="fr-container fr-container--fluid fond-sombre">
          <div className="fr-grid-row">
            <div className="fr-col-12 fr-mb-12w">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center fr-mt-5w fr-mt-md-15w">
                  <div className="fr-col-12 fr-col-md-4 fr-mb-5w">
                    <div className="block-cra">
                      <Link to="/compte-rendu-activite" className="saisie-cra"
                        title="Acc&eacute;der &agrave; mon outil de suivi d&rsquo;activit&eacute;" >
                        <img src="/logos/home-connected/icone-saisie.svg"/>
                        <span>Enregistrer une activit&eacute;</span>
                      </Link>
                      <Link to="/historique "className="historique-cra"
                        title="Acc&eacute;der &agrave; l&rsquo;historique de vos comptes rendus d&rsquo;activit&eacute;" >
                        <img src="/logos/home-connected/icone-historique.svg"/><br/>
                        <span>Historique</span>
                      </Link>
                      <Link to="/statistiques" className="statistiques-cra"
                        title="Acc&eacute;der &agrave; aux statistiques" >
                        <img src="/logos/home-connected/icone-statistiques.svg"/><br/>
                        <span>Statistiques</span>
                      </Link>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-sm-6">
                    <div className="fr-container fr-container--fluid">
                      <div className="fr-grid-row bloc-liens">
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <a href={lienMattermost} target="blank" title="Acc&egrave;s espace discussion">
                            <img src="/logos/home-connected/icone-discussion.svg" className="icone-btn icone-mattermost"/>
                            Discussion
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
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <a href={lienWebmail} target="blank" title="Acc&eacute;der &agrave; ma boîte mail">
                            <img src="/logos/home-connected/icone-courriel.svg" className="icone-btn icone-mail"/>
                            Web mail
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
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <Link to="/mes-lieux-activite" title="Acc&eacute;der aux lieux d&rsquo;activit&eacute;">
                            <img src="/logos/home-connected/icone-lieux.svg" className="icone-btn icone-lieux"/>
                            Lieux d&rsquo;activit&eacute;
                          </Link>
                        </div>
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <a href={lienLaBase} rel="noreferrer" target="blank" title="Acc&eacute;der &agrave; La Base">
                            <img src="/logos/home-connected/icone-la-base.svg" className="icone-btn icone-la-base"/>
                            La Base
                          </a>
                        </div>
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <a href={lienRdvAideNumerique} target="blank" title="Acc&eacute;der &agrave; RDV Aide Num&eacute;rique">
                            <img src="/logos/home-connected/logo-rdv-aide-numerique.svg" className="icone-btn icone-rdv-aide-numerique"/>
                            RDV Aide Num&eacute;rique
                          </a>
                        </div>
                        <div className="fr-col-12 fr-col-sm-4 menu-btn fr-mb-5w">
                          <a href={lienPix} target="blank" title="Acc&eacute;der &agrave; Pix">
                            <img src="/logos/home-connected/icone-pix.svg" className="icone-btn icone-pix"/>
                            Pix
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fr-grid-row fr-grid-row--center fr-mt-md-9w">
                  <div className="fr-col-4">
                    <div className="fr-container fr-container--fluid">
                      <div className="fr-grid-row">
                        <div className="fr-col-12 fr-col-sm-6 menu-btn fr-mb-5w fr-mt-md-7w fr-ml-md-n2w">
                          <a href={lienPix} target="blank" title="Acc&eacute;der &agrave; Pix">
                            <img src="/logos/home-connected/icone-nationale.svg" className="icone-btn icone-pix"/>
                            <span>Statistiques <br/>nationales</span>
                          </a>
                        </div>
                        <div className="fr-col-12 fr-col-sm-6 menu-btn fr-mb-5w fr-mt-md-7w fr-ml-md-n3w">
                          <a href={lienPix} target="blank" title="Acc&eacute;der &agrave; Pix">
                            <img src="/logos/home-connected/icone-blog.svg" className="icone-btn icone-pix"/>
                            <span>M&eacute;dia CnFS</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fr-col-12 fr-col-sm-4 fr-col-md-3 menu-btn fr-mb-5w">
                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf" target="blank">
                      <img src="/logos/home-connected/icone-kit.svg" className=""/><br/>
                      <span>Kit de communication</span>
                    </a>
                  </div>
                  <div className="fr-col-12 fr-col-sm-4 fr-col-md-3 menu-btn fr-mb-5w">
                    <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf" target="blank">
                      <img src="/logos/home-connected/icone-mission.svg" className=""/><br/>
                      <span>Guide Bien d&eacute;marrer<br/> ma mission</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
