import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { menuActions } from '../../actions';
function Menu() {

  const dispatch = useDispatch();
  const location = useLocation();

  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  const menu = useSelector(state => state.menu);
  const voirPermanence = useSelector(state => state?.permanence?.hasPermanence);
  const suspendrePermanence = localStorage.getItem('suspension_permanence');

  const toggleBurgerMenu = () => {
    //Only if burger menu opened
    if (!menu.hiddenMenu && menu.expandNav) {
      dispatch(menuActions.toggleMenu());
      dispatch(menuActions.toggleNav());
    }
  };

  return (
    <>
      {(!voirPermanence || suspendrePermanence) &&
        <div
          className={`fr-header__menu ${!menu.hiddenMenu ? 'fr-modal fr-modal--opened' : ''}`}
          id="header-nav-popin"
          aria-labelledby="burgerMenu"
          role="menu"
          style={{ display: !menu.hiddenMenu ? 'block' : 'none' }}
        >
          <div className="fr-container">
            <button className="fr-link--close fr-link" aria-controls="header-nav-popin" onClick={toggleBurgerMenu}>Fermer</button>
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
                      <a className="fr-nav__link linkCustom" href={aideCoop} target="blank" rel="noreferrer">
                        Aide espace Coop
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <a className="fr-nav__link linkCustom" href={aideMetier} target="blank" rel="noreferrer">
                        Aide m&eacute;tier
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <Link
                        className="fr-nav__link linkCustom"
                        {...(location.pathname.startsWith(`/mes-informations`) ? { 'aria-current': 'page' } : {})}
                        to="/mes-informations"
                        title="Mes informations, Contact hi&eacute;rarchique"
                        onClick={toggleBurgerMenu}>
                        Mes informations, Contact hi&eacute;rarchique
                      </Link>
                    </li>
                    <li className="fr-nav__item">
                      <Link className="fr-btn fr-btn--sm" to="/login" title="Se d&eacute;connecter" onClick={toggleBurgerMenu}>
                        Se d&eacute;connecter
                      </Link>
                    </li>
                  </>
                }
              </ul>
            </nav>
          </div>
        </div>
      }
    </>
  );
}

export default Menu;
