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
  const location = useLocation();
  const territoires = useSelector(state => state.statistique.statsTerritoires);
  const statsTerritoiresLoading = useSelector(state => state.statistique.statsTerritoiresLoading);
  const statsTerritoiresError = useSelector(state => state.statistique.statsTerritoiresError);
  const pagination = useSelector(state => state.pagination);

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let filtreTerritoire = useSelector(state => state.filtersAndSorts?.territoire);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);

  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(statistiqueActions.getStatsTerritoires(filtreTerritoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
  };

  useEffect(() => {
    if (territoires?.items) {
      const count = territoires.items.limit ? Math.floor(territoires.items.total / territoires.items.limit) : 0;
      setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1);
    }
  }, [territoires]);

  useEffect(() => {

    const page = (pagination?.resetPage === false && location.currentPage !== undefined) ? location.currentPage : 1;
    dispatch(statistiqueActions.getStatsTerritoires(filtreTerritoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));

  }, [ordre, ordreNom]);

  const ordreColonne = e => {
    dispatch(filtersAndSortsActions.changeOrdre(e.target.id));
  };

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage}/>
        <div className="fr-container fr-mt-2w">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12">
              <div className="fr-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne}>
                          <span id="code" className="name-column-table">Code
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
                          <span id="nom name-column-table" className="name-column-table">Nom
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
                        <span id="personnesAccompagnees">CRA enregistr&eacute;s</span>
                      </th>
                      <th>
                        <span id="personnesAccompagnees">Personnes accompagn&eacute;es</span>
                      </th>
                      <th>
                        <button className="filtre-btn" onClick={ordreColonne} style={{ width: '140px' }}>
                          <span id="nombreConseillersCoselec" className="name-column-table">Dotation de conseillers
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
                          <span id="cnfsActives" className="name-column-table">CnFS activ&eacute;s
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
                        <button className="filtre-btn" onClick={ordreColonne} style={{ width: '190px' }}>
                          <span id="cnfsInactives" className="name-column-table">CnFS en attente d&rsquo;activation
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
                        { filtreTerritoire === 'codeRegion' &&
                          <button className="filtre-btn">
                            <span id="personnesAccompagnees">Taux d&rsquo;activation</span>
                          </button>
                        }
                        { filtreTerritoire === 'codeDepartement' &&
                          <button className="filtre-btn" onClick={ordreColonne}>
                            <span id="tauxActivation" className="name-column-table">Taux d&rsquo;activation
                              { (ordreNom !== 'tauxActivation' || ordreNom === 'tauxActivation' && ordre) &&
                                <i className="ri-arrow-down-s-line chevron icone-2"></i>
                              }
                              { (ordreNom === 'tauxActivation' && !ordre) &&
                                <i className="ri-arrow-up-s-line chevron icone-2"></i>
                              }
                            </span>
                          </button>
                        }
                      </th>
                      <th>Afficher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!statsTerritoiresError && !statsTerritoiresLoading && territoires?.items?.data && territoires?.items.data.map((territoire, idx) => {
                      return (<Territoire key={idx} territoire={territoire} filtreTerritoire={filtreTerritoire}
                        currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                    })
                    }
                    { (!territoires?.items || !territoires?.items?.data) &&
                      <tr>
                        <td colSpan="9" className="not-found pair">
                          {filtreTerritoire === 'codeDepartement' ? 'Aucun d&eacute;partement ' : 'Aucune r&eacute;gion ' } trouv&eacute;
                        </td>
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
      <Footer/>
    </>
  );
}

export default Territoires;
