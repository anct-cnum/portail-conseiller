import React from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

function CoordinateurHeader({ role }) {
  const location = useLocation();
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const tabUrl = ['/territoires', '/ressourcerie', '/mes-lieux-activite'];
  const tabLieu = ['/mes-lieux-activite'];

  return (
    <>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--right">
          <div className="rf-col-12" style={{ textAlign: 'right' }}>
            <a className="statistiques_nationales-btn" href="statistiques-nationales" >
                Statistiques Nationales
            </a>
          </div>
          <div
            className={`'rf-col-xs-12 rf-mt-7w rf-col-md-12 ${role !== 'admin_coop' ? 'rf-mt-5w rf-mb-6w' : 'rf-mt-md-1w'}`}
            style={{ textAlign: 'right' }}>
            {tabUrl.includes(location.pathname) &&
            <a className="header-btn rf-mr-1w" href="/accueil">
              <span className="conseillers-logo-btn"></span>
              <span className="conseillers-texte-btn">Liste des conseillers</span>
            </a>
            }
            {location.pathname !== '/territoires' &&
            <a className="header-btn rf-mr-1w" href="/territoires">
              <span className="stats-logo-btn"></span>
              <span className="stats-texte-btn">Statistiques par territoire</span>
            </a>
            }
            {location.pathname !== '/ressourcerie' &&
            <a className="header-btn rf-mr-1w" href="/ressourcerie">
              <span className="ressourcerie-logo-btn"></span>
              <span className="ressourcerie-texte-btn">Ressourcerie</span>
            </a>
            }
            {!tabLieu.includes(location.pathname) &&
            <a className="header-btn rf-mr-1w" href="/mes-lieux-activite">
              <span className="lieu-logo-btn"></span>
              <span className="lieu-texte-btn">Lieu d&rsquo;activit&eacute;</span>
            </a>
            }
            <a className="header-btn" href={lienMattermost}>
              <span className="discussion-logo-btn"></span>
              <span className="discussion-texte-btn">Espace de discussion</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

CoordinateurHeader.propTypes = {
  role: PropTypes.string
};
export default CoordinateurHeader;
