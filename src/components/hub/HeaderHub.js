import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuActions } from '../../actions';
import MenuHub from './MenuHub';

function Header() {

  const dispatch = useDispatch();
  let menu = useSelector(state => state.menu);
  const [menuUserShow, setMenuUserShow] = useState(false);
  const role = useSelector(state => state.authentication?.user?.user?.role);
  const nom = useSelector(state => state.authentication?.user?.user?.nom);
  const prenom = useSelector(state => state.authentication?.user?.user?.prenom);
  const email = useSelector(state => state.authentication?.user?.user?.name);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };

  return (
    <header className="fr-header" role="banner">
      <div className="fr-container">
        <div
          // eslint-disable-next-line max-len
          className={`fr-grid-row fr-grid-row--top fr-grid-row--center ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="fr-col-xs-10 fr-col-sm-10 fr-col-md-10 fr-col-xl-12">
            <div className="fr-header__body">
              <a className="fr-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/>
              </a>
              <div className={`fr-header__navbar ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerCustom' : ''}`}>
                <div className="fr-service">
                  {role !== 'admin_coop' &&
                    <div className="feuillet">
                      <a className="fr-service__title" href="/" title="Coop">
                        Coop&nbsp;<span style={{ fontSize: '20px', fontWeight: '300' }}>v {process.env.REACT_APP_VERSION}</span>
                      </a>
                      <p className="fr-service__tagline cacher-baseline">
                        Bienvenue sur le r&eacute;seau
                        <br />des conseillers num&eacute;riques France Services
                      </p>
                    </div>
                  }
                  {role === 'admin_coop' &&
                    <>
                      <a className="fr-service__title" href="/" title="Coop" style={{ fontSize: '24px' }}>
                        Espace Coop : Administration
                      </a>
                    </>
                  }
                </div>
                <button
                  id="burgerMenu"
                  className="fr-btn fr-fi-menu-fill fr-btn--icon "
                  title="Ouvrir le menu"
                  aria-controls="header-nav-popin"
                  onClick={toggleBurgerMenu}
                  style={!menu.hiddenMenu ? { zIndex: -1 } : {} }>
                </button>
              </div>
              <div className="fr-header__tools headerCustom">
                <div className="fr-shortcuts" style={!menu.hiddenMenu ? { display: 'none' } : {} }>
                  <ul className="fr-shortcuts__list">
                    <li className="fr-shortcuts__item header-propos">
                      <ul className="fr-nav__list">
                        <li className="fr-nav__item">
                          <Link className="fr-nav__btn fr-custom-link" to="/a-propos" title="&Agrave; propos de votre espace Coop" >
                            <i className="ri-compasses-2-fill"></i>&Agrave; propos
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="fr-shortcuts__item header-user">
                      <div className="" role="navigation" aria-label="user">
                        <ul className="fr-nav__list">
                          <li className="fr-nav__item">
                            <button className="fr-nav__btn fr-custom-link"
                              aria-expanded={menuUserShow} aria-controls="menu-liens-user" aria-current="true"
                              onClick={() => {
                                setMenuUserShow(!menuUserShow);
                              }}>
                              <span className="texte-user">{prenom ? prenom + ' ' + nom : email}&nbsp;
                                {!menuUserShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
                              </span>
                            </button>
                            <div
                              className={!menuUserShow ? 'fr-collapse fr-menu' : 'fr-collapse fr-menu fr-collapse--expanded'}
                              style={!menuUserShow ? { display: 'none' } : {}}
                              id="menu-liens-user">
                              <ul className="fr-menu__list">
                                <li className="user-disconnect">
                                  <Link className="fr-nav__link lien-user" to="/login"
                                    onClick={() => {
                                      setMenuUserShow(false);
                                    }}>
                                    D&eacute;connexion<br />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MenuHub />
    </header>
  );

}

export default Header;
