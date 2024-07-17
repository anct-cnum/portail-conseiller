import React from 'react';
import PropTypes from 'prop-types';

function Footer({ type, role }) {
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  return (
    <footer className="fr-footer" role="contentinfo" id="footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          { type === undefined &&
          <>
            <div className="fr-footer__brand">
              <a className="fr-footer__brand-link">
                <div style={{ display: 'inline-block' }} >
                  <img src="/logos/logo-fr-nb.svg" alt=""
                    style={{ height: '80px', marginRight: '28px' }} className="logoFooter"/>
                </div>
                <div style={{ display: 'inline-block' }} >
                  <img
                    src="/logos/logo-sonum-anct-min.svg"
                    alt=""
                    style={{ height: '80px', marginRight: '50px' }}
                    className="logoFooter"
                  />
                </div>
                <div style={{ display: 'inline-block' }} >
                  <img src="/logos/logo-france-relance-nb.svg" alt=""
                    style={{ height: '70px', marginBottom: '-10px' }} className="logoFooter"/>
                </div>
              </a>
            </div>

            <div className="fr-footer__content">
              <p className="fr-footer__content-desc">
                Conseiller numérique est un dispositif financé par l’état dans le cadre de France Relance.
                Il est piloté par l’Agence nationale de la cohésion des territoires avec l’appui de la Banque des Territoires.</p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/" rel="noreferrer" target="_blank">
                    anct.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/" rel="noreferrer" target="_blank">
                    societenumerique.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/" rel="noreferrer" target="_blank">
                    banquedesterritoires.fr
                  </a>
                </li>
              </ul>
            </div>
          </>
          }
          {/* SUPPORT FOOTER */}
          { type === 'support' &&
          <>
            <div className="fr-footer__brand">
              {role !== 'structure_coop' &&
                <>
                  <a className="fr-footer__brand-link lien-footer" href={aideCoop} target="_blank" rel="noreferrer">
                    <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt=""/>
                    <span>Aide espace Coop</span>
                  </a>
                  <a className="fr-footer__brand-link lien-footer" href={aideMetier} target="_blank" rel="noreferrer">
                    <img src="/logos/bulle-ressourcerie.svg" className="bulle-ressourcerie" alt=""/>
                    <span>Aide métier</span>
                  </a>
                </>
              }
            </div>

            <div className="fr-footer__content">
              <p className="fr-footer__content-desc">
                L’équipe Conseiller numérique travaille en amélioration continue.
                Vous rencontrez un problème, vous souhaitez exprimer un avis ? Rendez-vous sur les canaux d’aide de votre espace de
                discussion en cliquant sur les boutons ci-dessus.</p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/" rel="noreferrer" target="_blank">
                    anct.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/" rel="noreferrer" target="_blank">
                    societenumerique.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/" rel="noreferrer" target="_blank">
                    banquedesterritoires.fr
                  </a>
                </li>
              </ul>
            </div>
          </>
          }
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-pr-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">
                FAQ
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w" href="https://www.conseiller-numerique.gouv.fr/accessibilite">
                Accessibilité : non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w" href="https://www.conseiller-numerique.gouv.fr/mentions-legales">
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Données personnelles
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Conditions générales d’utilisation
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>Sauf mention contraire, tous les contenus de ce site sont sous&nbsp;
              <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" rel="noreferrer" target="_blank">licence etalab-2.0</a>
            </p>
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
