import React from 'react';
import PropTypes from 'prop-types';

import StatisticsAccompaniment from './StatisticsAccompaniment';
import StatisticsWorkshop from './StatisticsWorkshop';
import StatisticsPersonalAccompaniment from './StatisticsPersonalAccompaniment';
import StatisticsRenewal from './StatisticsRenewal';
import StatisticsTotalAccompaniments from './StatisticsTotalAccompaniments';

function LeftPage({ donneesStats, type }) {

  const nbTotalAccompagnements = donneesStats?.nbTotalParticipant + donneesStats?.nbAccompagnementPerso + donneesStats?.nbDemandePonctuel;
  const nbTotalSansRecurrence = nbTotalAccompagnements - donneesStats?.nbParticipantsRecurrents;

  return (
    <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
      <StatisticsTotalAccompaniments
        nbTotalAccompagnements={nbTotalSansRecurrence} type={type}
      />
      <div className={type ? 'rf-mb-3w' : 'rf-m-7w rf-mb-5w rf-m-xs-to-md-7v' }></div>
      <hr/>
      <div className={type ? 'rf-mb-2w' : 'rf-m-5w rf-m-xs-to-md-7v' }></div>
      <StatisticsAccompaniment nbAccompagnement={nbTotalAccompagnements} type={type}/>
      <br/>
      <StatisticsWorkshop nbAteliers={donneesStats?.nbAteliers} nbTotalParticipant={donneesStats?.nbTotalParticipant} type={type}/>
      <div className={type ? 'rf-mb-5v' : 'rf-m-5w rf-m-xs-to-md-7v' }></div>
      <hr/>
      <div className={type ? 'rf-mb-2w' : 'rf-m-5w rf-m-xs-to-md-7v' }></div>
      <StatisticsPersonalAccompaniment
        nbAccompagnementPerso={donneesStats?.nbAccompagnementPerso}
        nbDemandePonctuel={donneesStats?.nbDemandePonctuel}
        type={type}
      />
      <div className={type ? 'rf-mb-5v' : 'rf-m-5w rf-m-xs-to-md-7v' }></div>
      <hr/>
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <StatisticsRenewal
        nbUsagersBeneficiantSuivi={donneesStats?.nbUsagersBeneficiantSuivi}
        tauxTotalUsagersAccompagnes={donneesStats?.tauxTotalUsagersAccompagnes}
        nbUsagersAccompagnementIndividuel={donneesStats?.nbUsagersAccompagnementIndividuel}
        nbUsagersAtelierCollectif={donneesStats?.nbUsagersAtelierCollectif}
        nbReconduction={donneesStats?.nbReconduction}
        caracteresSpeciaux="%"
      />
      <div className="rf-m-xs-to-md-7v"></div>
      <hr className="hr-md-hide no-print" />
      <div className="rf-m-xs-to-md-7v"></div>
    </div>
  );
}

LeftPage.propTypes = {
  donneesStats: PropTypes.object,
  type: PropTypes.string,
};

export default LeftPage;
