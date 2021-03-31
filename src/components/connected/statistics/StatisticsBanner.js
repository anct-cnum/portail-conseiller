import React from 'react';

function StatisticsBanner() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--gutters">
        <div className="rf-col-8">
          <table className="table-link">
            <tbody>
              <tr>
                <td><a href=""><span></span>Revenir à l’étape précédente</a></td>
                <td><a href=""><span></span>Annuler la dernière saisie</a></td>
                <td><a href=""><span></span>Exporter au format PDF</a></td>
                <td><a href=""><span></span>Exporter au format CSV</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rf-col-4">
          <a className="rf-btn menu-btn">Voir les statistiques nationales</a>
        </div>

      </div>
    </div>
  );
}

export default StatisticsBanner;
