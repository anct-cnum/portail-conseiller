import React from 'react';

function StatisticsBanner() {

  return (

    <div className="rf-container-fluid">
      <div className="rf-grid-row">
        <div className="rf-col-sm-1"></div>
        <div className="rf-col-lg-4 afficher-etapes">
          <ul className="rf-footer__bottom-list">
            <li className="rf-footer__bottom-item">
              <a className="rf-footer__bottom-link rf-pr-sm-1w" href="">
                <img className="image-banniere" src="/logos/statistics/logo-fleche-gauche.svg" alt="Revenir à l’étape précédente"/>
                Revenir à l’étape précédente
              </a>
            </li>
            <li className="rf-footer__bottom-item">
              <a className="rf-footer__bottom-link rf-pl-sm-1w " href="">
                <img className="image-banniere" src="/logos/statistics/logo-croix.svg" alt="Annuler la dernière saisie"/>
                Annuler la dernière saisie
              </a>
            </li>
          </ul>
        </div>
        <div className="rf-col-lg-4 afficher-export">
          <ul className="rf-footer__bottom-list max-width-list">
            <li className="rf-footer__bottom-item">
              <a className="rf-footer__bottom-link rf-pr-1w rf-pl-6w" href="">
                Exporter au format PDF
              </a>
            </li>
            <li className="rf-footer__bottom-item">
              <a className="rf-footer__bottom-link rf-pr-4w rf-pl-1w" href="">
                Exporter au format CSV
              </a>
            </li>
          </ul>
        </div>
        <div className="rf-col-lg-3">
          <a className="rf-btn menu-btn droite-btn">Voir les statistiques nationales</a>
        </div>
      </div>
    </div>
  );
}

export default StatisticsBanner;
