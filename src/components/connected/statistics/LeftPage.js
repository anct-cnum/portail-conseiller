import React from 'react';
import PropTypes from 'prop-types';

import StatisticsAccompaniment from './StatisticsAccompaniment';
import StatisticsWorkshop from './StatisticsWorkshop';
import StatisticsPersonalAccompaniment from './StatisticsPersonalAccompaniment';
import StatisticsRenewal from './StatisticsRenewal';
import StatisticsTotalAccompaniments from './StatisticsTotalAccompaniments';

function LeftPage(props) {

  return (
    <div className="rf-col-12 rf-col-md-5 rf-col-lg-3">
      <StatisticsTotalAccompaniments
        nbTotalAccompagnements={props.donneesStats?.nbTotalParticipant + props.donneesStats?.nbAccompagnementPerso + props.donneesStats?.nbDemandePonctuel}
        nomClasse={'text-territoire'}
      />
      <div className="rf-m-7w rf-mb-5w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <StatisticsAccompaniment nbAccompagnement={props.donneesStats?.nbAccompagnement}/>
      <br/>
      <StatisticsWorkshop nbAteliers={props.donneesStats?.nbAteliers} nbTotalParticipant={props.donneesStats?.nbTotalParticipant}/>
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <StatisticsPersonalAccompaniment
        nbAccompagnementPerso={props.donneesStats?.nbAccompagnementPerso}
        nbDemandePonctuel={props.donneesStats?.nbDemandePonctuel}
      />
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-5w rf-m-xs-to-md-7v"></div>
      <StatisticsRenewal
        nbUsagersBeneficiantSuivi={props.donneesStats?.nbUsagersBeneficiantSuivi}
        tauxTotalUsagersAccompagnes={props.donneesStats?.tauxTotalUsagersAccompagnes}
        nbUsagersAccompagnementIndividuel={props.donneesStats?.nbUsagersAccompagnementIndividuel}
        nbUsagersAtelierCollectif={props.donneesStats?.nbUsagersAtelierCollectif}
        nbReconduction={props.donneesStats?.nbReconduction}
        caracteresSpeciaux="%" />
      <div className="rf-m-xs-to-md-7v"></div>
      <hr className="hr-md-hide no-print" />
      <div className="rf-m-xs-to-md-7v"></div>
    </div>
  );
}

LeftPage.propTypes = {
  donneesStats: PropTypes.object,
};

export default LeftPage;
