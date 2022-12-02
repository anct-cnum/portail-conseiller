import React from 'react';
import PropTypes from 'prop-types';

import LeftPage from '../connected/statistics/LeftPage';
import RightPage from '../connected/statistics/RightPage';
import BottomPage from '../connected/statistics/BottomPage';
import StatisticsPeriod from '../connected/statistics/StatisticsPeriod';

function StatisticsPrint({ dateDebutStats, dateFinStats, donneesStatistiques, typeTerritoire }) {

  return (
    <div className="statistics only-print">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="header-print fr-mb-8v">
              <img src="/logos/statistics/en-tete-export-pdf.jpg" />
              <div className="identifiant fr-my-3w">Statistiques {typeTerritoire}</div>
              <div className="header-titre fr-my-4w">R&eacute;capitulatif de l&rsquo;activit&eacute; d&rsquo;accompagnement</div>
            </div>
            <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
            <div className="nationale-print" ></div>
          </div>
          { donneesStatistiques !== undefined &&
          <>
            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire}/>
            <RightPage donneesStats={donneesStatistiques} print={true} />
            <BottomPage donneesStats={donneesStatistiques} print={true}/>
          </>
          }
        </div>
      </div>
      {!donneesStatistiques &&
        <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
      }
    </div>
  );
}

StatisticsPrint.propTypes = {
  typeTerritoire: PropTypes.string,
  donneesStatistiques: PropTypes.object,
  dateDebutStats: PropTypes.instanceOf(Date),
  dateFinStats: PropTypes.instanceOf(Date),
};

export default StatisticsPrint;
