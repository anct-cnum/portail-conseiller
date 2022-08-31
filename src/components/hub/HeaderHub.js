import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuActions } from '../../actions';
import MenuHub from './MenuHub';
import PropTypes from 'prop-types';

function HeaderHub({ linkAccount }) {

  const dispatch = useDispatch();
  const [menuUserShow, setMenuUserShow] = useState(false);
  const nom = useSelector(state => state.authentication?.user?.user?.nom);
  const prenom = useSelector(state => state.authentication?.user?.user?.prenom);
  const email = useSelector(state => state.authentication?.user?.user?.name);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };

  return (
    <header className="fr-header" role="banner">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <img src="/logos/logo-conseiller-numerique-nb.svg" className="logo-conseiller-numerique"
                    alt="logo Conseiller Num&eacute;rique France Services" />
                </div>
              </div>

              <div className="fr-header__service">
                <div className="block-feuillet">
                  <a href="/" title="Accueil - Conseiller Numerique France service">
                    <div className="feuillet">
                      <p className="fr-header__service-title title-feuillet">Coop</p>
                      <p className="fr-header__service-tagline">Bienvenue sur le r&eacute;seau des conseillers num&eacute;riques</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="fr-header__menu fr-modal" id="modal-491" aria-labelledby="button-492">
              <div className="fr-header__menu-links">
              </div>
            </div>
            {linkAccount !== undefined &&
              <><>
                <div className="fr-header__tools">
                  <nav className="fr-header__tools-links">
                    <ul className="fr-btns-group">
                      <li className="header-propos">
                        <ul className="fr-nav__list">
                          <li className="fr-nav__item">
                            <Link className="fr-custom-link" style={{ marginTop: '-1px' }} to="/a-propos" title="&Agrave; propos de votre espace Coop">
                              &Agrave; propos
                            </Link>
                          </li>
                        </ul>
                      </li>
                      {linkAccount !== 'noConnected' &&
                        <li className="header-user">
                          <div className="" role="navigation" aria-label="user">
                            <ul className="fr-nav__list">
                              <li className="fr-nav__item">
                                <button className="fr-nav__btn fr-custom-link"
                                  aria-expanded={menuUserShow} aria-controls="menu-liens-hub" aria-current="true"
                                  onClick={() => {
                                    setMenuUserShow(!menuUserShow);
                                  }}>
                                  <span className="texte-user">{prenom ? prenom + ' ' + nom : email}&nbsp;</span>
                                </button>
                                <div
                                  className={!menuUserShow ? 'fr-collapse fr-menu' : 'fr-collapse fr-menu fr-collapse--expanded'}
                                  style={!menuUserShow ? { display: 'none' } : {}}
                                  id="menu-liens-hub">
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
                        </li>}

                      {linkAccount === 'noConnected' &&
                        <li className="fr-shortcuts__item">
                          <a href="/login" className="fr-link" target="_self">J&rsquo;ai d&eacute;j&Agrave; un compte</a>
                        </li>}

                    </ul>
                  </nav>
                </div>
              </>
              <div className="rf-header__navbar">
                {linkAccount !== undefined &&
                    <button
                      className="fr-icon-menu-fill"
                      data-fr-opened="false"
                      aria-controls="modal-870"
                      aria-haspopup="menu"
                      title="Menu"
                      id="burgerMenu"
                      onClick={toggleBurgerMenu}
                    >
                    </button>
                }
              </div>
              </>
            }
          </div>
        </div>
      </div>
      <MenuHub />
    </header>
  );

}

HeaderHub.propTypes = {
  linkAccount: PropTypes.string,
};

export default HeaderHub;
