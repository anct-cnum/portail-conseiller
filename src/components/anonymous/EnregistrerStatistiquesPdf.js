import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticsPeriod from '../connected/statistics/StatisticsPeriod';
import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import { statistiqueActions } from '../../actions';
import Header from '../Header';
import { useParams } from 'react-router-dom';

function EnregistrerStatistiquesPdf() {

  const dispatch = useDispatch();
  const { type, id, dateDebut, dateFin, codePostal, ville } = useParams();
  const dateDebutFormat = new Date(dateDebut);
  const dateFinFormat = new Date(dateFin);

  const dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  const dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  const codePostalStats = useSelector(state => state.statistique?.codePostalStats);
  const villeStats = useSelector(state => state.statistique?.villeStats);
  const donneesStatistiques = useSelector(state => state.statistique?.statsData);
  const territoire = useSelector(state => state.statistique?.territoire);
  const typeTerritoire = (type !== 'user' && type !== 'conseiller' && type !== 'structure') ? type : '';

  useEffect(() => {
    if ((type !== 'user' && type !== 'conseiller' && type !== 'nationales' && type !== 'structure') && territoire === undefined) {
      dispatch(statistiqueActions.getTerritoire(type, id, dateFinFormat));
    }
  });

  useEffect(() => {
    dispatch(statistiqueActions.changeDateStatsDebut(dateDebutFormat));
    dispatch(statistiqueActions.changeDateStatsFin(dateFinFormat));
    dispatch(statistiqueActions.changeCodePostalStats(codePostal, ville));
    if ((type === 'user' || type === 'conseiller') && type !== 'nationales') {
      dispatch(statistiqueActions.getStatsCra(dateDebutFormat, dateFinFormat, id, codePostal, ville));
    } else if (((type !== 'user' && type !== 'conseiller') && type !== 'nationales') && territoire?.conseillerIds) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutFormat, dateFinFormat, typeTerritoire, territoire?.conseillerIds));
    } else if (type === 'nationales') {
      dispatch(statistiqueActions.getStatsCraNationale(dateDebutFormat, dateFinFormat));
    } else if (type === 'structure') {
      dispatch(statistiqueActions.getStatsCraStructure(dateDebutFormat, dateFinFormat, id, codePostal));
    }
  }, [territoire, codePostalStats, villeStats]);

  return (

    <div className="statistics print">
      <Header printClass="print"/>
      <div className="fr-container">

        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-mt-2w fr-mt-md-9w fr-mt-lg-13w"></div>
            <h1 className={(type !== 'user' && type !== 'conseiller') ? 'title title-print-territoire' : 'title'}>
              {(type !== 'user' && type !== 'conseiller' && type !== 'structure') &&
              <>
                Statistiques - { territoire?.nomDepartement ?? territoire?.nomRegion }
              </>
              }
              {type === 'nationales' &&
                <>Nationales</>
              }
              {type === 'user' &&
                <>Statistiques</>
              }
              {type === 'conseiller' &&
                <>Mes Statistiques</>
              }
              {type === 'structure' &&
                <>Statistiques structure</>
              }
            </h1>
            <div className="fr-mb-5w fr-mt-md-4w"></div>
          </div>
        </div>

        <div className="fr-grid-row">
          <div className="fr-col-xs-3 fr-col-sm-7 fr-col-md-6 fr-col-lg-4">
            <div className="fr-mb-4w fr-mb-md-6w">
              <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
              {(type === 'conseiller' || type === 'structure') &&
                <select className="fr-select code-postal-select fr-my-2w">
                  <option value="">
                    {codePostal !== 'null' ? codePostal : 'Tous codes postaux' }
                    &nbsp;{ville !== 'null' && ville !== undefined ? ' - ' + ville : ''}
                  </option>
                </select>
              }
            </div>
          </div>

          <div className="fr-col-md-6 fr-col-lg-8">
            <hr className="hr-sm-hide"/>
            <div className="fr-m-6w fr-m-xs-to-md-7v"></div>
          </div>
        </div>
        { donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire} />
            <div className="fr-col-offset-md-1"></div>
            <RightPage donneesStats={donneesStatistiques} print={true} type={type}/>
            <BottomPage donneesStats={donneesStatistiques} print={true} type={type}/>
          </div>
        }
        { !donneesStatistiques &&
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <p>Aucunes statistiques n&rsquo;ont &eacute;t&eacute; trouv&eacute;s pour la p&eacute;riode donn&eacute;e</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default EnregistrerStatistiquesPdf;

