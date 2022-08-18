import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from './connected/Menu';
import MenuAdmin from './admin/MenuAdmin';
import { filtersAndSortsActions, menuActions } from '../actions';

function Header({ linkAccount, printClass }) {

  const location = useLocation();
  const dispatch = useDispatch();

  const [menuAideShow, setMenuAideShow] = useState(false);
  const [menuUserShow, setMenuUserShow] = useState(false);

  let menu = useSelector(state => state.menu);
  const role = useSelector(state => state.authentication?.user?.user?.role);
  const nom = useSelector(state => state.authentication?.user?.user?.nom);
  const prenom = useSelector(state => state.authentication?.user?.user?.prenom);
  const email = useSelector(state => state.authentication?.user?.user?.name);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const resetFiltreListeConseillers = () => dispatch(filtersAndSortsActions.resetFiltre());
  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';
  const aideStructure = process.env.REACT_APP_AIDE_URL;

  return (
    <header className={printClass + ' fr-header'} role="banner">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  {printClass ?
                    <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/> :
                    <img src="/logos/logo-conseiller-numerique-nb.svg" className="logo-conseiller-numerique"
                      alt="logo Conseiller Num&eacute;rique France Services" />
                  }
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
      { linkAccount !== undefined &&
        <>
            <div className="fr-header__tools">
              <nav className="fr-header__tools-links">
                <ul className="fr-btns-group">
                  <li className="header-propos">
                    <ul className="fr-nav__list">
                      <li className="fr-nav__item">
                        <Link className="fr-custom-link" to="/a-propos" title="&Agrave; propos de votre espace Coop" >
                          &Agrave; propos
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="header-aide">
                    <div className="" role="navigation" aria-label="aide">
                      <ul className="fr-nav__list">
                        <li className="fr-nav__item">
                          <button className="fr-nav__btn fr-custom-link"
                            aria-expanded={menuAideShow} aria-controls="menu-liens-aide" aria-current="true"
                            onClick={() => {
                              setMenuAideShow(!menuAideShow);
                              setMenuUserShow(menuUserShow ? !menuUserShow : menuUserShow);
                            }}>
                            <span className="texte-aide">Aide&nbsp;
                            </span>
                          </button>
                          <div
                            className={!menuAideShow ? 'fr-collapse fr-menu' : 'fr-collapse fr-menu fr-collapse--expanded'}
                            style={!menuAideShow ? { display: 'none' } : {}}
                            id="menu-liens-aide">
                            <ul className="fr-menu__list">
                              {role !== 'structure_coop' &&
                                <>
                                  <li className="aide-coop">
                                    <a className="fr-nav__link lien-aide" href={aideCoop} target="blank" rel="noreferrer"
                                      onClick={() => {
                                        setMenuAideShow(false);
                                      }}>
                                      Aide espace Coop<br />
                                      <span className="sous-titre-lien">Suivi d&rsquo;activit&eacute;, Pix, mail, etc.</span>
                                    </a>
                                  </li>
                                  <li className="aide-metier">
                                    <a className="fr-nav__link lien-aide" href={aideMetier} target="blank" rel="noreferrer"
                                      onClick={() => {
                                        setMenuAideShow(false);
                                      }}>
                                      Aide m&eacute;tier<br />
                                      <span className="sous-titre-lien">Missions et cadre de travail.</span>
                                    </a>
                                  </li>
                                </>
                              }
                              {role === 'structure_coop' &&
                                <li className="aide-coop">
                                  <a className="fr-nav__link lien-aide" href={aideStructure} target="blank" rel="noreferrer"
                                    onClick={() => {
                                      setMenuAideShow(false);
                                    }}>
                                    Aide espace Coop<br />
                                    <span className="sous-titre-lien">Consulter la Foire aux Questions.</span>
                                  </a>
                                </li>
                              }
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {linkAccount !== 'noConnected' &&
                    <li className="header-user">
                      <div className="" role="navigation" aria-label="user">
                        <ul className="fr-nav__list">
                          <li className="fr-nav__item">
                            <button className="fr-nav__btn fr-custom-link"
                              aria-expanded={menuUserShow} aria-controls="menu-liens-user" aria-current="true"
                              onClick={() => {
                                setMenuUserShow(!menuUserShow);
                                setMenuAideShow(menuAideShow ? !menuAideShow : menuAideShow);
                              }}>
                              <span className="texte-user">{prenom ? prenom + ' ' + nom : email}&nbsp;
                                { role === 'conseiller' && !conseiller?.supHierarchique &&
                                  <i className="ri-information-line information icone-info-header" ></i>
                                }
                              </span>
                            </button>
                            <div
                              className={!menuUserShow ? 'fr-collapse fr-menu' : 'fr-collapse fr-menu fr-collapse--expanded'}
                              style={!menuUserShow ? { display: 'none' } : {}}
                              id="menu-liens-user">
                              <ul className="fr-menu__list">
                                {['conseiller', 'coordinateur_coop'].includes(role) &&
                                  <li className="user-infos">
                                    <Link className="fr-nav__link lien-user" to="/mes-informations"
                                      onClick={() => {
                                        setMenuUserShow(false);
                                      }}>
                                      { !conseiller?.supHierarchique &&
                                        <i className="ri-information-line information icone-info-header"></i>
                                      }
                                          Mes informations, Contact hi&eacute;rarchique<br />
                                    </Link>
                                  </li>
                                }
                                {linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
                                  <li className="user-disconnect">
                                    {role === 'conseiller' &&
                                      <Link className="fr-nav__link lien-user" to="/login"
                                        onClick={() => {
                                          setMenuUserShow(false);
                                        }}>
                                        D&eacute;connexion<br />
                                      </Link>
                                    }
                                    {role !== 'conseiller' &&
                                      <Link className="fr-nav__link lien-user" to="/login?role=admin"
                                        onClick={() => {
                                          resetFiltreListeConseillers();
                                          setMenuUserShow(false);
                                        }}>
                                        D&eacute;connexion<br />
                                      </Link>
                                    }
                                  </li>
                                }
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  }

                  {linkAccount === 'noConnected' &&
                    <li className="fr-shortcuts__item">
                      <a href="/login" className="fr-link" target="_self">J&rsquo;ai d&eacute;j&Agrave; un compte</a>
                    </li>
                  }

                </ul>
              </nav>
            </div>
        </>
      }
            <div className="rf-header__navbar">
              {linkAccount !== undefined &&
              <>
                <button
                  id="burgerMenu"
                  className="fr-icon-menu-fill"
                  title="Ouvrir le menu"
                  aria-controls="header-nav-popin"
                  onClick={toggleBurgerMenu}
                  style={!menu.hiddenMenu ? { zIndex: -1 } : {} }>
                </button>
              </>
              }
            </div>
          </div>
        </div>
      </div>

      {linkAccount !== undefined && linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
        <>
          {role === 'conseiller' ? <Menu /> : <MenuAdmin />}
        </>
      }
    </header>
  );

}

Header.propTypes = {
  linkAccount: PropTypes.string,
  printClass: PropTypes.string,
};

export default Header;
