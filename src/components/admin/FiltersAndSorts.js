import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from './FilterDate';
import { conseillerActions, filtersAndSortsActions, statistiqueActions } from '../../actions';
import { useLocation } from 'react-router';
import download from 'downloadjs';

function currentPage(pagination, location) {
  return pagination?.resetPage === false && location.currentPage !== undefined ? location.currentPage : 1;
}

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
  const exportTerritoireFileBlob = useSelector(state => state.statistique?.exportTerritoireFileBlob);
  const exportTerritoireFileError = useSelector(state => state.statistique?.exportTerritoireFileError);


  const [toggleFiltre, setToggleFiltre] = useState(false);

  const filtreClick = () => {
    setToggleFiltre(!toggleFiltre);
  };

  const hasExportTerritoireFileBlob = () => exportTerritoireFileBlob !== null && exportTerritoireFileBlob !== undefined;
  const hasExportTerritoireFileError = () => exportTerritoireFileError !== undefined && exportTerritoireFileError !== false;

  useEffect(() => {
    if (!hasExportTerritoireFileBlob() || hasExportTerritoireFileError()) {
      return;
    }

    const exportTerritoireFileName = 'export-territoires.csv';
    download(exportTerritoireFileBlob, exportTerritoireFileName);
    dispatch(statistiqueActions.resetExportDonneesTerritoire());

    // TODO: Loading ?
  });

  useEffect(() => {
    if (location.pathname === '/accueil') {
      dispatch(conseillerActions.getAll(0, dateDebut, dateFin, filtreProfil, filtreCertifie, ordreNom, ordre ? 1 : -1));
      resetPage(1);
    }
    if (location.pathname === '/territoires') {
      const page = currentPage(pagination, location);
      dispatch(statistiqueActions.getStatsTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
      resetPage(page);
    }

  }, [dateDebut, dateFin, territoire]);

  const handleTerritoire = e => {
    dispatch(filtersAndSortsActions.changeTerritoire(e.target.id));
  };

  const exportDonneesTerritoire = () => {
    dispatch(statistiqueActions.exportDonneesTerritoire(territoire, dateDebut, dateFin, currentPage(pagination, location), ordreNom, ordre ? 1 : -1));
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--end">
        { location.pathname === '/territoires' &&
          <div className="rf-col-4">
            <nav className="rf-nav" id="navigation-sort" role="navigation">
              <ul className="rf-nav__list">
                <li className="rf-nav__item">
                  <button className="rf-nav__btn admin-select" aria-expanded={toggleFiltre}
                    aria-controls="menu-territoire" aria-current="true" onClick={filtreClick} >
                    { territoire === 'codeDepartement' ? 'Affichage par département' : 'Affichage par région'} &nbsp;
                    { !toggleFiltre &&
                      <i className="ri-arrow-down-s-line chevron icone-2"></i>
                    }
                    { toggleFiltre &&
                      <i className="ri-arrow-up-s-line chevron icone-2"></i>
                    }
                  </button>
                  <div className={ toggleFiltre === true ? 'rf-collapse--expanded rf-menu' : 'rf-collapse rf-nav--expanded rf-menu'}
                    id="menu-territoire">
                    <ul className="rf-menu__list">
                      <li>
                        <button id={ territoire === 'codeDepartement' ? 'codeRegion' : 'codeDepartement'}
                          className="admin-select-option" onClick={handleTerritoire}>
                          { territoire === 'codeDepartement' ? 'Affichage par région' : 'Affichage par département' }
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
          </b>
        </div>
        { location.pathname === '/territoires' &&
          <div className="rf-ml-auto">
            <button className="rf-btn rf-btn--secondary" onClick={exportDonneesTerritoire}>Exporter les données</button>
          </div>
        }
        { (exportTerritoireFileError !== undefined && exportTerritoireFileError !== false) &&
          <span className="labelError">Une erreur est survenue : {exportTerritoireFileError?.toString()}</span>
        }
      </div>
    </div>
  );
}

FiltersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default FiltersAndSorts;
