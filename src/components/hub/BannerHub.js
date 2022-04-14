import React from 'react';
import { useLocation } from 'react-router';

function BannerHub() {
  const location = useLocation();
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--right">
        <div className="rf-col-xs-12 rf-col-md-4 'rf-mt-5w rf-mb-6w">
          <a className="statistiques_nationales-btn" href="statistiques-nationales">Statistiques Nationales</a>
        </div>
        <div
          className="rf-col-xs-12 rf-mt-7w rf-col-md-8 'rf-mt-5w rf-mb-6w"
          style={{ textAlign: 'right' }}>
          {location.pathname !== '/territoires' &&
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
  );
}

export default BannerHub;
