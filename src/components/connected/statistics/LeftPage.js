import React from 'react';
import PropTypes from 'prop-types';

import StatisticsAccompaniment from './StatisticsAccompaniment';
import StatisticsWorkshop from './StatisticsWorkshop';
import StatisticsPersonalAccompaniment from './StatisticsPersonalAccompaniment';
import StatisticsRenewal from './StatisticsRenewal';

function LeftPage(props) {

  const periode = props.dataStats.periodes[0];
  return (
    <>
      <StatisticsAccompaniment nbAccompagnement={periode.nbAccompagnement} />
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <StatisticsWorkshop nbAteliers={periode.nbAteliers} nbTotalParticipant={periode.nbTotalParticipant}/>
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <StatisticsPersonalAccompaniment nbAccompagnementPerso={periode.nbAccompagnementPerso} nbDemandePonctuel={periode.nbDemandePonctuel} />
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <hr/>
      <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
      <StatisticsRenewal
        nbUsagersBeneficiantSuivi={periode.nbUsagersBeneficiantSuivi}
        tauxTotalUsagersAccompagnes={periode.tauxTotalUsagersAccompagnes}
        nbUsagersAccompagnementIndividuel={periode.nbUsagersAccompagnementIndividuel}
        nbUsagersAtelierCollectif={periode.nbUsagersAtelierCollectif}
        nbReconduction={periode.nbReconduction}
        caracteresSpeciaux="%" />
      <div className="rf-m-xs-to-md-7v"></div>
      <hr className="hr-md-hide" />
      <div className="rf-m-xs-to-md-7v"></div>
    </>
  );
}

LeftPage.propTypes = {
  dataStats: PropTypes.object,
};

export default LeftPage;
