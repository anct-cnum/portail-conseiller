import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { conseillerActions, statistiqueActions } from '../../../actions';

function StatisticsBanner({ dateDebut, dateFin, idTerritoire }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const user = useSelector(state => state.authentication.user.user);
  const blob = useSelector(state => state.conseiller?.blob);

  const territoire = location?.territoire;
  let typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : null;

  function savePDF() {
    if (user?.role === 'admin_coop') {
      const type = typeTerritoire ?? 'user';
      dispatch(conseillerActions.getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser));
    } else {
      dispatch(conseillerActions.getStatistiquesPDF(dateDebut, dateFin));
    }
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

  let linkTo = { currentPage: location?.currentPage, origin: '/statistiques' };
  if (typeTerritoire) {
    linkTo.pathname = `/territoires`;
    linkTo.conseillerIds = location?.conseillerIds;
    linkTo.nomTerritoire = location?.nomDepartement;
  } else if (location?.idUser) {
    linkTo.pathname = `/conseiller/${location?.idUser}`;
    linkTo.currentPage = location?.currentPage;
  }

  return (
    <>
      <div className="rf-col-offset-2 rf-col-8 no-print">
        <hr className="rf-mx-5w"/>
        <div className="rf-m-5w rf-m-md-4w rf-m-xs-to-md-7v"></div>
      </div>
      <div className="rf-col-12 no-print">
        <div className="rf-container-fluid">
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
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-5 rf-col-lg-4 rf-mt-5w centrerTexte">
              <a className="statistiques_nationales-btn" onClick={savePDF}>Exporter cette page au format PDF</a>
            </div>

          </div>

          { (typeTerritoire || location?.idUser) &&
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-8 afficher-etapes">
              <ul className="rf-footer__bottom-list liste-action">
                <li className="rf-footer__bottom-item">
                  <Link className="rf-footer__bottom-link rf-pr-sm-1w" style={{ boxShadow: 'none' }}
                    to={linkTo}>
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

StatisticsBanner.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  idTerritoire: PropTypes.string
};

export default StatisticsBanner;
