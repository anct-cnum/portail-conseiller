import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { menuActions } from '../../actions';
function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();

  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  let menu = useSelector(state => state.menu);
  const toggleBurgerMenu = () => {
    //Only if burger menu opened
    if (!menu.hiddenMenu && menu.expandNav) {
      dispatch(menuActions.toggleMenu());
      dispatch(menuActions.toggleNav());
    }
  };

  const exclusionPage = ['/ressourcerie', '/a-propos'];

  return (
    <>
      {location.pathname !== '/accueil' &&
        <div className="Menu">
          <div className="rf-grid-row rf-grid-row--center">
            <nav className={`rf-nav ${!menu.hiddenMenu && menu.expandNav ? 'rf-header__popin rf-header__popin--expanded' : ''}`}
              id="navigation"
              role="navigation"
              aria-label="Menu principal"
              style={{ boxShadow: 'none', zIndex: 1 }}>
              <ul className="rf-nav__list" style={{ paddingBottom: '15px' }}>
                { !exclusionPage.includes(location.pathname) &&
                <>
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
                  <li className="rf-nav__item">
                    <Link
                      className={`rf-nav__link linkCustom ${location.pathname === '/ressourcerie' ? 'linkActive' : ''}`}
                      to="/ressourcerie" onClick={toggleBurgerMenu}>
                        Ressourcerie
                    </Link>
                  </li>
                </>
                }
                {!menu.hiddenMenu && menu.expandNav &&
                <>
                  <li className="rf-shortcuts__item">
                    <Link className="rf-btn rf-btn--sm" to="/a-propos" title="À propos du site" onClick={toggleBurgerMenu}>
                    À propos
                    </Link>
                  </li>
                  <li className="rf-shortcuts__item">
                    <a className="rf-nav__link" href={aideCoop} target="blank" rel="noreferrer">
                      Aide espace Coop
                    </a>
                  </li>
                  <li className="rf-shortcuts__item">
                    <a className="rf-nav__link" href={aideMetier} target="blank" rel="noreferrer">
                      Aide m&eacute;tier
                    </a>
                  </li>
                  <li className="rf-shortcuts__item">
                    <Link className="rf-btn rf-btn--sm" to="/login" title="Se déconnecter" onClick={toggleBurgerMenu}>
                      Se d&eacute;connecter
                    </Link>
                  </li>

                </>
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
      }
    </>
  );
}

export default Menu;
