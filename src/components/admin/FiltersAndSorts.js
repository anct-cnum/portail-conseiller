import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from './FilterDate';
import { conseillerActions, filtersAndSortsActions, statistiqueActions } from '../../actions';
import { useLocation } from 'react-router';
function FiltersAndSorts({ resetPage }) {
  const location = useLocation();
  const dispatch = useDispatch();

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let territoire = useSelector(state => state.filtersAndSorts?.territoire);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);
  let filtreProfil = useSelector(state => state.filtersAndSorts?.profil);
  let filtreCertifie = useSelector(state => state.filtersAndSorts?.certifie);
  const pagination = useSelector(state => state.pagination);

  useEffect(() => {
    if (location.pathname === '/accueil') {
      dispatch(conseillerActions.getAll(0, dateDebut, dateFin, filtreProfil, filtreCertifie, ordreNom, ordre ? 1 : -1));
      resetPage(1);
    }
    if (location.pathname === '/territoires') {
      const page = (pagination?.resetPage === false && location.currentPage !== undefined) ? location.currentPage : 1;
      dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
      resetPage(page);
    }

  }, [dateDebut, dateFin, territoire]);

  const handleTerritoire = e => {
    dispatch(filtersAndSortsActions.changeTerritoire(e.target.id));
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        { location.pathname === '/territoires' &&
          <div className="rf-col-4">
            <nav className="rf-nav" id="navigation-sort" role="navigation">
              <ul className="rf-nav__list">
                <li className="rf-nav__item">
                  <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-territoire" aria-current="true" >
                    { territoire === 'departement' ? 'Affichage par département' : 'Affichage par région'} &nbsp;
                    <i className="ri-arrow-down-s-line chevron"></i>
                  </button>
                  <div className="rf-collapse rf-menu" id="menu-territoire">
                    <ul className="rf-menu__list">
                      <li>
                        <button id={ territoire === 'departement' ? 'region' : 'departement'}
                          className="admin-select-option" onClick={handleTerritoire}>
                          { territoire === 'departement' ? 'Affichage par région' : 'Affichage par département' }
                        </button></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        }

        <div className="rf-col-4">
          <b>
            <span>Période du &nbsp;</span>
            <span id="span-datePickerDebut" >
              <FilterDate initDate={dateDebut} idDate="datePickerDebut" nomDate="datePickerDebut"/>
            </span>
            <span id="span-datePickerFin" >
              &nbsp;au&nbsp;
              <FilterDate initDate={dateFin} idDate="datePickerFin" nomDate="datePickerFin"/>
            </span>
            &nbsp;
            <i className="ri-arrow-down-s-line chevron"></i>
          </b>
        </div>
      </div>
    </div>
  );
}

FiltersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default FiltersAndSorts;
