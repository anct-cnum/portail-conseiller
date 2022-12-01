import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginationActions, statistiqueActions } from '../../actions';
import StatisticsPeriod from '../connected/statistics/StatisticsPeriod';
import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import Spinner from 'react-loader-spinner';
import StatisticsBanner from '../connected/statistics/StatisticsBanner';
import FlashMessage from 'react-flash-message';
import { useLocation } from 'react-router';
import ElementCodePostal from '../connected/statistics/Components/ElementCodePostal';
import { structureActions } from '../../actions/structure.actions';
import { userEntityId } from '../../helpers';

function StatistiquesStructure() {
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
  const structure = useSelector(state => state.structure?.structure);
  const territoire = location?.territoire;
  const typeTerritoire = territoire ? useSelector(state => state.filtersAndSorts?.territoire) : '';

  useEffect(() => {
    dispatch(structureActions.get(userEntityId()));
  }, []);

  useEffect(() => {
    if (structure !== undefined) {
      dispatch(statistiqueActions.getStatsCraStructure(dateDebutStats, dateFinStats, structure?._id, codePostalStats));
      dispatch(paginationActions.resetPage(false));
    }
  }, [dateDebutStats, dateFinStats, location, codePostalStats, structure]);

  return (
    <div className="statistics">
      <div className="fr-container">
        <div className="spinnerCustom">
          <Spinner
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={statsDataLoading === true || loadingPDF === true || structure === undefined || loadingCSV === true}
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
            {(statsDataError !== undefined && statsDataError !== false) &&
              <p className="fr-label flashBag" style={{ color: 'red' }}>
                {statsDataError?.toString()}
              </p>
            }
            <h1 className="title">
              {territoire &&
                <>
                  Statistiques - {territoire?.nomDepartement ?? territoire?.nomRegion}
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
              {structure !== undefined &&
                <ElementCodePostal idStructure={structure?._id} />
              }
            </div>
          </div>

          <div className="fr-col-md-6 fr-col-lg-8">
            <hr className="hr-sm-hide fr-mt-2w" />
            <div className="fr-m-6w fr-m-xs-to-md-7v"></div>
          </div>
        </div>

        {donneesStatistiques !== undefined &&
          <div className="fr-grid-row">

            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire} print={false} />

            <div className="fr-col-offset-md-1"></div>

            <RightPage donneesStats={donneesStatistiques} print={false} />

            <BottomPage donneesStats={donneesStatistiques} print={false} />

          </div>
        }
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
      </div>
      <StatisticsBanner
        dateDebut={dateDebutStats}
        dateFin={dateFinStats}
        idTerritoire={territoire?.[typeTerritoire]}
        codePostal={codePostalStats}
        typeStats={'structure'}
      />
      <div className="fr-m-5w fr-m-md-9w fr-m-lg-15w"></div>
    </div>
  );
}

export default StatistiquesStructure;
