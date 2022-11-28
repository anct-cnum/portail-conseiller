import React from 'react';
import PropTypes from 'prop-types';
import StatisticsPeriod from './StatisticsPeriod';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import ElementCodePostal from './Components/ElementCodePostal';

function StatisticsPrint({ user, nomStructure, dateDebutStats, dateFinStats, donneesStatistiques, typeTerritoire }) {

  return (
    <div className="statistics only-print">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-mb-3w">
            <div className="header-print">
              <img src="/logos/statistics/en-tete-export-pdf.jpg" />
              <div className="identifiant fr-my-3w">{user?.prenom} {user?.nom} - {nomStructure}</div>
              <div className="header-titre fr-my-4w">R&eacute;capitulatif de l&rsquo;activit&eacute; d&rsquo;accompagnement</div>
            </div>
            <StatisticsPeriod dateDebut={dateDebutStats} dateFin={dateFinStats} />
            {user?.role.includes('conseiller') &&
              <ElementCodePostal />
            }
          </div>
          { donneesStatistiques !== undefined &&
          <>
            <LeftPage donneesStats={donneesStatistiques} type={typeTerritoire}/>

            <RightPage donneesStats={donneesStatistiques} print={true}/>

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
  user: PropTypes.object,
  nomStructure: PropTypes.string,
  typeTerritoire: PropTypes.string,
  donneesStatistiques: PropTypes.object,
  dateDebutStats: PropTypes.instanceOf(Date),
  dateFinStats: PropTypes.instanceOf(Date),
};

export default StatisticsPrint;
