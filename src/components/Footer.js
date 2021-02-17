import React from 'react';

function Header() {

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
                    <div className="rf-footer__brand">
                      <a className="rf-footer__brand-link" href="/">
                        <div className="rf-mr-4w" style={{ display: 'inline-block' }} >
                          <img src="/logos/logo-rf-nb.svg" alt="logo République Française" style={{ height: '80px' }}/>
                        </div>
                        <div className="rf-mr-4w" style={{ display: 'inline-block' }} >
                          <img src="/logos/logo-anct-nb.svg" alt="logo Agence Nationale De La Cohésion Des Territoires" style={{ height: '59px' }}/>
                        </div>
                        <div className="rf-mr-4w" style={{ display: 'inline-block' }} >
                          <img src="/logos/logo-banque-des-territoires-nb.svg" alt="logo Banque Des Territoires"
                            style={{ height: '35px', marginBottom: '27px' }}/>
                        </div>
                        <div style={{ display: 'inline-block' }} >
                          <img src="/logos/logo-france-relance-nb.svg" alt="logo France Relance" style={{ height: '5rem' }}/>
                        </div>
                      </a>
                    </div>
                    <div className="rf-footer__content rf-mt-3w">
                      <p className="rf-footer__content-desc">
                    Conseiller numérique France Services est un dispositif financé par l&rsquo;Etat dans le cadre de France Relance.
                    Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires et opéré par la Banque des territoires
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
                    <div className="rf-footer__bottom">
                      <ul className="rf-footer__bottom-list">
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
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
                            href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                        Données personnelles
                          </a>
                        </li>
                        <li className="rf-footer__bottom-item">
                          <a className="rf-footer__bottom-link rf-px-1w"
                            href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
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

export default Header;
