import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import StatisticsPeriod from '../connected/statistics/StatisticsPeriod';
import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import { statistiqueActions } from '../../actions';
import Header from '../Header';

function EnregistrerStatistiquesPdf({ match }) {

  const dispatch = useDispatch();

  const type = match.params?.type;
  const id = match.params?.id;
  const dateDebut = new Date(match.params?.dateDebut);
  const dateFin = new Date(match.params?.dateFin);

  let dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  let dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  let donneesStatistiques = useSelector(state => state.statistique?.statsData);
  let territoire = useSelector(state => state.statistique?.territoire);
  let typeTerritoire = (type !== 'user' && type !== 'conseiller') ? type : '';

  useEffect(() => {
    if ((type !== 'user' && type !== 'conseiller' && type !== 'nationales') && territoire === undefined) {
      dispatch(statistiqueActions.getTerritoire(type, id, dateFin));
    }
  });

  useEffect(() => {
    dispatch(statistiqueActions.changeDateStatsDebut(dateDebut));
    dispatch(statistiqueActions.changeDateStatsFin(dateFin));

    if ((type === 'user' || type === 'conseiller') && type !== 'nationales') {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, id));
    } else if (((type !== 'user' && type !== 'conseiller') && type !== 'nationales') && territoire?.conseillerIds) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, territoire?.conseillerIds));
    } else if (type === 'nationales') {
      dispatch(statistiqueActions.getStatsCraNationale(dateDebutStats, dateFinStats));
    }
  }, [territoire]);

  return (

    <div className="Statistics">
      <Header/>
      <div className="rf-container">

        <div className="rf-grid-row">
          <div className="rf-col-12">
            <div className="rf-mt-2w rf-mt-md-9w rf-mt-lg-13w"></div>
            <h1 className={(type !== 'user' && type !== 'conseiller') ? 'title title-print-territoire' : 'title'}>
              {(type !== 'user' && type !== 'conseiller') &&
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
            </h1>
            <div className="rf-mb-5w rf-mt-md-4w"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-xs-3 rf-col-sm-7 rf-col-md-6 rf-col-lg-4">
            <div className="rf-mb-4w rf-mb-md-6w">
              <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
            </div>
          </div>

          <div className="rf-col-md-6 rf-col-lg-8">
            <hr className="hr-sm-hide"/>
            <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
          </div>
        </div>
        { donneesStatistiques &&
          <div className="rf-grid-row">
            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire} />
            <div className="rf-col-offset-md-1"></div>
            <RightPage donneesStats={donneesStatistiques} type={typeTerritoire}/>
            <BottomPage donneesStats={donneesStatistiques}/>
          </div>
        }
        { !donneesStatistiques &&
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <p>Aucunes statistiques n&rsquo;ont &eacute;t&eacute; trouv&eacute;s pour la p&eacute;riode donn&eacute;e</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

EnregistrerStatistiquesPdf.propTypes = {
  match: PropTypes.object
};
export default EnregistrerStatistiquesPdf;

