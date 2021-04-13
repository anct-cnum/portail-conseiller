import React from 'react';

function StatisticsBanner() {

  return (
    <>
      <div className="rf-col-12">
        <hr />
        <div className="rf-m-5w rf-m-md-4w rf-m-xs-to-md-7v"></div>
      </div>
      <div className="rf-col-12">
        <div className="rf-container-fluid">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12">
              <div className="rf-m-sm-4w rf-m-5w"></div>
            </div>

            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-5 afficher-etapes">
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
              <div className="rf-m-5w"></div>
            </div>

            <div className="rf-col-md-4 rf-col-lg-4 afficher-export">
              <ul className="rf-footer__bottom-list max-width-list ">
                <li className="rf-footer__bottom-item">
                  <a className="rf-footer__bottom-link rf-pr-1w" href="">
                    Exporter au format PDF
                  </a>
                </li>
                <li className="rf-footer__bottom-item">
                  <a className="rf-footer__bottom-link rf-pl-1w" href="">
                    Exporter au format CSV
                  </a>
                </li>
              </ul>
            </div>
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-5 rf-col-lg-3">
              <a className="statistiques_nationales-btn droite-btn">Voir les statistiques nationales</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticsBanner;
