import React from 'react';
import PropTypes from 'prop-types';

function Footer({ type, titreBouton }) {

  return (
    <footer className="rf-footer" role="contentinfo" id="footer">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-footer__body">
              <div className="rf-container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className="rf-grid-row rf-grid-row--bottom">
                  <div>
                    {/* NORMAL FOOTER */}
                    { type === undefined &&
                    <div>
                      <div className="rf-footer__brand">
                        <a className="rf-footer__brand-link">
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-rf-nb.svg" alt="logo République Française"
                              style={{ height: '80px', marginRight: '28px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-anct-nb.svg" alt="logo Agence Nationale De La Cohésion Des Territoires"
                              style={{ height: '59px', marginRight: '50px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-france-relance-nb.svg" alt="logo France Relance"
                              style={{ height: '70px', marginBottom: '-10px' }} className="logoFooter"/>
                          </div>
                        </a>
                      </div>
                      <div className="rf-footer__content rf-mt-3w">
                        <p className="rf-footer__content-desc">
                        Conseiller numérique France Services est un dispositif financé par l&rsquo;&Eacute;tat dans le cadre de France Relance.
                        Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires avec l&rsquo;appui de la Banque des Territoires.
                        </p>
                      </div>
                      <div>
                        <ul className="rf-footer__content-list" style={{ justifyContent: 'flex-end' }}>
                          <li >
                            <a className="rf-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
                          </li>
                          <li >
                            <a className="rf-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
                          </li>
                          <li >
                            <a className="rf-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    }
                    {/* SUPPORT FOOTER */}
                    { type === 'support' &&
                    <div>
                      <div className="rf-container" style={{ padding: 0 }}>
                        <div className="rf-grid-row">
                          <div className="rf-col-xs-12 rf-col-sm-6">
                            <p style={{ fontSize: '16px', lineHeight: '24px', marginBottom: '2.5rem' }}>
                              L&rsquo;équipe de conception de la plateforme Conseiller numérique France Services travaille en amélioration continue.
                              Vous avez une idée, une réclamation, vous souhaitez exprimer un avis ? N&rsquo;hésitez pas à nous contacter en cliquant
                              sur le bouton ci-contre
                            </p>
                          </div>
                          <div className="rf-col-xs-12 rf-col-sm-6 footerButton" style={{ textAlign: 'center', marginTop: '0.8rem' }}>
                            <a className="rf-btn support-btn" target="blank" href="https://aide.conseiller-numerique.gouv.fr/fr/">
                              {titreBouton === undefined ? 'Contacter le support' : titreBouton}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    }
                    <div className="rf-footer__bottom">
                      <ul className="rf-footer__bottom-list">
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-pr-1w marge-responsive" target="blank"
                            href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w" target="blank"
                            href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilité: non conforme
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w marge-mention" target="blank"
                            href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions légales
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item marge-bar-donnees">
                          <a className="rf-footer__bottom-link rf-px-1w marge-donnees" target="blank"
                            href="https://cdn.conseiller-numerique.gouv.fr/DonneesPersonnelles-ConseillerNumerique-Coop.pdf">
                        Données personnelles
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item marge-bar-cgu">
                          <a className="rf-footer__bottom-link rf-px-1w marge-cgu" target="blank"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-ConseillerNumerique-Coop.pdf">
                        Conditions générales d&rsquo;utilisation
                          </a>
                        </li>
                      </ul>
                      <div className="rf-footer__bottom-copy marge-responsive">
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
  titreBouton: PropTypes.string,
};

export default Footer;
