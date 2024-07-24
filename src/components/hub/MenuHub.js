import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { menuActions } from '../../actions';
function MenuHub() {

  const dispatch = useDispatch();
  const location = useLocation();

  const lienMattermost = import.meta.env.VITE_APP_MATTERMOST_URL;
  const lienLaBase = import.meta.env.VITE_APP_LABASE_URL;

  let menu = useSelector(state => state.menu);
  const toggleBurgerMenu = () => {
    //Only if burger menu opened
    if (!menu.hiddenMenu && menu.expandNav) {
      dispatch(menuActions.toggleMenu());
      dispatch(menuActions.toggleNav());
    }
  };

  return (
    <div
      className={`fr-header__menu ${!menu.hiddenMenu ? 'fr-modal fr-modal--opened' : ''}`}
      id="modal-870"
      aria-labelledby="burgerMenu"
      role="menu"
      style={{ display: !menu.hiddenMenu ? 'block' : 'none' }}
    >
      <div className="fr-container">
        <button className="fr-link--close fr-link" aria-controls="modal-870" onClick={toggleBurgerMenu}>Fermer</button>
        <div className="fr-header__menu-links"></div>
        <nav className="fr-nav fr-display--none-lg" id="navigation-869" role="navigation" aria-label="Menu principal">
          <ul className="fr-nav__list">
            {!menu.hiddenMenu && menu.expandNav &&
              <>
                <li className="fr-nav__item">
                  <Link
                    className="fr-nav__link linkCustom"
                    {...(location.pathname.startsWith(`/a-propos`) ? { 'aria-current': 'page' } : {})}
                    onClick={toggleBurgerMenu}
                    to="/a-propos"
                    title="&Agrave; propos du site">
                    &Agrave; propos
                  </Link>
                </li>
                <li className="fr-nav__item">
                  <a
                    className="fr-nav__link linkCustom"
                    href={lienLaBase} rel="noreferrer" target="blank"
                    title="Ressourcerie"
                    onClick={toggleBurgerMenu}>
                    Ressourcerie
                  </a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link linkCustom" href={lienMattermost} target="blank" rel="noreferrer">
                  Espace de discussion
                  </a>
                </li>
                <li className="fr-nav__item">
                  <Link className="fr-btn fr-btn--sm" to="/login?role=admin" title="Se d&eacute;connecter" onClick={toggleBurgerMenu}>
                    Se d&eacute;connecter
                  </Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MenuHub;
