import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { conseillerActions, statistiqueActions } from '../../actions';
import PropTypes from 'prop-types';
import FlashMessage from 'react-flash-message';

function AdminHeader({ role, linkAccount }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const lienLaBase = `${process.env.REACT_APP_LABASE_URL}?email=${linkAccount}`;
  let statsTerritoiresError = useSelector(state => state.statistique.statsTerritoiresError);
  const statistiques = useSelector(state => state.statistique.statsAdmin);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);

  useEffect(() => {
    if (!statistiques && role === 'admin_coop') {
      dispatch(statistiqueActions.getStatsAdmin());
    }
  });

  const exportDonneesCnfsWithoutCRA = () => {
    dispatch(conseillerActions.exportDonneesCnfsWithoutCRA());
  };

  return (
    <>
      <div className="fr-container">
        {errorCSV &&
          <FlashMessage duration={5000}>
            <p className="flashBag invalid">Aucun conseillers n&rsquo;est actuellement à M+2</p>
          </FlashMessage>
        }
        <div className="fr-grid-row fr-grid-row--right">
          <div className={`fr-col-lg-4 fr-col-12 ${role !== 'admin_coop' ? 'fr-mt-5w fr-mb-6w' : 'fr-mt-3w'}`}>
            <a className="statistiques_nationales-btn" href="statistiques-nationales">Statistiques Nationales</a>
            { role === 'structure_coop' &&
              <a className="mes_statistiques-btn fr-ml-4w" href="mes-statistiques">Mes statistiques</a>
            }
            { role === 'admin_coop' &&
              <button className="export_cnfs_without_cra-btn fr-ml-2w" onClick={exportDonneesCnfsWithoutCRA}>Export CnFS 0 CRA M+2</button>
            }
          </div>
          <div
            className={`'fr-col-xs-12 fr-mt-7w fr-col-md-8 ${role !== 'admin_coop' ? 'fr-mt-5w fr-mb-6w' : 'fr-mt-md-4w'}`}
            style={{ textAlign: 'right' }}>
            {(location.pathname === '/territoires') &&
            <a className="header-btn" href="accueil">
              <span className="conseillers-logo-btn"></span>
              <span className="conseillers-texte-btn">Liste des conseillers</span>
            </a>
            }

            {location.pathname !== '/territoires' &&
            <a className="header-btn" href="territoires">
              <span className="stats-logo-btn"></span>
              <span className="stats-texte-btn">Statistiques par territoire</span>
            </a>
            }
            <div className="block-lien-externe">
              <a className="header-btn" href={lienLaBase} target="blank" rel="noreferrer">
                <span className="ressourcerie-logo-btn"></span>
                <span className="ressourcerie-texte-btn">Ressourcerie</span>
              </a>
              { role === 'admin_coop' &&
            <a className="header-btn" href={lienMattermost}>
              <span className="discussion-logo-btn"></span>
              <span className="discussion-texte-btn">Espace de discussion</span>
            </a>
              }
            </div>
          </div>
        </div>
      </div>
      { role === 'admin_coop' &&
        <div className="band-stats-header fr-mt-5w fr-mb-6w">
          <div className="fr-container ">
            <div className="fr-grid-row fr-grid-row--top">
              {!statsTerritoiresError &&
              <>
                <ul className="dashboard">
                  <li>
                    <span className="nombre-stats-header">{statistiques?.invitationsEnvoyees ?? 0}</span><br/>
                    <span className="texte-stats-header">Invitations envoy&eacute;es</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">{statistiques?.conseillersEnregistres ?? 0}</span><br/>
                    <span className="texte-stats-header">Conseillers enregistr&eacute;s</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">{statistiques?.tauxActivationComptes ?? 0} %</span><br/>
                    <span className="texte-stats-header">Taux de comptes activ&eacute;s</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">{statistiques?.nbCras ?? 0}</span><br/>
                    <span className="texte-stats-header">CRA saisis</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">{statistiques?.totalAccompagnements ?? 0}</span><br/>
                    <span className="texte-stats-header">Personnes accompagn&eacute;es</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">?</span><br/>
                    <span className="texte-stats-header">Comptes Pix activ&eacute;s</span>
                  </li>
                  <li>
                    <span className="nombre-stats-header">?</span><br/>
                    <span className="texte-stats-header">Comptes RDV solidarit&eacute;s</span>
                  </li>
                </ul>
              </>
              }
              {statsTerritoiresError &&
              <>
                <div className="fr-col-12" style={{ textAlign: 'center' }}><h3>Les statistiques sont indisponibles pour le moment...</h3></div>
              </>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

AdminHeader.propTypes = {
  role: PropTypes.string,
  linkAccount: PropTypes.string
};
export default AdminHeader;
