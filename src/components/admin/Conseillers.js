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
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);

  console.log(filtreCertifie);
  console.log(filtreProfil);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [basculerFiltreProfil, setBasculerFiltreProfil] = useState(false);
  const [basculerFiltreCertifie, setBasculerFiltreCertifie] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll(page,
      dateDebut,
      dateFin,
      filtreProfil,
      filtreCertifie,
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
    dispatch(conseillerActions.getAll(page, dateDebut, dateFin, filtreProfil, filtreCertifie, ordreNom, ordre ? 1 : -1));
  }, [ordre, ordreNom, filtreProfil, filtreCertifie]);

  const filtreClick = e => {
    if (e.target.id === 'activer') {
      setBasculerFiltreProfil(!basculerFiltreProfil);
      setBasculerFiltreCertifie(false);
    } else {
      setBasculerFiltreCertifie(!basculerFiltreCertifie);
      setBasculerFiltreProfil(false);
    }
  };

  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
  };

  const handleSortProfil = e => {
    dispatch(filtersAndSortsActions.changeProfil(e.target.id));
    setBasculerFiltreProfil(false);
  };

  const handleSortCertifie = e => {
    dispatch(filtersAndSortsActions.changeCertifie(e.target.id));
    setBasculerFiltreCertifie(false);
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
                  <thead className="conseillers-thead">
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
                            Code <br/>Postal
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
                            Date de <br/>recrutement
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
                            Date de fin <br/> de formation
                            { (ordreNom !== 'dateFinFormation' || ordreNom === 'dateFinFormation' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'dateFinFormation' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <nav className="rf-nav" id="navigation-sort-certifie" role="navigation">
                          <ul className="rf-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result rf-nav__item' : 'rf-nav__item'}>
                              <span >
                                <button className="rf-nav__btn admin-select" aria-expanded={basculerFiltreCertifie}
                                  aria-controls="menu-userCertife" aria-current="true" id="certifier" onClick={filtreClick}>
                                  Certification
                                  {basculerFiltreCertifie &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  { !basculerFiltreCertifie &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={ basculerFiltreCertifie === true ? 'rf-collapse--expanded rf-menu' : 'rf-collapse rf-nav--expanded rf-menu'}
                                  id="menu-userCertife">
                                  <ul className="rf-menu__list">
                                    <li className={filtreCertifie === 'tous' ? 'selected' : '' } >
                                      <button id="tous" className="admin-select-option border-no-result" onClick={handleSortCertifie}>
                                        Afficher tout
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li className={filtreCertifie === 'active' ? 'selected' : '' }>
                                      <button id="active" className="admin-select-option border-no-result" onClick={handleSortCertifie}>
                                        Profils certifiés uniquement
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li className={filtreCertifie === 'inactive' ? 'selected' : '' }>
                                      <button id="inactive" className="admin-select-option" onClick={handleSortCertifie}>
                                        Profils non-certifiés uniquement
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
                        <nav className="rf-nav" id="navigation-sort-profil" role="navigation">
                          <ul className="rf-nav__list">
                            <li className={conseillers?.items?.data.length <= 2 ? 'no-result rf-nav__item' : 'rf-nav__item'}>
                              <span >
                                <button className="rf-nav__btn admin-select" aria-expanded={basculerFiltreProfil}
                                  aria-controls="menu-userActive" aria-current="true" id="activer" onClick={filtreClick}>
                                  Activé
                                  {basculerFiltreProfil &&
                                    <i className="ri-arrow-up-s-line chevron icone"></i>
                                  }
                                  { !basculerFiltreProfil &&
                                    <i className="ri-arrow-down-s-line chevron icone"></i>
                                  }
                                </button>
                                <div className={ basculerFiltreProfil === true ? 'rf-collapse--expanded rf-menu' : 'rf-collapse rf-nav--expanded rf-menu'}
                                  id="menu-userActive">
                                  <ul className="rf-menu__list">
                                    <li className={filtreProfil === 'tous' ? 'selected' : '' }>
                                      <button id="tous" className="admin-select-option border-no-result" onClick={handleSortProfil}>
                                        Afficher tout
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li className={filtreProfil === 'active' ? 'selected' : '' }>
                                      <button id="active" className="admin-select-option border-no-result" onClick={handleSortProfil}>
                                        Profils activés uniquement
                                      </button>
                                      <hr className="admin-select-hr"/>
                                    </li>
                                    <li className={filtreProfil === 'inactive' ? 'selected' : '' }>
                                      <button id="inactive" className="admin-select-option" onClick={handleSortProfil}>
                                        Profils non-activés uniquement
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
                    { (conseillers?.items?.data.length === 0 || !conseillers?.items) &&
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
