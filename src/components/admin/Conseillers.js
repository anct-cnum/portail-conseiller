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
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12">
              <div className="rf-table">
                <table >
                  <thead>
                    <tr><th colSpan="9" className="th-nopadding"><hr className="th-hr-top"/></th></tr>
                    <tr>
                      <th>Prénom&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Nom&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Structure&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Code Postal&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Date de recrutement&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Date de fin de formation&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Certification&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Activé&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Détails</th>
                    </tr>
                    <tr><th colSpan="9" className="th-nopadding"><hr className="th-hr-bottom" /></th></tr>
                  </thead>
                  <tbody>
                    {!conseillers?.error && !conseillers?.loading && conseillers?.items && conseillers?.items.data.map((conseiller, idx) => {
                      return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                    })
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
