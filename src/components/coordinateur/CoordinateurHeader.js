import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import { Tooltip } from 'react-tooltip';

function CoordinateurHeader() {

  const dispatch = useDispatch();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const user = useSelector(state => state.authentication.user.user);

  const lienPix = `${process.env.REACT_APP_PIX_URL}?control1714940=${conseiller?.prenom}&control1714939=${conseiller?.nom}&control1714941=${user?.name}`;
  const lienWebmail = process.env.REACT_APP_WEBMAIL_URL;
  const lienRdvAideNumerique = process.env.REACT_APP_RDV_AIDE_NUMERIQUE_URL;
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const lienLaBase = process.env.REACT_APP_LABASE_URL;

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);
  return (
    <>
      <div className="welcome coordinateur-header fr-mb-5w">
        <div className="fr-container fr-container--fluid fond-sombre">
          <div className="fr-grid-row">
            <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white"/>
            <div className="fr-col-12 fr-mt-5w">
              <div className="fr-container">
                <div className="fr-grid-row espacement-centre-groupe-icon">

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/accueil" title="Acc&eacute;der &agrave; la liste de mes conseillers">
                      <img src="/logos/icone-couple-conseillers.svg" className="icone-btn icone-cra"/>
                      Liste des <br/>conseillers
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/compte-rendu-activite" title="Acc&eacute;der &agrave; mon outil de suivi d&rsquo;activit&eacute;">
                      <img src="/logos/home-connected/icone-cra.svg" className="icone-btn icone-cra"/>
                      Suivi d&rsquo;activit&eacute;
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/historique" className="historique-cra"
                      title="Acc&eacute;der &agrave; l&rsquo;historique de vos comptes rendus d&rsquo;activit&eacute;" >
                      <img src="/logos/home-connected/icone-historique.svg"/><br/>
                      <span>Historique</span>
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <a href={lienMattermost} target="blank" title="Acc&egrave;s espace discussion">
                      <img src="/logos/home-connected/icone-discussion.svg" className="icone-btn icone-mattermost"/>
                      Espace de <br/>discussion
                      <span data-tooltip-id="infobulle-menu"
                        data-tooltip-html="
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

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <a href={lienLaBase} rel="noreferrer" target="blank" title="Acc&eacute;der &agrave; La Base">
                      <img src="/logos/home-connected/icone-la-base.svg" className="icone-btn icone-la-base"/>
                      La Base
                    </a>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <a href={lienPix} target="blank" title="Acc&eacute;der &agrave; Pix">
                      <img src="/logos/home-connected/icone-pix.svg" className="icone-btn icone-pix"/>
                      Pix
                    </a>
                  </div>
                </div>

                <div className="fr-grid-row espacement-centre-groupe-icon fr-mt-8w">
                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/statistiques-nationales" title="Acc&eacute;der aux statistiques nationales">
                      <img src="/logos/home-connected/icone-statistiques.svg" className="icone-btn icone-statistiques"/>
                      Statistiques Nationales
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/territoires" title="Acc&eacute;der aux statistiques par territoire">
                      <img src="/logos/home-connected/icone-statistiques.svg" className="icone-btn icone-cra"/>
                      Statistiques par <br/>territoire
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/statistiques" title="Acc&eacute;der aux statistiques">
                      <img src="/logos/home-connected/icone-statistiques.svg" className="icone-btn icone-statistiques"/>
                      Gestion, statistiques
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <Link to="/mes-lieux-activite" title="Acc&eacute;der aux lieux d&rsquo;activit&eacute;">
                      <img src="/logos/home-connected/icone-lieux.svg" className="icone-btn icone-la-base"/>
                      Lieux d&rsquo;activit&eacute;
                    </Link>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <a href={lienRdvAideNumerique} target="blank" title="Acc&eacute;der &agrave; RDV Aide Num&eacute;rique">
                      <img src="/logos/home-connected/logo-rdv-aide-numerique.svg" className="icone-btn icone-rdv-aide-numerique"/>
                      RDV Aide Num&eacute;rique
                    </a>
                  </div>

                  <div className="fr-col-6 fr-col-sm-3 fr-col-md-2 menu-btn fr-mb-3w">
                    <a href={lienWebmail} target="blank" title="Acc&eacute;der &agrave; ma boîte mail">
                      <img src="/logos/home-connected/icone-courriel.svg" className="icone-btn icone-mail"/>
                      Acc&eacute;der au web mail
                      <span data-tooltip-id="infobulle-menu"
                        data-tooltip-html="
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
          </div>
        </div>
      </div>
    </>
  );
}

CoordinateurHeader.propTypes = {
  role: PropTypes.string
};
export default CoordinateurHeader;
