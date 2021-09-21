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
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll(conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      dateDebut,
      dateFin,
      filtreProfil,
      ordreNom,
      ordre ? 1 : -1));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  useEffect(() => {
    dispatch(conseillerActions.getAll(page - 1, dateDebut, dateFin, filtreProfil, ordreNom, ordre ? 1 : -1));
  }, [ordre, ordreNom]);

  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
  };

  const handleSort = e => {
    console.log(e.target.id);
    dispatch(filtersAndSortsActions.changeProfil(ordre));
    dispatch(conseillerActions.getAll(0, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
  };

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage}/>
        <div className="rf-container rf-mt-2w">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12">
              <div className="rf-table">
                <table >
                  <thead>
                    <tr>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="prenom">
                            Prénom
                            { (ordreNom !== 'prenom' || ordreNom === 'prenom' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            { (ordreNom === 'prenom' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="nom">
                            Nom
                            { (ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            { (ordreNom === 'nom' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="nomStructure">
                            Structure
                            { (ordreNom !== 'nomStructure' || ordreNom === 'nomStructure' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            { (ordreNom === 'nomStructure' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="codePostal">
                            Code Postal
                            { (ordreNom !== 'codePostal' || ordreNom === 'codePostal' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'codePostal' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="datePrisePoste">
                            Date de recrutement
                            { (ordreNom !== 'datePrisePoste' || ordreNom === 'datePrisePoste' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'datePrisePoste' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="dateFinFormation">
                            Date de fin de formation
                            { (ordreNom !== 'dateFinFormation' || ordreNom === 'dateFinFormation' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-3"></i>
                            }
                            { (ordreNom === 'dateFinFormation' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-3"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn">
                          <span id="certifie" onClick={ordreColonne}>
                            Certification
                            { (ordreNom !== 'certifie' || ordreNom === 'certifie' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            { (ordreNom === 'certifie' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <nav className="rf-nav" id="navigation-sort" role="navigation">
                          <ul className="rf-nav__list">
                            <li className="rf-nav__item">
                              <span >
                                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-userActive" aria-current="true" >
                                  Activé
                                  <i className="ri-arrow-down-s-line chevron"></i>
                                </button>
                                <div className="rf-collapse rf-menu" id="menu-userActive">
                                  <ul className="rf-menu__list">
                                    <li>
                                      <button id="all" className="admin-select-option" onClick={handleSort}>
                                        Afficher tout
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li>
                                      <button id="active" className="admin-select-option" onClick={handleSort}>
                                        Profil activé uniquement
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li>
                                      <button id="inactive" className="admin-select-option" onClick={handleSort}>
                                        Profil non-activé uniquement
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </nav>
                      </th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!conseillers?.error && !conseillers?.loading && conseillers?.items && conseillers?.items.data.map((conseiller, idx) => {
                      return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                    })
                    }
                    {!conseillers?.items &&
                    <tr>
                      <td colSpan="9" className="not-found pair">Aucun conseiller trouvé</td>
                    </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination current={page} pageCount={pageCount} navigate={navigate}/>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Conseillers;
