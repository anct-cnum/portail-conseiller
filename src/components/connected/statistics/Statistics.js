import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { statistiqueActions } from '../../../actions';
import PeriodStatistics from './StatisticsPeriod';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';
import Spinner from 'react-loader-spinner';
import StatisticsBanner from './StatisticsBanner';
import FlashMessage from 'react-flash-message';
import { useLocation } from 'react-router';

function Statistics() {
  const dispatch = useDispatch();
  const location = useLocation();

  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const isPDFDownloaded = useSelector(state => state.conseiller?.statistiquesPDF);
  let statsDataError = useSelector(state => state.statistique?.statsDataError);
  let dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  let dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  let donneesStatistiques = useSelector(state => state.statistique?.statsData);
  let typeTerritoire = useSelector(state => state.filtersAndSorts?.territoire);

  useEffect(() => {
    if (location?.idUser) {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, location?.idUser));
    } else if (location?.conseillerIds) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, location?.conseillerIds));
    }
  }, [dateDebutStats, dateFinStats, location]);

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
            <h1 className="title">Mes Statistiques{location?.nomTerritoire ? ' - ' + location?.nomTerritoire : '' }</h1>
            <div className="rf-mb-5w rf-mt-md-4w"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-xs-3 rf-col-sm-7 rf-col-md-6 rf-col-lg-4">
            <div className="rf-mb-4w rf-mb-md-6w">
              <PeriodStatistics dateDebut={dateDebutStats} dateFin={dateFinStats} />
              <i className="ri-arrow-down-s-line ri-2x chevron"></i>
            </div>
          </div>

          <div className="rf-col-md-6 rf-col-lg-8">
            <hr className="hr-sm-hide"/>
            <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
          </div>
        </div>

        { donneesStatistiques !== undefined &&
          <div className="rf-grid-row">

            <LeftPage donneesStats={donneesStatistiques}/>

            <div className="rf-col-offset-md-1"></div>

            <RightPage donneesStats={donneesStatistiques}/>

            <BottomPage donneesStats={donneesStatistiques}/>

          </div>
        }
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
      </div>
      <StatisticsBanner dateDebut={dateDebutStats} dateFin={dateFinStats}/>
      <div className="rf-m-5w rf-m-md-9w rf-m-lg-15w"></div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </div>
  );
}

export default Statistics;
