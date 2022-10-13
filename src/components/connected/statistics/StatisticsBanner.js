import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { conseillerActions } from '../../../actions';

function StatisticsBanner({ dateDebut, dateFin, idTerritoire, typeStats, codePostal = null }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const user = useSelector(state => state.authentication.user.user);
  const blob = useSelector(state => state.conseiller?.blob);
  const territoire = location?.territoire;
  let typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : null;

  function getTypeStatistique(type) {
    let typeTarget = '';
    switch (type) {
      case 'nationales':
        typeTarget = type;
        break;
      case 'structure':
        typeTarget = type;
        break;
      default:
        typeTarget = typeTerritoire ?? 'user';
        break;
    }
    return typeTarget;
  }

  function savePDF() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (user?.role === 'conseiller') {
      dispatch(conseillerActions.getStatistiquesPDF(user.entity.$id, dateDebut, dateFin, codePostal));
    } else {
      const type = getTypeStatistique(typeStats);
      dispatch(conseillerActions.getStatistiquesAdminCoopPDF(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser, codePostal));
    }
  }

  function saveCSV() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const type = getTypeStatistique(typeStats);
    if ((user?.role === 'conseiller' || user?.role === 'coordinateur_coop') && !idTerritoire && type !== 'nationales') {
      dispatch(conseillerActions.getStatistiquesCSV(dateDebut, dateFin, codePostal, idSubordonne, nomSubordonneeCSV));
    } else {
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      // eslint-disable-next-line max-len
      dispatch(conseillerActions.getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser, conseillerIds, codePostal));
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
      <div className="fr-col-offset-2 fr-col-8 no-print fr-mt-md-n15w">
        <hr className="fr-mx-5w"/>
        <div className="fr-m-5w fr-m-md-4w fr-m-xs-to-md-7v"></div>
      </div>
      <div className="fr-col-12 no-print">
        <div className="fr-container-fluid">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-xs-6 fr-col-sm-6 fr-col-md-5 fr-col-lg-4 fr-mt-5w centrerTexte">
              <div className="fr-mb-2v">Exporter cette page</div>
              <button className="statistiques_nationales-btn" onClick={savePDF}>Format PDF</button>
              &ensp;
              <button className="statistiques_nationales-btn" onClick={saveCSV}>Format CSV</button>
            </div>
          </div>

          { (typeTerritoire || location?.idUser) &&
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-xs-6 fr-col-sm-6 fr-col-md-7 fr-col-lg-8 afficher-etapes">
              <ul className="fr-footer__bottom-list liste-action">
                <li className="fr-footer__bottom-item">
                  <Link className="fr-footer__bottom-link fr-pr-sm-1w" style={{ boxShadow: 'none', color: '#8585F6', fontSize: '16px' }}
                    to={linkTo}>
                    <img className="image-banniere" src="/logos/statistics/logo-fleche-gauche.svg" alt="Revenir &agrave;
                    l’&eacute;tape pr&eacute;c&eacute;dente"
                    style={{ verticalAlign: 'super' }} />
                    <span style={{ paddingLeft: '8px' }}>Page pr&eacute;c&eacute;dente</span>
                  </Link>
                </li>
              </ul>
              <div className="fr-m-5w"></div>
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
  typeStats: PropTypes.string,
  codePostal: PropTypes.string,
};

export default StatisticsBanner;
