import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from './FilterDate';
import { conseillerActions, filtersAndSortsActions, statistiqueActions } from '../../actions';
import { useLocation } from 'react-router';
import download from 'downloadjs';
import Spinner from 'react-loader-spinner';
import codeRegions from './../../data/code_region.json';

function currentPage(pagination, location) {
  return pagination?.resetPage === false && location.currentPage !== undefined ? location.currentPage : 1;
}

function FiltersAndSorts({ resetPage, user }) {
  const location = useLocation();
  const dispatch = useDispatch();

  let dateDebut = useSelector(state => state.filtersAndSorts?.dateDebut);
  let dateFin = useSelector(state => state.filtersAndSorts?.dateFin);
  let territoire = useSelector(state => state.filtersAndSorts?.territoire);
  let ordre = useSelector(state => state.filtersAndSorts?.ordre);
  let ordreNom = useSelector(state => state.filtersAndSorts?.ordreNom);
  let filtreProfil = useSelector(state => state.filtersAndSorts?.profil);
  let filtreCertifie = useSelector(state => state.filtersAndSorts?.certifie);
  let filtreGroupeCRA = useSelector(state => state.filtersAndSorts?.groupeCRA);
  let filtreParNom = useSelector(state => state.filtersAndSorts?.nom);
  let filtreParStructureId = useSelector(state => state.filtersAndSorts?.structureId);
  let searchInput = useSelector(state => state.filtersAndSorts?.searchInput);
  let filtreRegion = useSelector(state => state.filtersAndSorts?.region);
  const pagination = useSelector(state => state.pagination);
  const exportTerritoireFileBlob = useSelector(state => state.statistique?.exportTerritoireFileBlob);
  const exportTerritoireFileError = useSelector(state => state.statistique?.exportTerritoireFileError);
  const exportCnfsFileBlob = useSelector(state => state.conseiller?.exportCnfsFileBlob);
  const exportCnfsFileError = useSelector(state => state.conseiller?.exportCnfsFileError);
  const downloading = useSelector(state => state.statistique?.downloading);
  const downloadingExportCnfs = useSelector(state => state.conseiller?.downloadingExportCnfs);
  const conseillerBeforeFilter = useSelector(state => state.conseiller?.conseillersBeforeFilter);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);

  const [toggleFiltre, setToggleFiltre] = useState(false);

  const filtreClick = () => {
    setToggleFiltre(!toggleFiltre);
  };

  const has = value => value !== null && value !== undefined;

  useEffect(() => {
    if (!has(exportTerritoireFileBlob) || has(exportTerritoireFileError)) {
      return;
    }

    download(exportTerritoireFileBlob, 'export-territoires.csv');
    dispatch(statistiqueActions.resetExportDonneesTerritoire());
  }, [exportTerritoireFileBlob, exportTerritoireFileError]);

  useEffect(() => {
    if (!has(exportCnfsFileBlob) || has(exportCnfsFileError)) {
      return;
    }

    download(exportCnfsFileBlob, 'export-cnfs.csv');
    dispatch(conseillerActions.resetExportDonneesCnfs());
  }, [exportCnfsFileBlob, exportCnfsFileError]);

  useEffect(() => {
    if (location.pathname === '/accueil') {
      if (user?.role !== 'coordinateur_coop') {
        dispatch(conseillerActions.getAll(0, dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom,
          ordreNom, ordre ? 1 : -1, user?.role === 'structure_coop' ? user?.entity.$id : null, filtreRegion));
      } else {
        dispatch(conseillerActions.getConseillersSubordonnes(0, dateDebut, dateFin, filtreProfil, ordreNom, ordre ? 1 : -1, user.entity.$id));
      }

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
    setToggleFiltre(false);
  };

  const exportDonneesTerritoire = () => {
    dispatch(statistiqueActions.exportDonneesTerritoire(territoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
  };

  const exportDonneesCnfs = () => {
    if (user?.role === 'coordinateur_coop') {
      dispatch(conseillerActions.exportDonneesSubordonnes(dateDebut, dateFin, filtreProfil,
        ordreNom, ordre ? 1 : -1, user?.entity.$id));
    } else {
      dispatch(conseillerActions.exportDonneesCnfs(dateDebut, dateFin, filtreProfil, filtreCertifie, filtreGroupeCRA, filtreParNom,
        ordreNom, ordre ? 1 : -1, user?.role === 'structure_coop' ? user?.entity.$id : filtreParStructureId, filtreRegion));
    }
  };

  const selectFiltreRegion = e => dispatch(filtersAndSortsActions.changeFiltreRegion(e.target.value));

  const formatNomStructure = nomStructure => nomStructure
  .replaceAll('.', '')
  .replaceAll('-', ' ')
  .replaceAll('à', 'a')
  .replaceAll('ù', 'u')
  .replaceAll('ç', 'c')
  .replaceAll('è', 'e')
  .replaceAll('é', 'e');

  const rechercheParNomOuNomStructure = e => {
    const value = (e.key === 'Enter' ? e.target?.value : e.target.previousSibling?.value) ?? '';
    const conseillerByStructure = conseillerBeforeFilter?.find(conseiller =>
      formatNomStructure(conseiller?.nomStructure?.toLowerCase()) === formatNomStructure(value?.toLowerCase()));
    if (conseillerByStructure) {
      dispatch(filtersAndSortsActions.changeStructureId(conseillerByStructure?.structureId));
    } else {
      dispatch(filtersAndSortsActions.changeNom(value));
    }
    return dispatch(filtersAndSortsActions.saveSearchInput(value, filtreRegion));
  };

  function handleKeyDown(e) {
    if (e.target.value === '') {
      dispatch(filtersAndSortsActions.changeNom(e.target.value));
    }
    if (e.key === 'Enter' || (e.type === 'click' && searchInput === '')) {
      rechercheParNomOuNomStructure(e);
    }
    return;
  }

  return (
    <div className="fr-container">
      {user?.role === 'admin_coop' &&
        <div className="fr-grid-row">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>Tous</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.code} - {region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={searchInput ?? ''} onKeyDown={handleKeyDown}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" onChange={handleKeyDown} />
              <button className="fr-btn" onClick={rechercheParNomOuNomStructure} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      }
      <div className="fr-grid-row fr-grid-row--end">
        { location.pathname === '/territoires' &&
          <div className="fr-col-lg-6 fr-col-md-4 fr-col-12 fr-mb-1w">
            <nav className="fr-nav" id="navigation-sort" role="navigation">
              <ul className="fr-nav__list">
                <li className="fr-nav__item">
                  <button className="fr-nav__btn admin-select" aria-expanded={toggleFiltre}
                    aria-controls="menu-territoire" aria-current="true" onClick={filtreClick} >
                    { territoire === 'codeDepartement' ? <>Affichage par d&eacute;partement</> : <>Affichage par r&eacute;gion</>} &nbsp;
                  </button>
                  <div className={ toggleFiltre === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                    id="menu-territoire">
                    <ul className="fr-menu__list">
                      <li>
                        <button id={ territoire === 'codeDepartement' ? 'codeRegion' : 'codeDepartement'}
                          className="admin-select-option" onClick={handleTerritoire}>
                          { territoire === 'codeDepartement' ? <>Affichage par r&eacute;gion</> : <>Affichage par d&eacute;partement</> }
                        </button></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        }

        <div className="fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
          <b>
            <span>P&eacute;riode du &nbsp;</span>
            <span id="span-datePickerDebut" >
              <FilterDate initDate={dateDebut} idDate="datePickerDebut" nomDate="datePickerDebut"/>
            </span>
            <span id="span-datePickerFin" >
              &nbsp;au&nbsp;
              <FilterDate initDate={dateFin} idDate="datePickerFin" nomDate="datePickerFin"/>
            </span>
          </b>
        </div>
        {location.pathname === '/accueil' &&
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesCnfs}>Exporter les donn&eacute;es</button>
          </div>
        }
        { location.pathname === '/territoires' &&
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesTerritoire}>Exporter les donn&eacute;es</button>
          </div>
        }
        { (exportTerritoireFileError !== undefined && exportTerritoireFileError !== false) &&
          <span className="labelError">Une erreur est survenue : {exportTerritoireFileError}</span>
        }
      </div>
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={downloading === true || downloadingExportCnfs === true || loadingCSV === true}
        />
      </div>
    </div>
  );
}

FiltersAndSorts.propTypes = {
  resetPage: PropTypes.func,
  user: PropTypes.object,
  conseillersSearch: PropTypes.array
};

export default FiltersAndSorts;
