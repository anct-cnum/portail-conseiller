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
      { (!voirPermanence || suspendrePermanence) &&
        <>
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
                        className={`rf-nav__link linkCustom ${location.pathname === '/a-propos' ? 'linkActive' : ''}`}
                        to="/a-propos"
                        title="&Agrave; propos du site"
                        onClick={toggleBurgerMenu}>
                        &Agrave; propos
                      </Link>
                    </li>
                    <li className="rf-shortcuts__item">
                      <a className="rf-nav__link linkCustom" href={aideCoop} target="blank" rel="noreferrer">
                        Aide espace Coop
                      </a>
                    </li>
                    <li className="rf-shortcuts__item">
                      <a className="rf-nav__link linkCustom" href={aideMetier} target="blank" rel="noreferrer">
                        Aide m&eacute;tier
                      </a>
                    </li>
                    <li className="rf-shortcuts__item">
                      <Link
                        className={`rf-nav__link linkCustom ${location.pathname === '/mes-informations' ? 'linkActive' : ''}`}
                        to="/mes-informations"
                        title="Mes informations, Contact hi&eacute;rarchique"
                        onClick={toggleBurgerMenu}>
                        Mes informations, Contact hi&eacute;rarchique
                      </Link>
                    </li>
                    <li className="rf-shortcuts__item">
                      <Link className="rf-btn rf-btn--sm" to="/login" title="Se d&eacute;connecter" onClick={toggleBurgerMenu}>
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
        </>
      }
    </>
  );
}

export default Menu;
