import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { conseillerActions, filtersAndSortsActions } from '../../actions';
import Conseiller from './Conseiller';
import FiltersAndSorts from '../admin/FiltersAndSorts';
import Pagination from '../admin/Pagination';

import Footer from '../Footer';

function Conseillers() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(state => state?.authentication?.user?.user);
  const conseillers = useSelector(state => state?.conseiller?.subordonnes?.conseillers);
  const pagination = useSelector(state => state.pagination);

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let filtreProfil = useSelector(state => state.filtersAndSorts?.profil);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);

  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [basculerFiltreProfil, setBasculerFiltreProfil] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getConseillersSubordonnes(page,
      dateDebut,
      dateFin,
      filtreProfil,
      ordreNom,
      ordre ? 1 : -1,
      user.entity.$id
    ));
  };

  const filtreClick = e => {
    if (e.target.id === 'activer') {
      setBasculerFiltreProfil(!basculerFiltreProfil);
    }
    setRefresh(true);
  };
  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
    setRefresh(true);
  };

  const handleSortProfil = e => {
    dispatch(filtersAndSortsActions.changeProfil(e.target.id));
    setBasculerFiltreProfil(false);
    setRefresh(true);
  };

  useEffect(() => {
    if (!conseillers || refresh) {
      dispatch(conseillerActions.getConseillersSubordonnes(page,
        dateDebut,
        dateFin,
        filtreProfil,
        ordreNom,
        ordre ? 1 : -1,
        user.entity.$id
      ));
      setRefresh(false);
    } else {
      const count = Math.floor(conseillers.total / conseillers.limit);
      setPageCount(conseillers.total % conseillers.limit === 0 ? count : count + 1);
    }
    dispatch(conseillerActions.resetIsSubordonne());
  }, [conseillers, refresh]);

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage} user={user} />
        <div className="rf-container rf-mt-2w">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12">
              <div className="rf-table" style={{ overflow: 'auto' }}>
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
                        <nav className="rf-nav" id="navigation-sort-profil" role="navigation">
                          <ul className="rf-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result rf-nav__item' : 'rf-nav__item'}>
                              <span >
                                <button className="rf-nav__btn admin-select" aria-expanded={basculerFiltreProfil}
                                  aria-controls="menu-userActive" aria-current="true" id="activer" onClick={filtreClick}>
                                  Activ&eacute;
                                  {basculerFiltreProfil &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  {!basculerFiltreProfil &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={basculerFiltreProfil === true ? 'rf-collapse--expanded rf-menu' : 'rf-collapse rf-nav--expanded rf-menu'}
                                  id="menu-userActive">
                                  <ul className="rf-menu__list">
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
                    {!conseillers?.error && !conseillers?.loading && conseillers?.data && conseillers?.data.map((conseiller, idx) => {
                      return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} trClass={idx % 2 === 0 ? 'pair' : 'impair'} role={user.role} />);
                    })
                    }
                    {(conseillers?.data.length === 0 || !conseillers?.data) &&
                      <tr>
                        <td colSpan="8" className="not-found pair">Aucun conseiller trouv&eacute;</td>
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
