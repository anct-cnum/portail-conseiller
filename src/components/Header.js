import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from './connected/Menu';
import { menuActions } from '../actions';

function Header({ linkAccount }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const [menuAideShow, setMenuAideShow] = useState(false);
  const role = useSelector(state => state.authentication?.user?.user?.role);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';

  return (
    <header className="rf-header" role="banner">
      <div className="rf-container">
        <div
          // eslint-disable-next-line max-len
          className={`rf-grid-row rf-grid-row--top rf-grid-row--center ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
              </a>
              <div className={`rf-header__navbar ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerCustom' : ''}`}
                style={{ marginBottom: '13px' }}>
                <div className="rf-service">
                  {role !== 'admin_coop' &&
                    <>
                      <a className="rf-service__title" href="/" title="Coop">
                        Coop&nbsp;&nbsp;<span style={{ fontSize: 'small' }}>v { process.env.REACT_APP_VERSION }</span>
                      </a>
                      <p className="rf-service__tagline">Réseau des conseillers numériques France Services</p>
                    </>
                  }
                  {role === 'admin_coop' &&
                    <>
                      <a className="rf-service__title" href="/" title="Coop" style={{ fontSize: '24px' }}>
                      Espace Coop : Administration
                      </a>
                    </>
                  }
                </div>
                { linkAccount !== undefined &&
                <button
                  id="burgerMenu"
                  className="rf-btn rf-fi-menu-fill rf-btn--icon "
                  title="Ouvrir le menu"
                  aria-controls="header-nav-popin"
                  onClick={toggleBurgerMenu}>
                </button>
                }
              </div>
              {linkAccount !== undefined &&
              <>
                <div className="rf-header__tools" style={{ marginBottom: '33px' }}>
                  <div className="rf-shortcuts">
                    <ul className="rf-shortcuts__list">
                      <li className="rf-shortcuts__item">
                        <div className="" role="navigation" aria-label="aide">
                          <ul className="rf-nav__list">
                            <li className="rf-nav__item">
                              <button className="rf-nav__btn rf-custom-link"
                                aria-expanded={menuAideShow} aria-controls="menu-liens-aide" aria-current="true"
                                onClick={() => {
                                  setMenuAideShow(!menuAideShow);
                                }}>
                                <img className="logo-discussion" src="logos/bulle-ressourcerie.svg"/>
                                <span className="texte-aide">Aide&nbsp;
                                  {!menuAideShow &&
                                    <i className="ri-arrow-down-s-line"></i>
                                  }
                                  {menuAideShow &&
                                    <i className="ri-arrow-up-s-line"></i>
                                  }
                                </span>
                              </button>
                              <div className={!menuAideShow ? 'rf-collapse rf-menu' : 'rf-collapse rf-menu rf-collapse--expanded'} id="menu-liens-aide">
                                <ul className="rf-menu__list">
                                  <li className="aide-coop">
                                    <a className="rf-nav__link lien-aide" href={aideCoop} target="blank" rel="noreferrer">
                                      Aide espace Coop<br/>
                                      <span className="sous-titre-lien">Suivi d&rsquo;activité, Pix, mail, etc.</span>
                                    </a>
                                  </li>
                                  <li className="aide-metier">
                                    <a className="rf-nav__link lien-aide" href={aideMetier} target="blank" rel="noreferrer">
                                      Aide m&eacute;tier<br/>
                                      <span className="sous-titre-lien">Missions et cadre de travail.</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="rf-shortcuts__item">

                        { linkAccount === 'noConnected' ?
                          <a href="/login" className="rf-link" target="_self">J&rsquo;ai déjà un compte</a> :
                          <span className="rf-link" style={{ cursor: 'unset' }}>
                            <span className="rf-fi-user-line" aria-hidden="true"></span>
                            { linkAccount }
                          </span> }
                      </li>
                      { linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
                      <li className="rf-shortcuts__item">
                        {role !== 'admin_coop' &&
                          <Link className="rf-btn rf-btn--sm" to="/login" title="Se déconnecter" >
                            <i className="ri-logout-box-r-line"></i>
                          </Link>
                        }
                        {role === 'admin_coop' &&
                          <Link className="rf-btn rf-btn--sm" to="/login?role=admin" title="Se déconnecter"><i className="ri-logout-box-r-line"></i></Link>
                        }
                      </li>
                      }
                    </ul>
                  </div>
                </div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
      { linkAccount !== undefined && linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
      <>
        {role !== 'admin_coop' &&
          <Menu/>
        }
      </>
      }
    </header>
  );

}

Header.propTypes = {
  linkAccount: PropTypes.string
};

export default Header;
