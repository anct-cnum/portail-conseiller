import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from './connected/Menu';
import { menuActions } from '../actions';

function Header({ linkAccount }) {

  const location = useLocation();
  const dispatch = useDispatch();

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };

  return (
    <header className="rf-header" role="banner">
      <div className="rf-container">
        <div
          className={`rf-grid-row rf-grid-row--top rf-grid-row--center ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
              </a>
              <div
                className={`rf-header__navbar ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerCustom' : ''}`}
                style={{ marginBottom: '13px' }}>
                <div className="rf-service">
                  <a className="rf-service__title" href="/" title="Coop">
                    Coop&nbsp;&nbsp;<span style={{ fontSize: 'small' }}>v { process.env.REACT_APP_VERSION }</span>
                  </a>
                  <p className="rf-service__tagline">Réseau des conseillers numériques France Services</p>
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
                <div className="rf-header__tools" style={{ marginBottom: '33px' }}>
                  <div className="rf-shortcuts">
                    <ul className="rf-shortcuts__list">
                      <li className="rf-shortcuts__item">
                        { linkAccount === 'noConnected' ?
                          <a href="/login" className="rf-link" target="_self">J&rsquo;ai déjà un compte</a> :
                          <span className="rf-link" style={{ cursor: 'unset' }}> { linkAccount } </span> }
                      </li>
                      { linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
                      <li className="rf-shortcuts__item">
                        <Link className="rf-btn rf-btn--sm" to="/login" title="Se déconnecter"><i className="ri-logout-box-r-line"></i></Link>
                      </li>
                      }
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      { linkAccount !== undefined && linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
        <Menu/>
      }
    </header>
  );

}

Header.propTypes = {
  linkAccount: PropTypes.string
};

export default Header;
