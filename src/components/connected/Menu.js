import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {

  return (
    <>
      <div className="Menu">
        <div className="rf-grid-row rf-grid-row--center">
          <nav className="rf-nav" id="navigation" role="navigation" aria-label="Menu principal" style={{ boxShadow: 'none' }}>
            <ul className="rf-nav__list" style={{ paddingBottom: '15px' }}>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/accueil' ? 'linkActive' : ''}`}
                  to="/accueil">
                    Accueil
                </Link>
              </li>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/statistiques' ? 'linkActive' : ''}`}
                  to="/statistiques">
                    Statistiques
                </Link>
              </li>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/compte-rendu-activite' ? 'linkActive' : ''}`}
                  to="/compte-rendu-activite">
                    Enregistrer un nouvel accompagnement
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Menu;
