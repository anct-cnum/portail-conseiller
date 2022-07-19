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
  let menu = useSelector(state => state.menu);
  const [menuAideShow, setMenuAideShow] = useState(false);
  const [menuUserShow, setMenuUserShow] = useState(false);
  //const [menuInformationsShow, setMenuInformationsShow] = useState(false);
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
      <div className="fr-container">
        <div
          // eslint-disable-next-line max-len
          className={`fr-grid-row fr-grid-row--top header-grid ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="fr-col-xs-10 fr-col-sm-10 fr-col-md-10 fr-col-xl-12">
            <div className="fr-header__body">
              <a className="fr-header__operator" href="/" style={{ boxShadow: 'none', marginRight: '0.5rem' }}>
                {printClass ?
                  <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/> :
                  // eslint-disable-next-line max-len
                  <img src="/logos/logo-conseiller-numerique-nb.svg" className="logo-conseiller-numerique" alt="logo Conseiller Num&eacute;rique France Services" />
                }

              </a>
              <div className={`fr-header__navbar ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerCustom' : ''}`}>
                <div className="fr-service block-feuillet">
                  {role !== 'admin_coop' &&
                    <div className="feuillet">
                      <a className="fr-service__title title-feuillet" href="/" title="Coop">
                        Coop
                      </a>
                      <p className="fr-service__tagline cacher-baseline" style={{ fontSize: '12px', fontWeight: '400', lineHeight: '20px', color: '#929292' }}>
                        Bienvenue sur le r&eacute;seau des conseillers num&eacute;riques
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
                {linkAccount !== undefined &&
                  <button
                    id="burgerMenu"
                    className="fr-btn fr-fi-menu-fill fr-btn--icon "
                    title="Ouvrir le menu"
                    aria-controls="header-nav-popin"
                    onClick={toggleBurgerMenu}
                    style={!menu.hiddenMenu ? { zIndex: -1 } : {} }>
                  </button>
                }
              </div>
              {linkAccount !== undefined &&
                <>
                  <div className="fr-header__tools headerCustom">
                    <div className="fr-shortcuts" style={!menu.hiddenMenu ? { display: 'none' } : {} }>
                      <ul className="fr-shortcuts__list">
                        <li className="fr-shortcuts__item header-propos fr-mr-md-2w">
                          <ul className="fr-nav__list">
                            <li className="fr-nav__item">
                              <Link className="fr-nav__btn fr-custom-link" to="/a-propos" title="&Agrave; propos de votre espace Coop" >
                                &Agrave; propos
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="fr-shortcuts__item header-aide fr-mr-md-2w">
                          <div className="" role="navigation" aria-label="aide">
                            <ul className="fr-nav__list">
                              <li className="fr-nav__item">
                                <button className="fr-nav__btn fr-custom-link"
                                  aria-expanded={menuAideShow} aria-controls="menu-liens-aide" aria-current="true"
                                  onClick={() => {
                                    setMenuAideShow(!menuAideShow);
                                    setMenuUserShow(menuUserShow ? !menuUserShow : menuUserShow);
                                    //setMenuInformationsShow(false);
                                  }}>
                                  <span className="texte-aide">Aide&nbsp;
                                    {!menuAideShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
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
                          <li className="fr-shortcuts__item header-user fr-mr-md-2w">
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
                                      {!menuUserShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
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

                        { /*(linkAccount !== 'noConnected' && role === 'conseiller') &&


                        <li className="fr-shortcuts__item header-informations">
                          <div className="" role="navigation" aria-label="informations">
                            <ul className="fr-nav__list">
                              <li className="fr-nav__item">
                                <button className="fr-nav__btn fr-custom-link"
                                  aria-expanded={menuInformationsShow} aria-controls="menu-informations" aria-current="true"
                                  onClick={() => {
                                    setMenuInformationsShow(!menuInformationsShow);
                                    setMenuAideShow(false);
                                  }}>
                                  <span className="texte-informations"><span className="fr-fi-user-line" aria-hidden="true"></span>
                                    { linkAccount }
                                    {!menuInformationsShow &&
                                      <i className="ri-arrow-down-s-line"></i>
                                    }
                                    {menuInformationsShow &&
                                      <i className="ri-arrow-up-s-line"></i>
                                    }
                                  </span>
                                </button>
                                <div className={!menuInformationsShow ? 'fr-collapse fr-menu' : 'fr-collapse fr-menu fr-collapse--expanded'}
                                  id="menu-informations">
                                  <ul className="fr-menu__list">
                                    <li className="mes-informations">
                                      <a className="fr-nav__link lien-informations" href="/mes-informations"
                                        onClick={() => {
                                          setMenuInformationsShow(false);
                                        }}>
                                        Mes informations<br/>
                                        <span className="sous-titre-lien">Mes horaires et mon adresse</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>*/
                        }

                        {/* (linkAccount !== 'noConnected' && role !== 'conseiller') &&
                        <li className="fr-shortcuts__item">
                          <span className="fr-link" style={{ cursor: 'unset' }}>
                            <span className="fr-fi-user-line" aria-hidden="true"></span>
                            { linkAccount }
                          </span>
                        </li>
                    */}
                      </ul>
                    </div>
                  </div>
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
