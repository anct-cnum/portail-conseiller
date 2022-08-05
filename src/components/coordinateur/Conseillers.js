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

  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
    setRefresh(true);
  };

  const handleSortProfil = e => {
    dispatch(filtersAndSortsActions.changeProfil(e.target.id));
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
        <div className="fr-container fr-mt-2w">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12">
              <div className="fr-table" >
                <table >
                  <thead className="conseillers-coordo-thead">
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
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="codePostal">
                            Code Postal
                            {(ordreNom !== 'codePostal' || ordreNom === 'codePostal' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            {(ordreNom === 'codePostal' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="datePrisePoste">
                            Date de recrutement
                            {(ordreNom !== 'datePrisePoste' || ordreNom === 'datePrisePoste' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            {(ordreNom === 'datePrisePoste' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th style={{ 'width': '257px' }}>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="dateFinFormation">
                            Date de fin de formation
                            {(ordreNom !== 'dateFinFormation' || ordreNom === 'dateFinFormation' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            {(ordreNom === 'dateFinFormation' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <nav className="fr-nav" role="navigation" aria-label="Menu principal">
                          <ul className="fr-nav__list">
                            <li className="fr-nav__item">
                              <button className="fr-nav__btn" aria-expanded="false" aria-controls="menu-userActive" aria-current="true">
                                Activ&eacute;
                              </button>
                              <div className="fr-collapse fr-menu" id="menu-userActive">
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
                      return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} role={user.role} />);
                    })
                    }
                    {(conseillers?.data.length === 0 || !conseillers?.data) &&
                      <tr>
                        <td colSpan="8" className="not-found">Aucun conseiller trouv&eacute;</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {pageCount > 0 &&
              <Pagination current={page} pageCount={pageCount} navigate={navigate} />
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Conseillers;
