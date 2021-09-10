import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { conseillerActions } from '../../actions';
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
  let filtreOrdre = useSelector(state => state.filtersAndSorts.ordre);
  let filtreProfil = useSelector(state => state.filtersAndSorts?.profil);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll(conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      dateDebut,
      dateFin,
      filtreOrdre,
      filtreProfil));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  useEffect(() => {
    dispatch(conseillerActions.getAll(page, dateDebut, dateFin, filtreOrdre, filtreProfil));
  }, []);

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
                        <button id="prenom" className="filtre-btn">
                          <span>
                            Prénom
                            <i className="ri-arrow-down-s-line chevron icone"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="nom" className="filtre-btn">
                          <span>Nom
                            <i className="ri-arrow-down-s-line chevron icone"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="structure" className="filtre-btn">
                          <span>Structure
                            <i className="ri-arrow-down-s-line chevron icone"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="codePostal" className="filtre-btn">
                          <span>Code Postal
                            <i className="ri-arrow-down-s-line chevron icone-2"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="dateDeRecrutement" className="filtre-btn">
                          <span>Date de recrutement
                            <i className="ri-arrow-down-s-line chevron icone-2"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="dateFinFormation" className="filtre-btn">
                          <span>Date de fin de formation
                            <i className="ri-arrow-down-s-line chevron icone-3"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="certifie" className="filtre-btn">
                          <span>Certification
                            <i className="ri-arrow-down-s-line chevron icone"></i>
                          </span>
                        </button>
                      </th>
                      <th>
                        <button id="userActive" className="filtre-btn">
                          <span>Activé
                            <i className="ri-arrow-down-s-line chevron icone"></i>
                          </span>
                        </button>
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
