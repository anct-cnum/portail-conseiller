import React from 'react';
import PropTypes from 'prop-types';

function Header({ linkAccount }) {

  return (
    <header className="rf-header" role="banner">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center">
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
              </a>
              <div className="rf-header__navbar" style={{ marginBottom: '13px' }}>
                <div className="rf-service">
                  <a className="rf-service__title" href="/" title="Coop">
                    Coop&nbsp;&nbsp;<span style={{ fontSize: 'small' }}>v { process.env.REACT_APP_VERSION }</span>
                  </a>
                  <p className="rf-service__tagline">Réseau des conseillers numériques France Services</p>
                </div>
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
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );

}

Header.propTypes = {
  linkAccount: PropTypes.string
};

export default Header;
