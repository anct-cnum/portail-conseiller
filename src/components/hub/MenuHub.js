import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { menuActions } from '../../actions';
function MenuHub() {

  const dispatch = useDispatch();
  const location = useLocation();

  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const linkAccount = useSelector(state => state.authentication?.user?.user?.name);
  const lienLaBase = `${process.env.REACT_APP_LABASE_URL}?email=${linkAccount}`;

  let menu = useSelector(state => state.menu);
  const toggleBurgerMenu = () => {
    //Only if burger menu opened
    if (!menu.hiddenMenu && menu.expandNav) {
      dispatch(menuActions.toggleMenu());
      dispatch(menuActions.toggleNav());
    }
  };

  return (
    <div className="Menu">
      <div className="rf-grid-row rf-grid-row--center">
        <nav className={`rf-nav ${!menu.hiddenMenu && menu.expandNav ? 'rf-header__popin rf-header__popin--expanded' : ''}`}
          id="navigation"
          role="navigation"
          aria-label="Menu principal"
          style={{ boxShadow: 'none', zIndex: 1 }}>
          <ul className="rf-nav__list" style={{ paddingBottom: '15px' }}>
            {!menu.hiddenMenu && menu.expandNav &&
            <>
              <li className="rf-shortcuts__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/statistiques-nationales' ? 'linkActive' : ''}`}
                  to="/statistiques-nationales"
                  title="Statistiques nationales"
                  onClick={toggleBurgerMenu}>
                    Statistiques nationales
                </Link>
              </li>
              <li className="rf-shortcuts__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/territoires' ? 'linkActive' : ''}`}
                  to="/territoires"
                  title="Statistiques par territoire"
                  onClick={toggleBurgerMenu}>
                    Statistiques par territoire
                </Link>
              </li>
              <li className="rf-shortcuts__item">
                <a
                  className="rf-nav__link linkCustom"
                  href={lienLaBase} rel="noreferrer" target="blank"
                  title="Ressourcerie"
                  onClick={toggleBurgerMenu}>
                    Ressourcerie
                </a>
              </li>
              <li className="rf-shortcuts__item">
                <Link
                  className={`rf-nav__link linkCustom ${location.pathname === '/a-propos' ? 'linkActive' : ''}`}
                  to="/a-propos"
                  title="&Agrave; propos du site"
                  onClick={toggleBurgerMenu}>
                  &Agrave; propos
                </Link>
              </li>
              <li className="rf-shortcuts__item">
                <a className="rf-nav__link linkCustom" href={lienMattermost} target="blank" rel="noreferrer">
                  Espace de discussion
                </a>
              </li>
              <li className="rf-shortcuts__item">
                <Link className="rf-btn rf-btn--sm" to="/login?role=admin" title="Se d&eacute;connecter" onClick={toggleBurgerMenu}>
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
  );
}

export default MenuHub;
