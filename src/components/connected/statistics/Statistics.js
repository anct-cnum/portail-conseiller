import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alerteActions, paginationActions, statistiqueActions } from '../../../actions';
import StatisticsPeriod from './StatisticsPeriod';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';
import { Oval } from 'react-loader-spinner';
import StatisticsBanner from './StatisticsBanner';
import { useLocation } from 'react-router';
import ElementCodePostal from './Components/ElementCodePostal';
import StatisticsPrint from './StatisticsPrint';
import Alerte from '../../common/Alerte';

function Statistics() {
  const dispatch = useDispatch();
  const location = useLocation();

  const statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const errorPDF = useSelector(state => state.conseiller?.errorPDF);
  const loadingExcel = useSelector(state => state.conseiller?.loadingExcel);
  const errorExcel = useSelector(state => state.conseiller?.errorExcel);
  const isPDFDownloaded = useSelector(state => state.conseiller?.statistiquesPDF);
  const statsDataError = useSelector(state => state.statistique?.statsDataError);
  const dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  const dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  const codePostalStats = useSelector(state => state.statistique?.codePostalStats);
  const villeStats = useSelector(state => state.statistique?.villeStats);
  const codeCommune = useSelector(state => state.statistique?.codeCommune);
  const donneesStatistiques = useSelector(state => state.statistique?.statsData);
  const user = useSelector(state => state?.authentication?.user?.user);
  const nomStructure = useSelector(state => state?.structure?.structure?.nom);

  const territoire = location.state?.territoire;
  const nomComplet = location.state?.nomComplet;
  const typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : '';
  let nomTerritoire = null;
  if (typeTerritoire) {
    nomTerritoire = typeTerritoire === 'codeDepartement' ? territoire.nomDepartement : territoire.nomRegion;
  }

  useEffect(() => {
    if (location.state?.idUser) {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, location.state?.idUser));
    } else if (territoire) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, territoire.conseillerIds));
    } else {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, null, codePostalStats, codeCommune));
    }
    dispatch(paginationActions.resetPage(false));
  }, [dateDebutStats, dateFinStats, location, codePostalStats, codeCommune]);

  useEffect(() => {
    if (isPDFDownloaded === false) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: 'Vos statistiques n\'ont pas pu être téléchargées, veuillez réessayer !',
      }));
    }
    if (errorPDF) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorPDF?.toString(),
      }));
    }
    if (errorCSV) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorCSV?.toString(),
      }));
    }
    if (errorExcel) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorExcel?.toString(),
      }));
    }
  }, [isPDFDownloaded, errorPDF, errorCSV, errorExcel]);

  return (
    <>
      <StatisticsPrint dateDebutStats={dateDebutStats} dateFinStats={dateFinStats} donneesStatistiques={donneesStatistiques}
        user={user} nomComplet={nomComplet} nomStructure={nomStructure} typeTerritoire={typeTerritoire} nomTerritoire={nomTerritoire}/>
      <div className="statistics dont-print">
        <div className="fr-container">
          <div className="spinnerCustom">
            <Oval
              color="#00BFFF"
              height={100}
              width={100}
              visible={statsDataLoading === true || loadingPDF === true || loadingExcel === true || loadingCSV === true}
            />
          </div>
          <Alerte />
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <div className="fr-mt-2w fr-mt-md-9w fr-mt-lg-13w"></div>
              { (statsDataError !== undefined && statsDataError !== false) &&
                <p className="fr-label flashBag" style={{ color: 'red' }}>
                  {statsDataError?.toString()}
                </p>
              }
              <h1 className="title">
                {territoire &&
                <>
                  Statistiques - { territoire?.nomDepartement ?? territoire?.nomRegion }
                </>
                }
                {location?.idUser &&
                  <>Statistiques</>
                }
                {!territoire && !location?.idUser &&
                  <>Mes Statistiques</>
                }
              </h1>
              <div className="fr-mb-5w fr-mt-md-4w"></div>
            </div>
          </div>
          <div className="fr-grid-row">
            <div className="fr-col-xs-3 fr-col-sm-7 fr-col-md-6 fr-col-lg-4">
              <div className="fr-mb-4w fr-mb-md-6w">
                <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
                {user?.role.includes('conseiller') &&
                  <ElementCodePostal />
                }
              </div>
            </div>
            <div className="fr-col-md-6 fr-col-lg-8">
              <hr className="hr-sm-hide fr-mt-2w"/>
              <div className="fr-m-6w fr-m-xs-to-md-7v"></div>
            </div>
          </div>
          {
            donneesStatistiques && Object.keys(donneesStatistiques).length > 0 ?
              <div className="fr-grid-row">
                <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire}/>
                <div className="fr-col-offset-md-1"></div>
                <RightPage donneesStats={donneesStatistiques} print={false}/>
                <BottomPage donneesStats={donneesStatistiques} print={false}/>
              </div> :
              <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
          }
        </div>
        <StatisticsBanner dateDebut={dateDebutStats} dateFin={dateFinStats}
          idTerritoire={territoire?.[typeTerritoire]} codePostal={codePostalStats} ville={villeStats} codeCommune={codeCommune}
          idSubordonne={location?.idUser} nomSubordonneeCSV={location?.nomSubordonneeCSV}/>
        <div className="fr-m-5w fr-m-md-9w fr-m-lg-15w"></div>
        <Footer type="support" role={user?.role} />
      </div>
    </>
  );
}

export default Statistics;
