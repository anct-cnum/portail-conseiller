import React from 'react';

import PeriodStatistics from './PeriodStatistics';
import StatisticsAccompaniment from './StatisticsAccompaniment';
import StatisticsWorkshop from './StatisticsWorkshop';
import StatisticsPersonalAccompaniment from './StatisticsPersonalAccompaniment';
import StatisticsRenewal from './StatisticsRenewal';

function LeftPage() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">
          <PeriodStatistics dateDebut="01/04/2021" dateFin="02/05/2021"/>
        </div>
        <div className="rf-col-12">
          <StatisticsAccompaniment nbAccompagnement={78} />
        </div>
        <div className="rf-col-12">
          <StatisticsWorkshop nbAteliers={3} nbTotalParticipant={25}/>
        </div>
        <div className="rf-col-12">
          <StatisticsPersonalAccompaniment nbAccompagnementPerso={19} nbDemandePonctuel={3} />
        </div>
        <div className="rf-col-12">
          <StatisticsRenewal nbReconduction={12} tauxReconduction={18} caracteresSpeciaux="%" />
        </div>
      </div>
    </div>
  );
}

export default LeftPage;
