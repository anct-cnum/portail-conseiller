import React, { useEffect, useState } from 'react';
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

  const type = match.params.type;
  const id = match.params.id;

  const [inputsPDF, setInputsPDF] = useState({
    datePickerDebutPDF: 0,
    datePickerFinPDF: 0
  });

  let dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  let dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  let donneesStatistiques = useSelector(state => state.statistique?.statsData);
  let typeTerritoire = type !== 'user' ? type : '';

  useEffect(() => {
    if (type === 'user') {
      dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats, id));
    } else {
      dispatch(statistiqueActions.getStatsCraTerritoire(dateDebutStats, dateFinStats, typeTerritoire, id));
    }
  }, [dateDebutStats, dateFinStats]);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputsPDF(inputsPDF => ({ ...inputsPDF, [name]: value }));
  };

  const chargeStatsPDF = () => {
    dispatch(statistiqueActions.changeDateStatsDebut(new Date(parseInt(inputsPDF.datePickerDebutPDF))));
    dispatch(statistiqueActions.changeDateStatsFin(new Date(parseInt(inputsPDF.datePickerFinPDF))));
  };

  return (

    <div className="Statistics">
      <Header/>
      { donneesStatistiques !== undefined &&
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <div className="rf-mt-2w rf-mt-md-9w rf-mt-lg-13w"></div>
              <h1 className="title">
                {type !== 'user' &&
                <>
                  Statistiques - {location?.nomTerritoire}
                </>
                }
                {type === 'user' &&
                  <>Statistiques</>
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

          <div className="rf-grid-row">
            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire}/>
            <div className="rf-col-offset-md-1"></div>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <div className="no-print">
              <input type="text" id="datePickerDebutPDF" name="datePickerDebutPDF" onChange={handleChange}/>
              <input type="text" id="datePickerFinPDF" name="datePickerFinPDF" onChange={handleChange} />
              <button id="chargePDF" onClick={chargeStatsPDF}>click</button>
            </div>
          </div>
        </div>
      }
    </div>

  );
}

EnregistrerStatistiquesPdf.propTypes = {
  match: PropTypes.object
};
export default EnregistrerStatistiquesPdf;

