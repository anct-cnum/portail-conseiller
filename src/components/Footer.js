import React from 'react';
import PropTypes from 'prop-types';

function Footer({ type, role }) {

  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';
  const aideStructure = process.env.REACT_APP_AIDE_URL;

  return (
    <footer className="fr-footer" role="contentinfo" id="footer">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-xs-10 fr-col-sm-10 fr-col-md-10 fr-col-xl-12">
            <div className="fr-footer__body">
              <div className="fr-container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className="fr-grid-row fr-grid-row--bottom">
                  <div>
                    {/* NORMAL FOOTER */}
                    { type === undefined &&
                    <div>
                      <div className="fr-footer__brand">
                        <a className="fr-footer__brand-link">
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-fr-nb.svg" alt="logo R&eacute;publique Française"
                              style={{ height: '80px', marginRight: '28px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-anct-nb.svg" alt="logo Agence Nationale De La Coh&eacute;sion Des Territoires"
                              style={{ height: '59px', marginRight: '50px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-france-relance-nb.svg" alt="logo France Relance"
                              style={{ height: '70px', marginBottom: '-10px' }} className="logoFooter"/>
                          </div>
                        </a>
                      </div>
                      <div className="fr-footer__content fr-mt-3w">
                        <p className="fr-footer__content-desc">
                        Conseiller num&eacute;rique France Services est un dispositif financ&eacute; par l&rsquo;&Eacute;tat dans le cadre de France Relance.
                        Il est pilot&eacute; par l&rsquo;Agence nationale de la coh&eacute;sion des territoires avec l&rsquo;appui de la Banque des Territoires.
                        </p>
                      </div>
                      <div>
                        <ul className="fr-footer__content-list" style={{ justifyContent: 'flex-end' }}>
                          <li >
                            <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
                          </li>
                          <li >
                            <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
                          </li>
                          <li >
                            <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    }
                    {/* SUPPORT FOOTER */}
                    { type === 'support' &&
                    <div>
                      <div className="fr-container" style={{ padding: 0 }}>
                        <div className="fr-grid-row">
                          <div className="fr-col-12 fr-mb-2w">
                            {role === 'structure_coop' &&
                              <a className="lien-footer" href={aideStructure} target="blank" rel="noreferrer">
                                <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                                <span >Aide espace Coop</span>
                              </a>
                            }
                            {role !== 'structure_coop' &&
                            <>
                              <a className="lien-footer" href={aideCoop} target="blank" rel="noreferrer">
                                <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                                <span >Aide espace Coop</span>
                              </a>
                              <a className="lien-footer" href={aideMetier} target="blank" rel="noreferrer">
                                <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt="liens aide vers Mattermost"/>
                                <span>Aide m&eacute;tier</span>
                              </a>
                            </>
                            }
                          </div>
                          <div className="fr-col-12">
                            <p style={{ fontSize: '14px', lineHeight: '24px', marginBottom: '2.5rem' }}>
                              L&rsquo;&eacute;quipe Conseiller num&eacute;rique France Services travaille en am&eacute;lioration continue.
                              Vous rencontrez un probl&egrave;me, vous souhaitez exprimer un avis ? Rendez-vous sur les canaux d&rsquo;aide de votre espace de
                              discussion en cliquant sur les boutons ci-dessus.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    }
                    <div className="fr-footer__bottom">
                      <ul className="fr-footer__bottom-list">
                        <li className="fr-footer__bottom-item">
                          <a className="fr-footer__bottom-link" target="blank" rel="noreferrer"
                            href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilit&eacute;: non conforme
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item">
                          <a className="fr-footer__bottom-link fr-px-1w marge-mention" target="blank" rel="noreferrer"
                            href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions l&eacute;gales
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item marge-bar-donnees">
                          <a className="fr-footer__bottom-link fr-px-1w marge-donnees" target="blank" rel="noreferrer"
                            href="https://cdn.conseiller-numerique.gouv.fr/DonneesPersonnelles-ConseillerNumerique-Coop.pdf">
                        Donn&eacute;es personnelles
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item marge-bar-cgu">
                          <a className="fr-footer__bottom-link fr-px-1w marge-cgu" target="blank" rel="noreferrer"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-ConseillerNumerique-Coop.pdf">
                        Conditions g&eacute;n&eacute;rales d&rsquo;utilisation
                          </a>
                        </li>
                      </ul>
                      <div className="fr-footer__bottom-copy marge-responsive">
                        <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noreferrer">licence etalab-2.0</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

}

Footer.propTypes = {
  type: PropTypes.string,
  role: PropTypes.string
};

export default Footer;
