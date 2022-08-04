import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { conseillerActions, filtersAndSortsActions } from '../../actions';
import Conseiller from './Conseiller';
import Pagination from './Pagination';
import FiltersAndSorts from './FiltersAndSorts';
import Footer from '../Footer';

function Conseillers() {

  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseiller);
  const pagination = useSelector(state => state.pagination);

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let filtreProfil = useSelector(state => state.filtersAndSorts?.profil);
  let filtreCertifie = useSelector(state => state.filtersAndSorts?.certifie);
  let filtreGroupeCRA = useSelector(state => state.filtersAndSorts?.groupeCRA);
  let filtreParNom = useSelector(state => state.filtersAndSorts?.nom);
  let filtreParStructureId = useSelector(state => state.filtersAndSorts?.structureId);
  let filtreRegion = useSelector(state => state.filtersAndSorts?.region);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);
  const user = useSelector(state => state?.authentication?.user?.user);
  const initConseiller = useSelector(state => state.conseiller?.initConseiller);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [basculerFiltreProfil, setBasculerFiltreProfil] = useState(false);
  const [basculerFiltreCRA, setBasculerFiltreCRA] = useState(false);
  const [basculerFiltreCertifie, setBasculerFiltreCertifie] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll(page,
      dateDebut,
      dateFin,
      filtreProfil,
      filtreCertifie,
      filtreGroupeCRA,
      filtreParNom,
      ordreNom,
      ordre ? 1 : -1,
      user.role === 'structure_coop' ? user.entity.$id : filtreParStructureId,
      filtreRegion
    ));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
      if (initConseiller === false) {
        dispatch(conseillerActions.saveConseillerBeforeFilter(conseillers.items));
      }
    }
  }, [conseillers]);

  useEffect(() => {
    dispatch(conseillerActions.getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom, ordreNom,
      ordre ? 1 : -1, user.role === 'structure_coop' ? user.entity.$id : filtreParStructureId, filtreRegion));
  }, [ordre, ordreNom, filtreProfil, filtreGroupeCRA, filtreParNom, filtreParStructureId, filtreCertifie, filtreRegion]);

  const filtreClick = e => {
    if (e.target.id === 'activer') {
      setBasculerFiltreProfil(!basculerFiltreProfil);
      setBasculerFiltreCertifie(false);
      setBasculerFiltreCRA(false);
    } else if (e.target.id === 'certifier') {
      setBasculerFiltreCertifie(!basculerFiltreCertifie);
      setBasculerFiltreProfil(false);
      setBasculerFiltreCRA(false);
    } else {
      setBasculerFiltreCertifie(false);
      setBasculerFiltreProfil(false);
      setBasculerFiltreCRA(!basculerFiltreCRA);
    }
  };
  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
  };

  const handleSortProfil = e => {
    dispatch(filtersAndSortsActions.changeProfil(e.target.id));
    setBasculerFiltreProfil(false);
  };
  const handleGroupeCra = e => {
    dispatch(filtersAndSortsActions.changeGroupeCRA(e.target.id));
    setBasculerFiltreCRA(false);
  };
  const handleSortCertifie = e => {
    dispatch(filtersAndSortsActions.changeCertifie(e.target.id));
    setBasculerFiltreCertifie(false);
  };

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage} user={user} />
        <div className="fr-container fr-mt-2w">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12">
              <div className="fr-table" style={{ overflow: 'auto' }}>
                <table >
                  <thead className="conseillers-thead">
                    <tr>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="prenom">
                            Pr&eacute;nom
                            {(ordreNom !== 'prenom' || ordreNom === 'prenom' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            {(ordreNom === 'prenom' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="nom">
                            Nom
                            {(ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            {(ordreNom === 'nom' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      {user.role === 'admin_coop' &&
                        <th>
                          <button className="filtre-btn" onClick={ordreColonne}>
                            <span id="nomStructure">
                              Structure
                              {(ordreNom !== 'nomStructure' || ordreNom === 'nomStructure' && ordre) &&
                                <i className="ri-arrow-down-s-line chevron icone"></i>
                              }
                              {(ordreNom === 'nomStructure' && !ordre) &&
                                <i className="ri-arrow-up-s-line chevron icone"></i>
                              }
                            </span>
                          </button>
                        </th>
                      }
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="codePostal">
                            Code <br />Postal
                            {(ordreNom !== 'codePostal' || ordreNom === 'codePostal' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            {(ordreNom === 'codePostal' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="datePrisePoste">
                            Date de <br />recrutement
                            {(ordreNom !== 'datePrisePoste' || ordreNom === 'datePrisePoste' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            {(ordreNom === 'datePrisePoste' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne} style={{ width: '104px' }}>
                          <span id="dateFinFormation">
                            Date de fin <br /> de formation
                            {(ordreNom !== 'dateFinFormation' || ordreNom === 'dateFinFormation' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            {(ordreNom === 'dateFinFormation' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <nav className="fr-nav" id="navigation-sort-profil" role="navigation">
                          <ul className="fr-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                              <span >
                                <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreCRA}
                                  aria-controls="menu-userGroupeCra" aria-current="true" id="groupeCRA" onClick={filtreClick}>
                                  GroupeCRA
                                  {basculerFiltreCRA &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  {!basculerFiltreCRA &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={basculerFiltreCRA === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                                  id="menu-userGroupeCra">
                                  <ul className="fr-menu__list">
                                    <li className={filtreGroupeCRA === 'tous' ? 'selected' : ''}>
                                      <button id="tous" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Afficher tous
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe0' ? 'selected' : ''}>
                                      <button id="groupe0" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Groupe 0
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe1' ? 'selected' : ''}>
                                      <button id="groupe1" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Groupe 1
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe2' ? 'selected' : ''}>
                                      <button id="groupe2" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Groupe 2
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe3' ? 'selected' : ''}>
                                      <button id="groupe3" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Groupe 3
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe4' ? 'selected' : ''}>
                                      <button id="groupe4" className="admin-select-option border-no-result" onClick={handleGroupeCra}>
                                        Groupe 4
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreGroupeCRA === 'groupe5' ? 'selected' : ''}>
                                      <button id="groupe5" className="admin-select-option" onClick={handleGroupeCra}>
                                        Groupe 5
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </nav>
                      </th>
                      <th>
                        <nav className="fr-nav" id="navigation-sort-certifie" role="navigation">
                          <ul className="fr-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                              <span >
                                <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreCertifie}
                                  aria-controls="menu-userCertife" aria-current="true" id="certifier" onClick={filtreClick}>
                                  Certification
                                  {basculerFiltreCertifie &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  {!basculerFiltreCertifie &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={basculerFiltreCertifie === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                                  id="menu-userCertife">
                                  <ul className="fr-menu__list">
                                    <li className={filtreCertifie === 'tous' ? 'selected' : ''} >
                                      <button id="tous" className="admin-select-option border-no-result" onClick={handleSortCertifie}>
                                        Afficher tout
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreCertifie === 'active' ? 'selected' : ''}>
                                      <button id="active" className="admin-select-option border-no-result" onClick={handleSortCertifie}>
                                        Profils certifi&eacute;s uniquement
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreCertifie === 'inactive' ? 'selected' : ''}>
                                      <button id="inactive" className="admin-select-option" onClick={handleSortCertifie}>
                                        Profils non-certifi&eacute;s uniquement
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </nav>
                      </th>
                      <th>
                        <nav className="fr-nav" id="navigation-sort-profil" role="navigation">
                          <ul className="fr-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                              <span >
                                <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreProfil}
                                  aria-controls="menu-userActive" aria-current="true" id="activer" onClick={filtreClick}>
                                  Activ&eacute;
                                  {basculerFiltreProfil &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  {!basculerFiltreProfil &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={basculerFiltreProfil === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                                  id="menu-userActive">
                                  <ul className="fr-menu__list">
                                    <li className={filtreProfil === 'tous' ? 'selected' : ''}>
                                      <button id="tous" className="admin-select-option border-no-result" onClick={handleSortProfil}>
                                        Afficher tout
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreProfil === 'active' ? 'selected' : ''}>
                                      <button id="active" className="admin-select-option border-no-result" onClick={handleSortProfil}>
                                        Profils activ&eacute;s uniquement
                                      </button>
                                      <hr className="admin-select-hr" />
                                    </li>
                                    <li className={filtreProfil === 'inactive' ? 'selected' : ''}>
                                      <button id="inactive" className="admin-select-option" onClick={handleSortProfil}>
                                        Profils non-activ&eacute;s uniquement
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </nav>
                      </th>
                      <th>CRA saisis</th>
                      <th>D&eacute;tails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!conseillers?.error && !conseillers?.loading && conseillers?.items && conseillers?.items.data.map((conseiller, idx) => {
                      return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} trClass={idx % 2 === 0 ? 'pair' : 'impair'} role={user.role} />);
                    })
                    }
                    {(conseillers?.items?.data.length === 0 || !conseillers?.items) &&
                      <tr>
                        <td colSpan="9" className="not-found pair">Aucun conseiller trouv&eacute;</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination current={page} pageCount={pageCount} navigate={navigate} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Conseillers;
