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
  const codePostal = match.params?.codePostal;

  const dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  const dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  const codePostalStats = useSelector(state => state.statistique?.codePostalStats);
  const donneesStatistiques = useSelector(state => state.statistique?.statsData);
  const territoire = useSelector(state => state.statistique?.territoire);
  const typeTerritoire = (type !== 'user' && type !== 'conseiller' && type !== 'structure') ? type : '';

  useEffect(() => {
    if ((type !== 'user' && type !== 'conseiller' && type !== 'nationales' && type !== 'structure') && territoire === undefined) {
      dispatch(statistiqueActions.getTerritoire(type, id, dateFin));
    }
  });

  useEffect(() => {
    dispatch(statistiqueActions.changeDateStatsDebut(dateDebut));
    dispatch(statistiqueActions.changeDateStatsFin(dateFin));
    dispatch(statistiqueActions.changeCodePostalStats(codePostal));
    if ((type === 'user' || type === 'conseiller') && type !== 'nationales') {
      dispatch(statistiqueActions.getStatsCra(dateDebut, dateFin, id, codePostal));
    } else if (((type !== 'user' && type !== 'conseiller') && type !== 'nationales') && territoire?.conseillerIds) {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebut, dateFin, typeTerritoire, territoire?.conseillerIds));
    } else if (type === 'nationales') {
      dispatch(statistiqueActions.getStatsCraNationale(dateDebut, dateFin));
    } else if (type === 'structure') {
      dispatch(statistiqueActions.getStatsCraStructure(dateDebut, dateFin, id, codePostal));
    }
  }, [territoire, codePostalStats]);

  return (

    <div className="statistics print">
      <Header printClass="print"/>
      <div className="rf-container">

        <div className="rf-grid-row">
          <div className="rf-col-12">
            <div className="rf-mt-2w rf-mt-md-9w rf-mt-lg-13w"></div>
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
            <div className="rf-mb-5w rf-mt-md-4w"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-xs-3 rf-col-sm-7 rf-col-md-6 rf-col-lg-4">
            <div className="rf-mb-4w rf-mb-md-6w">
              <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
              {(type === 'conseiller' || type === 'structure') &&
                <select className="rf-select code-postal-select rf-my-2w">
                  <option value="">{codePostal !== 'null' ? codePostal : 'Tous codes postaux' }</option>
                </select>
              }
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
            <RightPage donneesStats={donneesStatistiques} print={true} type={type}/>
            <BottomPage donneesStats={donneesStatistiques} print={true} type={type}/>
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

