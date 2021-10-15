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

function StatistiquesNationales() {
  const dispatch = useDispatch();

  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
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
    <div className="Statistics">
      <div className="rf-container">
        <div className="spinnerCustom">
          <Spinner
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={statsDataLoading === true || loadingPDF === true}
          />
        </div>

        {isPDFDownloaded === false &&
          <FlashMessage duration={5000}>
            <p className="flashBag invalid">
              Vos statistiques n&rsquo;ont pas pu être téléchargées, veuillez réessayer !
            </p>
          </FlashMessage>
        }

        <div className="rf-grid-row">
          <div className="rf-col-12">
            <div className="rf-mt-2w rf-mt-md-9w rf-mt-lg-13w"></div>
            { (statsDataError !== undefined && statsDataError !== false) &&
              <p className="rf-label flashBag" style={{ color: 'red' }}>
                {statsDataError?.toString()}
              </p>
            }
            <h1 className="title">
              Statistiques Nationales
            </h1>
            <div className="rf-mb-5w rf-mt-md-4w"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-xs-3 rf-col-sm-7 rf-col-md-6 rf-col-lg-4">
            <div className="rf-mb-4w rf-mb-md-6w">
              <PeriodStatistics dateDebut={dateDebutStats} dateFin={dateFinStats} />
            </div>
          </div>

          <div className="rf-col-md-6 rf-col-lg-8">
            <hr className="hr-sm-hide rf-mt-2w"/>
            <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
          </div>
        </div>

        { donneesStatistiques !== undefined &&
          <div className="rf-grid-row">

            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire}/>

            <div className="rf-col-offset-md-1"></div>

            <RightPage donneesStats={donneesStatistiques} type={typeTerritoire}/>

            <BottomPage donneesStats={donneesStatistiques}/>

          </div>
        }
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
      </div>
      <StatisticsBanner dateDebut={dateDebutStats} dateFin={dateFinStats} type={typeTerritoire}/>
      <div className="rf-m-5w rf-m-md-9w rf-m-lg-15w"></div>
      <Footer type="support"/>
    </div>
  );
}

export default StatistiquesNationales;
