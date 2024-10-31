import React from 'react';
import Footer from '../Footer';

function MigrationCoop() {
  return (
    <div>
      <div className="page-migration">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col">
              <div className="div-annonce-migration">
                <div>
                  <h1 className="fr-alert__title">
                    Migration vers la nouvelle version de la plateforme !
                  </h1>
                  <div className="fr-tag">
                    <img src="/logos/pin-conum.png" />
                    <p>
                      Les adresses e-mails professionnelles
                      @conseiller-numerique.fr ainsi que l’ancienne version de
                      l’espace Coop ont été supprimés aujourd’hui.
                    </p>
                  </div>
                  <p>
                    Nous vous invitons à créer votre compte sur la nouvelle
                    version de la plateforme où vous pourrez retrouvez toutes
                    vos données de l’ancienne version et découvrir de nouvelles
                    fonctionnalités adaptées à la pratique de la médiation
                    numérique.
                  </p>
                </div>
                <button
                  className="fr-btn fr-btn--icon-right fr-fi-external-link-line fr-link--icon"
                  href=""
                >
                  Voir le site
                </button>
              </div>
            </div>
            <div className="fr-col-2"></div>
            <div className="fr-col-4">
              <div className="div-coop-mediation-numerique">
                <div>
                  <img src="/logos/iconeCoop.png" />
                  <p>La Coop de la médiation numérique</p>
                </div>
                <img src="/logos/coopMediationNumerique.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MigrationCoop;
