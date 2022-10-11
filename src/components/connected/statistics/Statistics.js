import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginationActions, statistiqueActions } from '../../../actions';
import StatisticsPeriod from './StatisticsPeriod';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';
import Spinner from 'react-loader-spinner';
import StatisticsBanner from './StatisticsBanner';
import FlashMessage from 'react-flash-message';
import { useLocation } from 'react-router';
import ElementCodePostal from './Components/ElementCodePostal';

function Statistics() {
  const dispatch = useDispatch();
  const location = useLocation();

  const statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const errorPDF = useSelector(state => state.conseiller?.errorPDF);
  const isPDFDownloaded = useSelector(state => state.conseiller?.statistiquesPDF);
  const statsDataError = useSelector(state => state.statistique?.statsDataError);
  const dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  const dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  const codePostalStats = useSelector(state => state.statistique?.codePostalStats);
  const donneesStatistiques = useSelector(state => state.statistique?.statsData);
  const user = useSelector(state => state?.authentication?.user?.user);

  const territoire = location?.territoire;
  const typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : '';
  useEffect(() => {
    console.log('location?.idUser:', location?.idUser);
    if (location?.idUser) {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, location?.idUser));
    } else if (territoire) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, territoire.conseillerIds));
    } else {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, null, codePostalStats));
    }
    dispatch(paginationActions.resetPage(false));
  }, [dateDebutStats, dateFinStats, location, codePostalStats]);

  return (
    <div className="statistics">
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
      <StatisticsBanner dateDebut={dateDebutStats} dateFin={dateFinStats} idTerritoire={territoire?.[typeTerritoire]} codePostal={codePostalStats} idUser={location?.idUser} />
      <div className="fr-m-5w fr-m-md-9w fr-m-lg-15w"></div>
      <Footer type="support" role={user.role} />
    </div>
  );
}

export default Statistics;
