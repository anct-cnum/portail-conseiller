import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { statistiqueActions } from '../../actions';
import Territoire from './Territoire';
import Pagination from './Pagination';
import FiltersAndSorts from './FiltersAndSorts';
import Footer from '../Footer';

function Territoires() {

  const dispatch = useDispatch();

  const territoires = useSelector(state => state.statistique);
  const pagination = useSelector(state => state.pagination);

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let territoire = useSelector(state => state.filtersAndSorts?.territoire);

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
    dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, page));
  }, []);

  return (
    <>
      <div className="conseillers">
        <FiltersAndSorts resetPage={setPage}/>
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12">
              <div className="rf-table">
                <table>
                  <thead>
                    <tr><th colSpan="9" className="th-nopadding"><hr className="th-hr-top"/></th></tr>
                    <tr>
                      <th>Code&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Nom&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Personnes accompagnées&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>dotation de conseillers&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>CnFS activé sur l&rsquo;espace coop&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>CnFS en attente d&rsquo;activation&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Taux d&rsquo;activation&nbsp;
                        <i className="ri-arrow-down-s-line chevron"></i>
                      </th>
                      <th>Afficher</th>
                    </tr>
                    <tr><th colSpan="9" className="th-nopadding"><hr className="th-hr-bottom" /></th></tr>
                  </thead>
                  <tbody>
                    {!territoires?.error && !territoires?.loading && territoires?.items && territoires?.items.data.map((territoire, idx) => {
                      return (<Territoire key={idx} territoire={territoire} currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
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

export default Territoires;
