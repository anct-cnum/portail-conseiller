import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { conseillerActions } from '../../../actions';

function StatisticsBanner({ dateDebut, dateFin, idTerritoire, nationales = false, codePostal = null }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const user = useSelector(state => state.authentication.user.user);
  const blob = useSelector(state => state.conseiller?.blob);

  const territoire = location?.territoire;
  let typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : null;

  function savePDF() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (user?.role === 'admin_coop' || user?.role === 'structure_coop') {
      const type = nationales === false ? typeTerritoire ?? 'user' : 'nationales';

      dispatch(conseillerActions.getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser));
    } else {
      dispatch(conseillerActions.getStatistiquesPDF(user.entity.$id, dateDebut, dateFin, codePostal));
    }
  }

  function saveCSV() {
    if (user?.role === 'admin_coop' || user?.role === 'structure_coop') {
      const type = nationales === false ? typeTerritoire ?? 'user' : 'nationales';
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      // eslint-disable-next-line max-len
      dispatch(conseillerActions.getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser, conseillerIds));
    } else {
      dispatch(conseillerActions.getStatistiquesCSV(dateDebut, dateFin, codePostal));
    }
  }

  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(conseillerActions.resetStatistiquesPDFFile());
    }
  }, [blob, downloadError]);

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
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-5 rf-col-lg-4 rf-mt-5w centrerTexte">
              <div className="rf-mb-2v">Exporter cette page</div>
              <button className="statistiques_nationales-btn" onClick={savePDF}>Format PDF</button>
              &ensp;
              <button className="statistiques_nationales-btn" onClick={saveCSV}>Format CSV</button>
            </div>
          </div>

          { (typeTerritoire || location?.idUser) &&
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-xs-6 rf-col-sm-6 rf-col-md-7 rf-col-lg-8 afficher-etapes">
              <ul className="rf-footer__bottom-list liste-action">
                <li className="rf-footer__bottom-item">
                  <Link className="rf-footer__bottom-link rf-pr-sm-1w" style={{ boxShadow: 'none' }}
                    to={linkTo}>
                    <img className="image-banniere" src="/logos/statistics/logo-fleche-gauche.svg" alt="Revenir &agrave;
                    l’&eacute;tape pr&eacute;c&eacute;dente"/>
                    Revenir &agrave; la page pr&eacute;c&eacute;dente
                  </Link>
                </li>
              </ul>
              <div className="rf-m-5w"></div>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
}

StatisticsBanner.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  idTerritoire: PropTypes.string,
  nationales: PropTypes.bool,
  codePostal: PropTypes.string,
};

export default StatisticsBanner;
