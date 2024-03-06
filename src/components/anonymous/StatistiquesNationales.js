import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alerteActions, paginationActions, statistiqueActions } from '../../actions';
import PeriodStatistics from '../connected/statistics/StatisticsPeriod';
import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import StatisticsBanner from '../connected/statistics/StatisticsBanner';
import Footer from '../Footer';
import { Oval } from 'react-loader-spinner';
import Header from '../Header';
import AdminHeader from '../admin/AdminHeader';
import HeaderHub from '../hub/HeaderHub';
import StatisticsPrint from './StatisticsPrint';
import Alerte from '../common/Alerte';

function StatistiquesNationales() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication?.user?.user);
  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const errorPDF = useSelector(state => state.conseiller?.errorPDF);
  const loadingExcel = useSelector(state => state.conseiller?.loadingExcel);
  const errorExcel = useSelector(state => state.conseiller?.errorExcel);
  const isPDFDownloaded = useSelector(state => state.conseiller?.statistiquesPDF);
  let statsDataError = useSelector(state => state.statistique?.statsDataError);
  let dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  let dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  let donneesStatistiques = useSelector(state => state.statistique?.statsData);
  let typeTerritoire = 'nationales';

  useEffect(() => {
    dispatch(statistiqueActions.getStatsCraNationale(dateDebutStats, dateFinStats));
    dispatch(paginationActions.resetPage(false));
  }, [dateDebutStats, dateFinStats]);

  useEffect(() => {
    if (isPDFDownloaded === false) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: 'Vos statistiques n\'ont pas pu êtretre téléchargées, veuillez réessayer !',
      }));
    }
    if (errorPDF) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorPDF,
      }));
    }
    if (errorCSV) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorCSV,
      }));
    }
    if (errorExcel) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorExcel,
      }));
    }
  }, [isPDFDownloaded, errorPDF, errorCSV, errorExcel]);

  return (
    <div>
      {user?.role === 'hub_coop' ? <HeaderHub /> : <Header linkAccount={user?.name}/>}
      {user?.role === 'admin_coop' &&
        <div className="admin dont-print">
          <AdminHeader linkAccount={user?.name} />
        </div>
      }
      <StatisticsPrint dateDebutStats={dateDebutStats} dateFinStats={dateFinStats} donneesStatistiques={donneesStatistiques}/>
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
                Statistiques Nationales
              </h1>
              <div className="fr-mb-5w fr-mt-md-4w"></div>
            </div>
          </div>

          <div className="fr-grid-row">
            <div className="fr-col-xs-3 fr-col-sm-7 fr-col-md-6 fr-col-lg-4">
              <div className="fr-mb-4w fr-mb-md-6w">
                <PeriodStatistics dateDebut={dateDebutStats} dateFin={dateFinStats} />
              </div>
            </div>

            <div className="fr-col-md-6 fr-col-lg-8">
              <hr className="hr-sm-hide fr-mt-2w"/>
              <div className="fr-m-6w fr-m-xs-to-md-7v"></div>
            </div>
          </div>

          { donneesStatistiques !== undefined &&
            <div className="fr-grid-row">

              <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire} print={false}/>

              <div className="fr-col-offset-md-1"></div>

              <RightPage donneesStats={donneesStatistiques} print={false}/>

              <BottomPage donneesStats={donneesStatistiques} print={false}/>

            </div>
          }
          {!donneesStatistiques &&
            <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
          }
        </div>
        <StatisticsBanner dateDebut={dateDebutStats} dateFin={dateFinStats} typeStats={'nationales'}/>
        <div className="fr-m-5w fr-m-md-9w fr-m-lg-15w"></div>
        <Footer type="support" role={user?.role}/>
      </div>
    </div>
  );
}

export default StatistiquesNationales;
