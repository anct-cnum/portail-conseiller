import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { statistiqueActions } from '../../actions';

function AdminHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const statistiques = useSelector(state => state.statistique.statsAdmin);

  useEffect(() => {
    if (!statistiques) {
      dispatch(statistiqueActions.getStatsAdmin());
    }
  });

  return (
    <>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--top">
          {location.pathname === '/territoires' &&
          <>
            <div className="rf-col-4 rf-mt-3w">
              <a className="admin-dark-btn" href="accueil">
                Voir les statistiques nationales
              </a>
            </div>
            <div className="rf-col-4 rf-mt-3w">
              <a className="admin-btn accueil-btn" href="accueil">
                <span className="conseillers-logo-btn"></span>
                <span className="conseillers-texte-btn">Afficher la liste des conseillers</span>
              </a>
            </div>
          </>
          }
          {location.pathname === '/accueil' &&
            <div className="rf-col-offset-4 rf-col-4 rf-mt-3w">
              <a className="admin-btn stats-territoires-btn" href="territoires">
                <span className="stats-logo-btn"></span>
                <span className="stats-texte-btn">Afficher les statistiques par territoires</span>
              </a>
            </div>
          }

          <div className="rf-col-4 rf-mt-3w">
            <a className="admin-btn discussion-btn">
              <span className="discussion-logo-btn"></span>
              <span className="discussion-texte-btn">Accéder à l’espace de discussion</span>
            </a>
          </div>
        </div>
      </div>
      <div className="band-stats-header rf-mt-3w rf-mb-6w">
        <div className="rf-container ">
          <div className="rf-grid-row rf-grid-row--top">
            <div className="rf-col-2 nombre-stats-header">{statistiques?.invitationsEnvoyees}</div>
            <div className="rf-col-2 nombre-stats-header">{statistiques?.conseillersEnregistres}</div>
            <div className="rf-col-2 nombre-stats-header">{statistiques?.tauxActivationComptes} %</div>
            <div className="rf-col-2 nombre-stats-header">{statistiques?.totalAccompagnements}</div>
            <div className="rf-col-2 nombre-stats-header">?</div>
            <div className="rf-col-2 nombre-stats-header">?</div>

            <div className="rf-col-2 texte-stats-header">Invitations envoyées</div>
            <div className="rf-col-2 texte-stats-header">Conseillers enregistrés</div>
            <div className="rf-col-2 texte-stats-header">Taux d’activation des comptes</div>
            <div className="rf-col-2 texte-stats-header">Personnes des accompagnées</div>
            <div className="rf-col-2 texte-stats-header">Activations Pix Orga</div>
            <div className="rf-col-2 texte-stats-header">Activations RDV solidarités</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
