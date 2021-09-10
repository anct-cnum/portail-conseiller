import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from './FilterDate';
import { conseillerActions, filtersAndSortsActions, statistiqueActions } from '../../actions';
import { useLocation } from 'react-router';
function FiltersAndSorts({ resetPage }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [filterSort, setFilterSort] = useState(1);
  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let territoire = useSelector(state => state.filtersAndSorts?.territoire);

  const handleSort = e => {
    let ordre = 1;
    if (e.target.id === 'filtre-premier') {
      ordre = -1;
    }
    setFilterSort(ordre);
    dispatch(filtersAndSortsActions.changeProfil(ordre));
    dispatch(conseillerActions.getAll(0, dateDebut, dateFin, ordre));
    resetPage(1);
  };

  useEffect(() => {
    if (location.pathname === '/accueil') {
      dispatch(conseillerActions.getAll(0, dateDebut, dateFin, filterSort));
      resetPage(1);
    }
    if (location.pathname === '/territoires') {
      dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, 0));
      resetPage(1);
    }

  }, [dateDebut, dateFin]);

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        { location.pathname === '/territoires' &&
          <div className="rf-col-4">
            <nav className="rf-nav" id="navigation-sort" role="navigation">
              <ul className="rf-nav__list">
                <li className="rf-nav__item">
                  <span className={ filterSort === 1 ? '' : 'hide'}>
                    <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-premier" aria-current="true" >
                      Affichage par département&nbsp;
                      <i className="ri-arrow-down-s-line chevron"></i>
                    </button>
                  </span>
                </li>
                <li className={ filterSort === -1 ? 'rf-nav__item' : 'rf-nav__item hide'}>
                  <button className="rf-nav__btn admin-select" style={{ 'marginLeft': '-20px' }} aria-expanded="false" aria-controls="menu-dernier"
                    aria-current="true">
                    &nbsp;
                    <i className="ri-arrow-down-s-line chevron"></i>
                  </button>
                  <div className="rf-collapse rf-menu" id="menu-dernier">
                    <ul className="rf-menu__list">
                      <li> <button id="filtre-dernier" className="admin-select-option" onClick={handleSort}>Derniers utilisateurs enregistrés</button></li>
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
