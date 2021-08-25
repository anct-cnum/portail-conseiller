import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from './FilterDate';
import { conseillerActions } from '../../actions';
function FiltersAndSorts({ resetPage }) {

  const dispatch = useDispatch();
  const [filterSort, setFilterSort] = useState(1);
  const [filterProfils, setFilterProfils] = useState({
    tous: true,
    inactifs: false,
    actifs: false,
    certifies: false,
  });

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);

  const handleSort = e => {
    if (e.target.id === 'filtre-premier') {
      setFilterSort(-1);
    } else {
      setFilterSort(1);
    }

    dispatch(conseillerActions.getAll(1, dateDebut, dateFin, filterProfils, filterSort));
    resetPage(1);
  };

  const handleFilterProfils = e => {
    let filtre = {
      tous: true,
      inactifs: false,
      actifs: false,
      certifies: false,
    };
    switch (e.target.id) {
      case 'inactifs':
        filtre = {
          tous: false,
          inactifs: true,
          actifs: false,
          certifies: false,
        };
        break;
      case 'actifs':
        filtre = {
          tous: false,
          inactifs: false,
          actifs: true,
          certifies: false,
        };
        break;
      case 'certifies':
        filtre = {
          tous: false,
          inactifs: false,
          actifs: false,
          certifies: true,
        };
        break;
      default:
        break;
    }
    setFilterProfils(filtre);

    dispatch(conseillerActions.getAll(1, dateDebut, dateFin, filterProfils, filterSort));
    resetPage(1);
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-4 rf-mb-4w">
          <nav className="rf-nav" role="navigation">
            <ul className="rf-nav__list">
              <li className={ filterSort === 1 ? 'rf-nav__item' : 'rf-nav__item hide' }>
                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-premier" aria-current="true">
                  Derniers utilisateurs enregistrés&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
                </button>
                <div className="rf-collapse rf-menu" id="menu-premier">
                  <ul className="rf-menu__list">
                    <li> <button id="filtre-premier" className="admin-select-option" onClick={handleSort}>Utilisateurs enregistrés en premier</button></li>
                  </ul>
                </div>
              </li>
              <li className={ filterSort === -1 ? 'rf-nav__item' : 'rf-nav__item hide'}>
                <button className="rf-nav__btn admin-select" style={{ 'marginLeft': '-7px' }} aria-expanded="false" aria-controls="menu-dernier"
                  aria-current="true">
                  Utilisateurs enregistrés en premier&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
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

        <div className="rf-col-4 rf-mb-md-6w">
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
            <i className="ri-arrow-down-s-line ri-2x chevron"></i>
          </b>
        </div>

        <div className="rf-col-4 rf-mb-md-6w">
          <nav className="rf-nav" role="navigation">
            <ul className="rf-nav__list">
              <li className={ filterProfils.tous ? 'rf-nav__item' : 'rf-nav__item hide' }>
                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-tous-profils" aria-current="true">
                  Afficher tous les profils&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
                </button>
                <div className="rf-collapse rf-menu" id="menu-tous-profils">
                  <ul className="rf-menu__list admin-select-options">
                    <li className="rf-mt-1w rf-mb-2w">
                      <button id="inactifs" onClick={handleFilterProfils}>
                        Afficher uniquement les profils non-activés
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="actifs" onClick={handleFilterProfils}>
                        Afficher uniquement les profils activés
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="certifies" onClick={handleFilterProfils}>
                        Afficher uniquement les profils certifiés
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={ filterProfils.inactifs ? 'rf-nav__item' : 'rf-nav__item hide' }>
                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-profils-inactifs" aria-current="true">
                  Afficher uniquement les profils non-activés&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
                </button>
                <div className="rf-collapse rf-menu" id="menu-profils-inactifs">
                  <ul className="rf-menu__list admin-select-options">
                    <li className="rf-mt-1w rf-mb-2w">
                      <button id="tous" onClick={handleFilterProfils}>
                        Afficher tous les profils
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="actifs" onClick={handleFilterProfils}>
                        Afficher uniquement les profils activés
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="certifies" onClick={handleFilterProfils}>
                        Afficher uniquement les profils certifiés
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={ filterProfils.actifs ? 'rf-nav__item' : 'rf-nav__item hide'}>
                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-profils-actifs"
                  aria-current="true">
                  Afficher uniquement les profils activés&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
                </button>
                <div className="rf-collapse rf-menu" id="menu-profils-actifs">
                  <ul className="rf-menu__list admin-select-options">
                    <li className="rf-mt-1w rf-mb-2w">
                      <button id="tous" onClick={handleFilterProfils}>
                        Afficher tous les profils
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="inactifs" onClick={handleFilterProfils}>
                          Afficher uniquement les profils non-activés
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="certifies" onClick={handleFilterProfils}>
                        Afficher uniquement les profils certifiés
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={ filterProfils.certifies ? 'rf-nav__item' : 'rf-nav__item hide'}>
                <button className="rf-nav__btn admin-select" aria-expanded="false" aria-controls="menu-profils-certifies"
                  aria-current="true">
                  Afficher uniquement les profils certifiés&nbsp;
                  <i className="ri-arrow-down-s-line ri-2x chevron"></i>
                </button>
                <div className="rf-collapse rf-menu" id="menu-profils-certifies">
                  <ul className="rf-menu__list admin-select-options">
                    <li className="rf-mt-1w rf-mb-2w">
                      <button id="tous" onClick={handleFilterProfils}>
                        Afficher tous les profils
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="inactifs" onClick={handleFilterProfils}>
                        Afficher uniquement les profils non-activés
                      </button>
                    </li>
                    <li className="rf-mb-2w">
                      <button id="actifs" onClick={handleFilterProfils}>
                        Afficher uniquement les profils activés
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

FiltersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default FiltersAndSorts;
