import React from 'react';
import PropTypes from 'prop-types';

import PeriodStatistics from './PeriodStatistics';
import StatisticsAccompaniment from './StatisticsAccompaniment';
import StatisticsWorkshop from './StatisticsWorkshop';
import StatisticsPersonalAccompaniment from './StatisticsPersonalAccompaniment';
import StatisticsRenewal from './StatisticsRenewal';

function LeftPage(props) {

  const periodeTest = props.dataStats.periodes[0];
  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">
          <PeriodStatistics dateDebut={periodeTest.dateDebut} dateFin={periodeTest.dateFin} />
        </div>
        <div className="rf-col-12">
          <div className="rf-m-6w"></div>
          <StatisticsAccompaniment nbAccompagnement={periodeTest.nbAccompagnement} />
          <div className="rf-m-6w"></div>
          <hr className="bar"/>
          <div className="rf-m-6w"></div>
        </div>
        <div className="rf-col-12">
          <StatisticsWorkshop nbAteliers={periodeTest.nbAteliers} nbTotalParticipant={periodeTest.nbTotalParticipant}/>
          <div className="rf-m-6w"></div>
          <hr className="bar"/>
          <div className="rf-m-6w"></div>
        </div>
        <div className="rf-col-12">
          <StatisticsPersonalAccompaniment nbAccompagnementPerso={periodeTest.nbAccompagnementPerso} nbDemandePonctuel={periodeTest.nbDemandePonctuel} />
          <div className="rf-m-6w"></div>
          <hr className="bar"/>
          <div className="rf-m-6w"></div>
        </div>
        <div className="rf-col-12">
          <StatisticsRenewal nbReconduction={periodeTest.nbReconduction} tauxReconduction={periodeTest.tauxReconduction} caracteresSpeciaux="%" />
        </div>
      </div>
    </div>
  );
}

LeftPage.propTypes = {
  dataStats: PropTypes.object,
};

export default LeftPage;
