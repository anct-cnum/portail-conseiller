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
    <div className="fr-col-12 fr-col-md-5 fr-col-lg-3">
      <StatisticsTotalAccompaniments
        nbTotalAccompagnements={nbTotalSansRecurrence} type={type}
      />
      <div className={type ? 'fr-mb-3w' : 'fr-m-7w fr-mb-5w fr-m-xs-to-md-7v' }></div>
      <hr className="hr-print"/>
      <div className={type ? 'fr-mb-2w' : 'fr-m-5w fr-m-xs-to-md-7v' }></div>
      <StatisticsAccompaniment nbAccompagnement={nbTotalAccompagnements} type={type}/>
      <br/>
      <StatisticsWorkshop nbAteliers={donneesStats?.nbAteliers} nbTotalParticipant={donneesStats?.nbTotalParticipant} type={type}/>
      <div className={type ? 'fr-mb-5v' : 'fr-m-5w fr-m-xs-to-md-7v' }></div>
      <hr className="hr-print"/>
      <div className={type ? 'fr-mb-2w' : 'fr-m-5w fr-m-xs-to-md-7v' }></div>
      <StatisticsPersonalAccompaniment
        nbAccompagnementPerso={donneesStats?.nbAccompagnementPerso}
        nbDemandePonctuel={donneesStats?.nbDemandePonctuel}
        type={type}
      />
      <div className={type ? 'fr-mb-5v' : 'fr-m-5w fr-m-xs-to-md-7v' }></div>
      <hr/>
      <div className="fr-m-5w fr-m-xs-to-md-7v"></div>
      <StatisticsRenewal
        nbUsagersBeneficiantSuivi={donneesStats?.nbUsagersBeneficiantSuivi}
        tauxTotalUsagersAccompagnes={donneesStats?.tauxTotalUsagersAccompagnes}
        nbUsagersAccompagnementIndividuel={donneesStats?.nbUsagersAccompagnementIndividuel}
        nbUsagersAtelierCollectif={donneesStats?.nbUsagersAtelierCollectif}
        nbReconduction={donneesStats?.nbReconduction}
        caracteresSpeciaux="%"
      />
      <div className="fr-m-xs-to-md-7v"></div>
      <hr className="hr-md-hide dont-print" />
      <div className="fr-m-xs-to-md-7v"></div>
    </div>

  );
}

LeftPage.propTypes = {
  donneesStats: PropTypes.object,
  type: PropTypes.string,
};

export default LeftPage;
