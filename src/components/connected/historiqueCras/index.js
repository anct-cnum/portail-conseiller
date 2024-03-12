import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { pluralize } from '../../../utils/functionFormats';
import labelsCorrespondance from '../../../data/labelsCorrespondance.json';
import { htmlDecode } from '../../../utils/functionEncodeDecode';
import { statistiqueActions, historiqueCrasActions, alerteActions } from '../../../actions';
import Footer from '../../Footer';
import Thematique from './Thematique';
import { Oval } from 'react-loader-spinner';
import Pagination from '../../admin/Pagination';
import FiltreCra from './FiltreCra';
import ConfirmationSuppressionCra from './SupprimerCra';
import SousTheme from './SousTheme';
import FiltreDate from './FiltreDate';
import FiltreLieu from './FiltreLieu';
import Alerte from '../../common/Alerte';

function HistoriqueCras() {
  const dispatch = useDispatch();

  const accompagnements = useSelector(state => state.historiqueCras?.liste);
  const total = useSelector(state => state.historiqueCras?.total);
  const limit = useSelector(state => state.historiqueCras?.limit);
  const loading = useSelector(state => state.historiqueCras?.loading);
  const error = useSelector(state => state.historiqueCras?.error);
  const errorSuppression = useSelector(state => state.cra?.error);
  const themes = useSelector(state => state.historiqueCras?.themes);
  const printFlashbag = useSelector(state => state.cra.printFlashbag);
  const isDeleted = useSelector(state => state.cra.isDeleted);
  const listeCodesPostaux = useSelector(state => state.statistique?.listeCodesPostaux);
  const dateDebutCra = useSelector(state => state.historiqueCras?.dateCraDebut);
  const dateFinCra = useSelector(state => state.historiqueCras?.dateCraFin);
  const codePostal = useSelector(state => state.historiqueCras?.codePostalCra);
  const codeCommune = useSelector(state => state.historiqueCras?.codeCommuneCra);
  const canaux = ['rattachement', 'autre lieu', 'domicile', 'distance'];
  const types = ['individuel', 'collectif', 'ponctuel'];
  const [thematique, setThematique] = useState(null);
  const [canal, setCanal] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);
  const [optionList, setOptionList] = useState([]);

  /*Pagination */
  let [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = page => {
    setPage(page);
    dispatch(historiqueCrasActions.getHistoriqueCrasListe(thematique, canal, type, sort,
      dateDebutCra, dateFinCra, codePostal, codeCommune, page));
  };

  const sortByDate = () => {
    setSort(sort === 'desc' ? 'asc' : 'desc');
    dispatch(historiqueCrasActions.getHistoriqueCrasListe(thematique, canal, type, sort,
      dateDebutCra, dateFinCra, codePostal, codeCommune, page));
  };

  useEffect(() => {
    dispatch(historiqueCrasActions.getHistoriqueCrasListe(thematique, canal, type, sort,
      dateDebutCra, dateFinCra, codePostal, codeCommune, page));
    if (themes === undefined) {
      dispatch(historiqueCrasActions.getHistoriqueCrasThematiques());
    }
    dispatch(statistiqueActions.getCodesPostauxCrasConseiller());
  }, [thematique, canal, type, dateDebutCra, dateFinCra, codePostal, codeCommune, isDeleted]);

  //Forcer affichage en haut de la page pour voir le flashbag
  useEffect(() => {
    if (printFlashbag === true) {
      window.scrollTo(0, 0);
    }
  }, [printFlashbag]);

  useEffect(() => {
    if (accompagnements) {
      const count = limit ? Math.floor(total / limit) : 0;
      setPageCount(total % limit === 0 ? count : count + 1);
    }
  }, [accompagnements]);

  useEffect(() => {
    if (!listeCodesPostaux) {
      dispatch(statistiqueActions.getCodesPostauxCrasConseiller());
    } else if (listeCodesPostaux && optionList?.length === 0) {
      listeCodesPostaux.forEach(codePostal => {
        if (codePostal.villes?.length === 1) {
          optionList.push({
            text: codePostal.id + ' - ' + codePostal.villes[0]?.toUpperCase(),
            value: codePostal.id + '-' + codePostal.villes[0]
          });
        } else if (codePostal.villes?.length > 1) {
          optionList.push({
            text: codePostal.id + ' - TOUTES COMMUNES',
            value: codePostal.id
          });
          codePostal.villes.forEach(ville => {
            optionList.push({
              text: ville,
              value: codePostal.id + '-' + ville,
              marge: '- - '
            });
          });
        }
      });
      setOptionList(optionList);
    }
  });

  useEffect(() => {
    if (isDeleted) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Votre suivi d\'activité a bien été supprimé.',
        icon: 'ri-check-line ri-xl',
      }));
    }
    if (printFlashbag) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        icon: 'ri-check-line ri-xl',
        message: 'Votre suivi d\'activité a bien été enregistré.',
      }));
    }
    if (error) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: error
      }));
    }
    if (errorSuppression) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorSuppression,
      }));
    }
  }, [isDeleted, printFlashbag, error, errorSuppression]);

  return (
    <>
      <div className="historique-cras">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12">
              <h1 className="titre">
                Historique des accompagnements
              </h1>
            </div>
          </div>
          <Alerte />
          <div className="spinnerCustom">
            <Oval
              color="#00BFFF"
              height={100}
              width={100}
              visible={loading === true}
            />
          </div>
          {(!accompagnements && !loading) &&
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-6 fr-mt-15w fr-mb-7w">
                Vous n&rsquo;avez pas d&rsquo;accompagnement enregistr&eacute;.
              </div>
              <div className="fr-col-12"></div>
              <div className="fr-col-3">
                <a href="/compte-rendu-activite" className="box-bouton-menu">
                  <span className="bouton-cra"></span>
                  <span className="texte-cra">Enregistrer un nouvel accompagnement</span>
                </a>
              </div>
              <div className="fr-col-3 fr-mb-12w">
                <a href="/accueil" className="box-bouton-menu">
                  <span className="bouton-home"></span>
                  <span>Accueil</span>
                </a>
              </div>
            </div>
          }
          {(accompagnements && !loading) &&
            <div className="fr-grid-row">
              <div className="fr-col-lg-8 fr-mt-1w fr-mb-8w">
                {(thematique === null && canal === null && type === null) &&
                  <>
                    {pluralize(
                      'Vous n\'avez enregistré aucun accompagnement.',
                      'Vous avez enregistré un accompagnement au total.',
                      'Vous avez enregistré ' + total + ' accompagnements au total.',
                      total
                    )}
                  </>
                }
                {(thematique !== null || canal !== null || type !== null) &&
                  <>
                    {pluralize(
                      'Vous n\'avez enregistré aucun accompagnement en fonction de vos filtres.',
                      'Vous avez enregistré un accompagnement en fonction de vos filtres.',
                      'Vous avez enregistré ' + total + ' accompagnements en fonction de vos filtres.',
                      total
                    )}
                  </>
                }
              </div>

              <div className="fr-col-12">
                <div className="boutons-cras">
                  <a className="fr-btn fr-btn--secondary boutons-cras fr-mr-md-2w" href="/compte-rendu-activite">Enregistrer un nouvel accompagnement</a>
                  <a className="fr-btn fr-btn--secondary fr-mr-md-2w" href="/statistiques">Consulter mes statistiques</a>
                  <span>P&eacute;riode du &nbsp;</span>
                  <span id="span-datePickerDebut" >
                    <FiltreDate idDate="dateCraDebut" />
                  </span>
                  <span id="span-datePickerFin" >
                    &nbsp;au&nbsp;
                    <FiltreDate idDate="dateCraFin" />
                  </span>
                  <FiltreLieu optionList={optionList} />
                </div>
                <div className="fr-table fr-table--bordered fr-table--layout-fixed cras">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" className="medium-column">Date</th>
                        <th scope="col" className="medium-column">
                          <FiltreCra texte="Canal" css="canal" datas={canaux} setDatas={setCanal} />
                        </th>
                        <th scope="col">Lieu</th>
                        <th scope="col" className="medium-column">
                          <FiltreCra texte="Type" css="type" datas={types} setDatas={setType} />
                        </th>
                        <th scope="col" className="medium-column">Usagers</th>
                        <th scope="col">
                          <FiltreCra texte="Th&eacute;matiques" css="themes" datas={themes} setDatas={setThematique} />
                        </th>
                        <th scope="col"> Annotations</th>
                        <th scope="col" className="medium-column">
                          <span className="tri-date" onClick={() => {
                            sortByDate();
                          }}>Modifi&eacute; le&ensp;
                            <i className={`ri-sort-${sort ?? 'desc'}`} ></i>
                          </span>
                        </th>
                        <th scope="col" className="short-column">&Eacute;diter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accompagnements?.map((accompagnement, idx) =>
                        <tr key={idx}>
                          <td>
                            {dayjs(accompagnement.cra.dateAccompagnement).format('DD/MM/YY')}
                          </td>
                          <td className="canal">
                            <img src={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.canal)?.image)}
                              alt={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.canal)?.correspondance)}
                              data-tooltip-id="infobulle-menu"
                              data-tooltip-html={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.canal)?.correspondance)}
                              className="logo"
                            />
                          </td>
                          <td>{accompagnement.cra.codePostal + ' ' + accompagnement.cra.nomCommune}</td>
                          <td>
                            <img src={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.image)}
                              alt={labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.correspondance}
                              data-tooltip-id="infobulle-menu"
                              data-tooltip-html={labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.correspondance}
                              className="logo"
                            />
                          </td>
                          <td>
                            {accompagnement.cra.nbParticipants}
                          </td>
                          <td>{accompagnement.cra.themes.map((theme, idx) =>
                            <Thematique key={idx} texte={theme} />
                          )}
                          </td>
                          <td>
                            {accompagnement.cra?.sousThemes?.map((sousTheme, idx) =>
                              <span key={idx} >
                                <SousTheme sousTheme={sousTheme} />
                                {idx + 1 < accompagnement.cra?.sousThemes.length &&
                                  <>&nbsp;/&nbsp;</>
                                }
                              </span>
                            )}
                          </td>
                          <td className="modifie-le" style={{ textAlign: 'center' }}>
                            {accompagnement?.updatedAt ?
                              dayjs(accompagnement.updatedAt).format('DD/MM/YY à HH:mm') : dayjs(accompagnement.createdAt).format('DD/MM/YY à HH:mm')}
                          </td>
                          <td>
                            <a className="update-cra" href={`/compte-rendu-activite/${accompagnement?._id}`}>
                              <i className="ri-pencil-fill ri-xl"></i>
                            </a>
                            <ConfirmationSuppressionCra cra={accompagnement} />
                          </td>
                        </tr>
                      )}
                      {(total === 0 && !loading) &&
                        <tr>
                          <td colSpan={8} className="no-result">
                            Nous n&rsquo;avons trouv&eacute; aucun cra en fonction de vos filtres
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                  <Tooltip className="infobulle" id="infobulle-menu" arrowColor="white" />
                </div>
              </div>
              <div className="fr-col-12 fr-mb-12w">
                <Pagination current={page} pageCount={pageCount} navigate={navigate} />
              </div>
            </div>
          }
        </div>
      </div>
      <Footer type="support" />
    </>
  );
}

export default HistoriqueCras;
