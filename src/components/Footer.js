import React from 'react';
import PropTypes from 'prop-types';

function Footer({ type, titreBouton }) {

  return (
    <footer className="rf-footer" role="contentinfo" id="footer">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-1"></div>
          <div className="rf-col-10">
            <div className="rf-footer__body">
              <div className="rf-container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className="rf-grid-row rf-grid-row--bottom">
                  <div>
                    {/* NORMAL FOOTER */}
                    { type === undefined &&
                    <div>
                      <div className="rf-footer__brand">
                        <a className="rf-footer__brand-link" href="/">
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-rf-nb.svg" alt="logo République Française"
                              style={{ height: '80px', marginRight: '28px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-anct-nb.svg" alt="logo Agence Nationale De La Cohésion Des Territoires"
                              style={{ height: '59px', marginRight: '50px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-banque-des-territoires-nb.svg" alt="logo Banque Des Territoires"
                              style={{ height: '35px', marginBottom: '27px', marginRight: '50px' }} className="logoFooter"/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-france-relance-nb.svg" alt="logo France Relance"
                              style={{ height: '70px', marginBottom: '7px' }} className="logoFooter"/>
                          </div>
                        </a>
                      </div>
                      <div className="rf-footer__content rf-mt-3w">
                        <p className="rf-footer__content-desc">
                      Conseiller numérique France Services est un dispositif financé par l&rsquo;&Eacute;tat dans le cadre de France Relance.
                      Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires et opéré par la Banque des Territoires.
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
                            <p style={{ fontSize: '0.7rem', marginBottom: '2.5rem' }}>
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
                          <a className="rf-footer__bottom-link rf-pr-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w"
                            href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilité: non conforme
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w"
                            href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions légales
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                        Données personnelles
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                        Conditions générales d&rsquo;utilisation
                          </a>
                        </li>
                      </ul>
                      <div className="rf-footer__bottom-copy">
                        © République Française 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rf-col-1"></div>
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
