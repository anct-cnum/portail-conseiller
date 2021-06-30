import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuActions } from '../../actions';
function Menu() {

  const dispatch = useDispatch();
  let menu = useSelector(state => state.menu);

  const toggleBurgerMenu = () => {
    //Only if burger menu opened
    if (!menu.hiddenMenu && menu.expandNav) {
      dispatch(menuActions.toggleMenu());
      dispatch(menuActions.toggleNav());
    }
  };

  return (
    <>
      <div className="Menu">
        <div className="rf-grid-row rf-grid-row--center">
          <nav className={`rf-nav ${!menu.hiddenMenu && menu.expandNav ? 'rf-header__popin rf-header__popin--expanded' : ''}`}
            id="navigation"
            role="navigation"
            aria-label="Menu principal"
            style={{ boxShadow: 'none' }}>
            <ul className="rf-nav__list" style={{ paddingBottom: '15px' }}>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/accueil' ? 'linkActive' : ''}`}
                  to="/accueil" onClick={toggleBurgerMenu}>
                    Accueil
                </Link>
              </li>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/statistiques' ? 'linkActive' : ''}`}
                  to="/statistiques" onClick={toggleBurgerMenu}>
                    Statistiques
                </Link>
              </li>
              <li className="rf-nav__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/compte-rendu-activite' ? 'linkActive' : ''}`}
                  to="/compte-rendu-activite" onClick={toggleBurgerMenu}>
                    Enregistrer un nouvel accompagnement
                </Link>
              </li>
              {!menu.hiddenMenu && menu.expandNav &&
              <li className="rf-shortcuts__item">
                <Link className="rf-btn rf-btn--sm" to="/login" title="Se déconnecter" onClick={toggleBurgerMenu}>
                  Se deconnecter
                </Link>
              </li>
              }
            </ul>
            { !menu.hiddenMenu && menu.expandNav &&
              <button className="rf-btn rf-fi-close-line rf-btn--icon-right rf-btn--sm"
                title="Fermer"
                aria-controls="header-nav-popin"
                onClick={toggleBurgerMenu}>
                  Fermer
              </button>
            }
          </nav>
        </div>
      </div>
    </>
  );
}

export default Menu;
