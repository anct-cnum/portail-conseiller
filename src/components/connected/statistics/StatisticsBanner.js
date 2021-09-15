import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { conseillerActions, statistiqueActions } from '../../../actions';

function StatisticsBanner(dates) {
  const location = useLocation();
  const dispatch = useDispatch();
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const user = useSelector(state => state.authentication.user.user);
  const blob = useSelector(state => state.conseiller?.blob);
  let typeTerritoire = location?.conseillerIds ? useSelector(state => state.filtersAndSorts?.territoire) : '';

  function savePDF() {
    dispatch(conseillerActions.getStatistiquesPDF(dates));
  }

  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(conseillerActions.resetStatistiquesPDFFile());
    }
  }, [blob, downloadError]);

  const [inputsPDF, setInputsPDF] = useState({
    datePickerDebutPDF: 0,
    datePickerFinPDF: 0
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputsPDF(inputsPDF => ({ ...inputsPDF, [name]: value }));
  }

  const chargeStatsPDF = () => {
    dispatch(statistiqueActions.changeDateStatsDebut(new Date(parseInt(inputsPDF.datePickerDebutPDF))));
    dispatch(statistiqueActions.changeDateStatsFin(new Date(parseInt(inputsPDF.datePickerFinPDF))));
  };

  return (
    <>
      <div className="rf-col-offset-2 rf-col-8 no-print">
        <hr className="rf-mx-5w"/>
        <div className="rf-m-5w rf-m-md-4w rf-m-xs-to-md-7v"></div>
      </div>
      <div className="rf-col-12 no-print">
        <div className="rf-container-fluid">
          { (!typeTerritoire && !location?.idUser) &&
          <div className="rf-grid-row rf-grid-row--center">
            {/*
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-5 afficher-etapes">
              <ul className="rf-footer__bottom-list liste-action">
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
              <ul className="rf-footer__bottom-list max-width-list liste-action">
                <li className="rf-footer__bottom-item">
                  <a className="rf-footer__bottom-link" onClick={savePDF}>
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
            */}
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-5 rf-col-lg-3 rf-mt-5w centrerTexte">
              <a className="statistiques_nationales-btn" onClick={savePDF}>Exporter cette page au format PDF</a>
            </div>

          </div>
          }
          { typeTerritoire &&
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-8 afficher-etapes">
              <ul className="rf-footer__bottom-list liste-action">
                <li className="rf-footer__bottom-item">
                  <Link className="rf-footer__bottom-link rf-pr-sm-1w" style={{ boxShadow: 'none' }} to={{
                    pathname: `/territoires`,
                    conseillerIds: location?.conseillerIds,
                    nomTerritoire: location?.nomDepartement,
                    currentPage: location?.currentPage,
                    origin: '/statistiques' }}>
                    <img className="image-banniere" src="/logos/statistics/logo-fleche-gauche.svg" alt="Revenir à l’étape précédente"/>
                    Revenir à la page précédente
                  </Link>
                </li>
              </ul>
              <div className="rf-m-5w"></div>
            </div>
          </div>
          }
          { location?.idUser &&
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-8 afficher-etapes">
              <ul className="rf-footer__bottom-list liste-action">
                <li className="rf-footer__bottom-item">
                  <Link className="rf-footer__bottom-link rf-pr-sm-1w" style={{ boxShadow: 'none' }} to={{
                    pathname: `/accueil`,
                    currentPage: location?.currentPage,
                    origin: '/statistiques' }}>
                    <img className="image-banniere" src="/logos/statistics/logo-fleche-gauche.svg" alt="Revenir à l’étape précédente"/>
                    Revenir à la page précédente
                  </Link>
                </li>
              </ul>
              <div className="rf-m-5w"></div>
            </div>
          </div>
          }
        </div>
        {user.pdfGenerator &&
          <div id="">
            <input type="text" id="datePickerDebutPDF" name="datePickerDebutPDF" onChange={handleChange}/>
            <input type="text" id="datePickerFinPDF" name="datePickerFinPDF" onChange={handleChange} />
            <button id="chargePDF" onClick={chargeStatsPDF}>click</button>
          </div>
        }
      </div>
    </>
  );
}

export default StatisticsBanner;
