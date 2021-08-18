import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { conseillerActions } from '../../actions';
import Conseiller from './Conseiller';
import Pagination from './Pagination';
import Footer from '../Footer';

function Welcome() {

  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseiller);
  const pagination = useSelector(state => state.pagination);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll(conseillers.items ? (page - 1) * conseillers.items.limit : 0));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  useEffect(() => {
    dispatch(conseillerActions.getAll(page));
  }, []);

  console.log(conseillers);
  return (
    <>
      <div className="welcome">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-4 rf-mb-md-6w">Derniers utilisateurs enregistrés</div>
            <div className="rf-col-4 rf-mb-md-6w">Période du 23/09/2021 au 23/10/2021</div>
            <div className="rf-col-4 rf-mb-md-6w">Afficher tous les profils</div>

            <div className="rf-col-12 rf-mb-md-6w">
              <table className="rf-table">
                <thead>
                  <tr className="admin-table">
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Structure</th>
                    <th>Code Postal</th>
                    <th>Date de recrutement</th>
                    <th>Date de fin de formation</th>
                    <th>Certification</th>
                    <th>Activé</th>
                    <th>Afficher</th>
                  </tr>
                </thead>
                <tbody>
                  {!conseillers?.error && !conseillers?.loading && conseillers?.items && conseillers?.items.data.map((conseiller, idx) => {
                    return (<Conseiller key={idx} conseiller={conseiller} currentPage={page}/>);
                  })
                  }
                </tbody>
              </table>
            </div>
            <Pagination current={page} pageCount={pageCount} navigate={navigate} />
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Welcome;
