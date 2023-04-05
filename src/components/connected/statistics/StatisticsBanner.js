import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { conseillerActions } from '../../../actions';
import dayjs from 'dayjs';
import { isNavigatorFirefoxForAndroid } from '../../../utils/functionGetNavigatorPlateform';

// eslint-disable-next-line max-len
function StatisticsBanner({ dateDebut, dateFin, idTerritoire, typeStats, codePostal = null, ville = null, idSubordonne = null, nomSubordonneeCSV = null, codeCommune = null }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const user = useSelector(state => state.authentication?.user?.user);
  const blob = useSelector(state => state.conseiller?.blob);
  const territoire = location?.territoire;
  let typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : null;
  const isFirefoxForAndroid = isNavigatorFirefoxForAndroid();

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

  function getTitleExport() {
    const datesPDF = '_' + dayjs(dateDebut).format('DD/MM/YYYY') + '_' + dayjs(dateFin).format('DD/MM/YYYY');
    const identitePDF = nomSubordonneeCSV ?? user.prenom + '_' + user.nom;
    let titlePDF = 'Statistiques';
    if (typeStats) {
      titlePDF += '_' + typeStats + datesPDF;
    } else if (typeTerritoire) {
      titlePDF += typeTerritoire === 'codeDepartement' ?
        '_' + territoire?.nomDepartement + datesPDF :
        '_' + territoire?.nomRegion + datesPDF;
    } else {
      titlePDF += '_' + identitePDF + datesPDF;
    }
    return titlePDF;
  }

  function savePDF() {
    document.title = getTitleExport();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    window.print();
  }

  function saveCSV() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const type = getTypeStatistique(typeStats);
    if ((user?.role === 'conseiller' || user?.role === 'coordinateur_coop') && !idTerritoire && type !== 'nationales') {
      dispatch(conseillerActions.getStatistiquesCSV(dateDebut, dateFin, codePostal, ville, codeCommune, idSubordonne, getTitleExport()));
    } else {
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      // eslint-disable-next-line max-len
      dispatch(conseillerActions.getStatistiquesAdminCoopCSV(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser, conseillerIds, codePostal));
    }
  }

  function saveExcel() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const type = getTypeStatistique(typeStats);
    if ((user?.role === 'conseiller' || user?.role === 'coordinateur_coop') && !idTerritoire && type !== 'nationales') {
      dispatch(conseillerActions.getStatistiquesExcel(dateDebut, dateFin, codePostal, ville, codeCommune, idSubordonne, getTitleExport()));
    } else {
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      // eslint-disable-next-line max-len
      dispatch(conseillerActions.getStatistiquesAdminCoopExcel(dateDebut, dateFin, type, type !== 'user' ? idTerritoire : location?.idUser, conseillerIds, codePostal));
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
      <div className="fr-col-offset-2 fr-col-8 dont-print fr-mt-md-n15w">
        <hr className="fr-mx-5w"/>
        <div className="fr-m-5w fr-m-md-4w fr-m-xs-to-md-7v"></div>
      </div>
      <div className="fr-col-12 dont-print">
        <div className="fr-container-fluid">
          {!isFirefoxForAndroid &&
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-xs-6 fr-mt-5w centrerTexte">
              <div className="fr-mb-2v">Exporter cette page</div>
              <button className="statistiques_nationales-btn" onClick={savePDF}>Format PDF</button>
              {user?.role === 'conseiller' &&
                <button className="statistiques_nationales-btn" onClick={saveExcel}>Format Excel</button>
              }
              <button className="statistiques_nationales-btn" onClick={saveCSV}>Format CSV</button>
            </div>
          </div>
          }
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
  ville: PropTypes.string,
  codeCommune: PropTypes.string,
  idSubordonne: PropTypes.string,
  nomSubordonneeCSV: PropTypes.string
};

export default StatisticsBanner;
