import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginationActions, statistiqueActions } from '../../actions';
import PeriodStatistics from '../connected/statistics/StatisticsPeriod';
import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import StatisticsBanner from '../connected/statistics/StatisticsBanner';
import Footer from '../Footer';
import Spinner from 'react-loader-spinner';
import FlashMessage from 'react-flash-message';
import Header from '../Header';
import AdminHeader from '../admin/AdminHeader';
import HeaderHub from '../hub/HeaderHub';
import StatisticsPrint from './StatisticsPrint';

function StatistiquesNationales() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication?.user?.user);
  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const errorPDF = useSelector(state => state.conseiller?.errorPDF);
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

  return (
    <div>
      {user?.role === 'hub_coop' ? <HeaderHub /> : <Header linkAccount={user?.name}/>}
      {user?.role === 'admin_coop' &&
        <div className="admin dont-print">
          <AdminHeader linkAccount={user?.name} />
        </div>
      }
      <StatisticsPrint dateDebutStats={dateDebutStats} dateFinStats={dateFinStats} donneesStatistiques={donneesStatistiques}
        user={user} typeTerritoire={typeTerritoire}/>
      <div className="statistics dont-print">
        <div className="fr-container">
          <div className="spinnerCustom">
            <Spinner
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              visible={statsDataLoading === true || loadingPDF === true || loadingCSV === true}
            />
          </div>

          {isPDFDownloaded === false &&
            <FlashMessage duration={5000}>
              <p className="flashBag invalid">
                Vos statistiques n&rsquo;ont pas pu &ecirc;tre t&eacute;l&eacute;charg&eacute;es, veuillez r&eacute;essayer !
              </p>
            </FlashMessage>
          }
          {errorPDF &&
            <FlashMessage duration={5000}>
              <p className="flashBag invalid">
                {errorPDF}
              </p>
            </FlashMessage>
          }
          {errorCSV &&
            <FlashMessage duration={5000}>
              <p className="flashBag invalid">
                {errorCSV}
              </p>
            </FlashMessage>
          }
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
