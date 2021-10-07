import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { statistiqueActions } from '../../actions';

function AdminHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  let statsTerritoiresError = useSelector(state => state.statistique.statsTerritoiresError);
  const statistiques = useSelector(state => state.statistique.statsAdmin);

  useEffect(() => {
    if (!statistiques) {
      dispatch(statistiqueActions.getStatsAdmin());
    }
  });

  return (
    <>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--right">
          <div className={location.pathname !== '/ressourcerie' ? 'rf-col-offset-4 rf-col-8' : 'rf-col-offset-4 rf-col-9'} style={
            location.pathname !== '/ressourcerie' ? { textAlign: 'right' } : {}}>
            {(location.pathname === '/territoires' || location.pathname === '/ressourcerie') &&
            <a className="header-btn" href="accueil">
              <span className="conseillers-logo-btn"></span>
              <span className="conseillers-texte-btn">Liste des conseillers</span>
            </a>
            }
            {(location.pathname === '/accueil' || location.pathname === '/ressourcerie') &&
            <a className="header-btn" href="territoires">
              <span className="stats-logo-btn"></span>
              <span className="stats-texte-btn">Statistiques par territoire</span>
            </a>
            }
            {location.pathname !== '/ressourcerie' &&
            <a className="header-btn" href="ressourcerie">
              <span className="ressourcerie-logo-btn"></span>
              <span className="ressourcerie-texte-btn">Ressourcerie</span>
            </a>
            }
            <a className="header-btn" href={lienMattermost}>
              <span className="discussion-logo-btn"></span>
              <span className="discussion-texte-btn">Espace de discussion</span>
            </a>
          </div>
        </div>
      </div>
      <div className="band-stats-header rf-mt-5w rf-mb-6w">
        <div className="rf-container ">
          <div className="rf-grid-row rf-grid-row--top">
            {!statsTerritoiresError &&
            <>
              <ul className="dashboard">
                <li>
                  <span className="nombre-stats-header">{statistiques?.invitationsEnvoyees ?? 0}</span><br/>
                  <span className="texte-stats-header">Invitations envoyées</span>
                </li>
                <li>
                  <span className="nombre-stats-header">{statistiques?.conseillersEnregistres ?? 0}</span><br/>
                  <span className="texte-stats-header">Conseillers enregistrés</span>
                </li>
                <li>
                  <span className="nombre-stats-header">{statistiques?.tauxActivationComptes ?? 0} %</span><br/>
                  <span className="texte-stats-header">Taux de comptes activés</span>
                </li>
                <li>
                  <span className="nombre-stats-header">{statistiques?.nbCras ?? 0}</span><br/>
                  <span className="texte-stats-header">CRA saisis</span>
                </li>
                <li>
                  <span className="nombre-stats-header">{statistiques?.totalAccompagnements ?? 0}</span><br/>
                  <span className="texte-stats-header">Personnes accompagnées</span>
                </li>
                <li>
                  <span className="nombre-stats-header">?</span><br/>
                  <span className="texte-stats-header">Comptes Pix activés</span>
                </li>
                <li>
                  <span className="nombre-stats-header">?</span><br/>
                  <span className="texte-stats-header">Comptes RDV solidarités</span>
                </li>
              </ul>


            </>
            }
            {statsTerritoiresError &&
            <>
              <div className="rf-col-12" style={{ textAlign: 'center' }}><h3>Les statistiques sont indisponibles pour le moment...</h3></div>
            </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
