import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filtersAndSortsActions, statistiqueActions } from '../../actions';
import Territoire from './Territoire';
import Pagination from './Pagination';
import FiltersAndSorts from './FiltersAndSorts';
import Footer from '../Footer';

function Territoires() {

  const dispatch = useDispatch();

  const territoires = useSelector(state => state.statistique.statsTerritoires);
  const pagination = useSelector(state => state.pagination);

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let territoire = useSelector(state => state.filtersAndSorts?.territoire);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, page));
  };

  useEffect(() => {
    if (territoires?.items) {
      const count = Math.floor(territoires.items.total / territoires.items.limit);
      setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1);
    }
  }, [territoires]);

  useEffect(() => {
    dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
  }, [ordre, ordreNom]);

  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
  };

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage}/>
        <div className="rf-container rf-mt-2w">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12">
              <div className="rf-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="code" >Code
                            { (ordreNom !== 'code' || ordreNom === 'code' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone"></i>
                            }
                            { (ordreNom === 'code' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="nom">Nom
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
                          <span id="personnesAccompagnees">Personnes accompagnées
                            { (ordreNom !== 'personnesAccompagnees' || ordreNom === 'personnesAccompagnees' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'personnesAccompagnees' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="nombreConseillersCoselec">Dotation de conseillers
                            { (ordreNom !== 'nombreConseillersCoselec' || ordreNom === 'nombreConseillersCoselec' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'nombreConseillersCoselec' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="cnfsActives">CnFS activé sur l&rsquo;espace coop
                            { (ordreNom !== 'cnfsActives' || ordreNom === 'cnfsActives' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'cnfsActives' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="cnfsInactives">CnFS en attente d&rsquo;activation
                            { (ordreNom !== 'cnfsInactives' || ordreNom === 'cnfsInactives' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-3"></i>
                            }
                            { (ordreNom === 'cnfsInactives' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-3"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="tauxActivation">Taux d&rsquo;activation
                            { (ordreNom !== 'tauxActivation' || ordreNom === 'tauxActivation' && ordre) &&
                              <i className="ri-arrow-down-s-line chevron icone-2"></i>
                            }
                            { (ordreNom === 'tauxActivation' && !ordre) &&
                              <i className="ri-arrow-up-s-line chevron icone-2"></i>
                            }
                          </span>
                        </button>
                      </th>
                      <th>Afficher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!territoires?.error && !territoires?.loading && territoires?.items && territoires?.items.data.map((territoire, idx) => {
                      return (<Territoire key={idx} territoire={territoire} currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                    })
                    }
                    { !territoires?.items &&
                      <tr>
                        <td colSpan="9" className="not-found pair">Aucun territoire trouvé</td>
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

export default Territoires;
