import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from './connected/Menu';
import { menuActions } from '../actions';

function Header({ linkAccount, printClass }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const [menuAideShow, setMenuAideShow] = useState(false);
  const [menuUserShow, setMenuUserShow] = useState(false);
  //const [menuInformationsShow, setMenuInformationsShow] = useState(false);
  const role = useSelector(state => state.authentication?.user?.user?.role);
  const nom = useSelector(state => state.authentication?.user?.user?.nom);
  const prenom = useSelector(state => state.authentication?.user?.user?.prenom);

  const toggleBurgerMenu = () => {
    dispatch(menuActions.toggleMenu());
    dispatch(menuActions.toggleNav());
  };
  const aideCoop = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide_espace_coop';
  const aideMetier = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/aide-metier';
  const aideStructure = process.env.REACT_APP_AIDE_URL;

  return (
    <header className={printClass + ' rf-header'} role="banner">
      <div className="rf-container">
        <div
          // eslint-disable-next-line max-len
          className={`rf-grid-row rf-grid-row--top rf-grid-row--center ${location.pathname === '/validation' || location.pathname.startsWith('/inscription') ? 'headerRow' : ''}`}>
          <div className="rf-col-xs-10 rf-col-sm-10 rf-col-md-10 rf-col-xl-12">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                {printClass ?
                  <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/> :
                  <img src="/logos/logo-conseiller-numerique-nb.svg" alt="logo Conseiller Num&eacute;rique France Services" style={{ height: '48px' }}/>
                }
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
                {linkAccount !== undefined &&
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
                  <div className="rf-header__tools headerCustom">
                    <div className="rf-shortcuts">
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
                        <li className="rf-shortcuts__item header-aide">
                          <div className="" role="navigation" aria-label="aide">
                            <ul className="rf-nav__list">
                              <li className="rf-nav__item">
                                <button className="rf-nav__btn rf-custom-link"
                                  aria-expanded={menuAideShow} aria-controls="menu-liens-aide" aria-current="true"
                                  onClick={() => {
                                    setMenuAideShow(!menuAideShow);
                                    setMenuUserShow(menuUserShow ? !menuUserShow : menuUserShow);
                                    //setMenuInformationsShow(false);
                                  }}>
                                  <img className="logo-discussion" src="logos/bulle-ressourcerie.svg" />
                                  <span className="texte-aide">Aide&nbsp;
                                    {!menuAideShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
                                  </span>
                                </button>
                                <div
                                  className={!menuAideShow ? 'rf-collapse rf-menu' : 'rf-collapse rf-menu rf-collapse--expanded'}
                                  style={!menuAideShow ? { display: 'none' } : {}}
                                  id="menu-liens-aide">
                                  <ul className="rf-menu__list">
                                    {role !== 'structure_coop' &&
                                      <>
                                        <li className="aide-coop">
                                          <a className="rf-nav__link lien-aide" href={aideCoop} target="blank" rel="noreferrer"
                                            onClick={() => {
                                              setMenuAideShow(false);
                                            }}>
                                            Aide espace Coop<br />
                                            <span className="sous-titre-lien">Suivi d&rsquo;activit&eacute;, Pix, mail, etc.</span>
                                          </a>
                                        </li>
                                        <li className="aide-metier">
                                          <a className="rf-nav__link lien-aide" href={aideMetier} target="blank" rel="noreferrer"
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
                                        <a className="rf-nav__link lien-aide" href={aideStructure} target="blank" rel="noreferrer"
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
                          <li className="rf-shortcuts__item header-user">
                            <div className="" role="navigation" aria-label="user">
                              <ul className="rf-nav__list">
                                <li className="rf-nav__item">
                                  <button className="rf-nav__btn rf-custom-link"
                                    aria-expanded={menuUserShow} aria-controls="menu-liens-user" aria-current="true"
                                    onClick={() => {
                                      setMenuUserShow(!menuUserShow);
                                      setMenuAideShow(menuAideShow ? !menuAideShow : menuAideShow);
                                    }}>
                                    <span className="texte-user">{prenom} {nom}&nbsp;
                                      {!menuUserShow ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
                                    </span>
                                  </button>
                                  <div
                                    className={!menuUserShow ? 'rf-collapse rf-menu' : 'rf-collapse rf-menu rf-collapse--expanded'}
                                    style={!menuUserShow ? { display: 'none' } : {}}
                                    id="menu-liens-user">
                                    <ul className="rf-menu__list">
                                      <li className="user-infos">
                                        <Link className="rf-nav__link lien-user" to="/mes-informations"
                                          onClick={() => {
                                            setMenuUserShow(false);
                                          }}>
                                          Mes informations, Contact hi&eacute;rarchique<br />
                                        </Link>
                                      </li>
                                      {linkAccount !== 'noConnected' && location.pathname !== '/validation' &&
                                        <li className="user-disconnect">
                                          {role === 'conseiller' &&
                                            <Link className="rf-nav__link lien-user" to="/login"
                                              onClick={() => {
                                                setMenuUserShow(false);
                                              }}>
                                              D&eacute;connexion<br />
                                            </Link>
                                          }
                                          {role !== 'conseiller' &&
                                            <Link className="rf-nav__link lien-user" to="/login?role=admin"
                                              onClick={() => {
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
                          <li className="rf-shortcuts__item">
                            <a href="/login" className="rf-link" target="_self">J&rsquo;ai d&eacute;j&Agrave; un compte</a>
                          </li>
                        }

                        { /*(linkAccount !== 'noConnected' && role === 'conseiller') &&


                        <li className="rf-shortcuts__item header-informations">
                          <div className="" role="navigation" aria-label="informations">
                            <ul className="rf-nav__list">
                              <li className="rf-nav__item">
                                <button className="rf-nav__btn rf-custom-link"
                                  aria-expanded={menuInformationsShow} aria-controls="menu-informations" aria-current="true"
                                  onClick={() => {
                                    setMenuInformationsShow(!menuInformationsShow);
                                    setMenuAideShow(false);
                                  }}>
                                  <span className="texte-informations"><span className="rf-fi-user-line" aria-hidden="true"></span>
                                    { linkAccount }
                                    {!menuInformationsShow &&
                                      <i className="ri-arrow-down-s-line"></i>
                                    }
                                    {menuInformationsShow &&
                                      <i className="ri-arrow-up-s-line"></i>
                                    }
                                  </span>
                                </button>
                                <div className={!menuInformationsShow ? 'rf-collapse rf-menu' : 'rf-collapse rf-menu rf-collapse--expanded'}
                                  id="menu-informations">
                                  <ul className="rf-menu__list">
                                    <li className="mes-informations">
                                      <a className="rf-nav__link lien-informations" href="/mes-informations"
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
                        <li className="rf-shortcuts__item">
                          <span className="rf-link" style={{ cursor: 'unset' }}>
                            <span className="rf-fi-user-line" aria-hidden="true"></span>
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
          {role === 'conseiller' &&
            <Menu />
          }
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
