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
    <header className="rf-header" role="banner">
      <div className="rf-container">
        <div
          // eslint-disable-next-line max-len
          className={`rf-grid-row rf-grid-row--top rf-grid-row--center ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/>
              </a>
              <div className={`rf-header__navbar ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerCustom' : ''}`}>
                <div className="rf-service">
                  {role !== 'admin_coop' &&
                    <div className="feuillet">
                      <a className="rf-service__title" href="/" title="Coop">
                        Coop&nbsp;<span style={{ fontSize: '20px', fontWeight: '300' }}>v {process.env.REACT_APP_VERSION}</span>
                      </a>
                      <p className="rf-service__tagline cacher-baseline">
                        Bienvenue sur le r&eacute;seau
                        <br />des conseillers num&eacute;riques France Services
                      </p>
                    </div>
                  }
                  {role === 'admin_coop' &&
                    <>
                      <a className="rf-service__title" href="/" title="Coop" style={{ fontSize: '24px' }}>
                        Espace Coop : Administration
                      </a>
                    </>
                  }
                </div>
                <button
                  id="burgerMenu"
                  className="rf-btn rf-fi-menu-fill rf-btn--icon "
                  title="Ouvrir le menu"
                  aria-controls="header-nav-popin"
                  onClick={toggleBurgerMenu}
                  style={!menu.hiddenMenu ? { zIndex: -1 } : {} }>
                </button>
              </div>
              <div className="rf-header__tools headerCustom">
                <div className="rf-shortcuts" style={!menu.hiddenMenu ? { display: 'none' } : {} }>
                  <ul className="rf-shortcuts__list">
                    <li className="rf-shortcuts__item header-propos">
                      <ul className="rf-nav__list">
                        <li className="rf-nav__item">
                          <Link className="rf-nav__btn rf-custom-link" to="/a-propos" title="&Agrave; propos de votre espace Coop" >
                            <i className="ri-compasses-2-fill"></i>&Agrave; propos
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="rf-shortcuts__item header-user">
                      <div className="" role="navigation" aria-label="user">
                        <ul className="rf-nav__list">
                          <li className="rf-nav__item">
                            <button className="rf-nav__btn rf-custom-link"
                              aria-expanded={menuUserShow} aria-controls="menu-liens-user" aria-current="true"
                              onClick={() => {
                                setMenuUserShow(!menuUserShow);
                              }}>
                              <span className="texte-user">{prenom ? prenom + ' ' + nom : email}&nbsp;
                                {!menuUserShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
                              </span>
                            </button>
                            <div
                              className={!menuUserShow ? 'rf-collapse rf-menu' : 'rf-collapse rf-menu rf-collapse--expanded'}
                              style={!menuUserShow ? { display: 'none' } : {}}
                              id="menu-liens-user">
                              <ul className="rf-menu__list">
                                <li className="user-disconnect">
                                  <Link className="rf-nav__link lien-user" to="/login"
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
