import dayjs from 'dayjs';
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { historiqueCrasActions } from '../../../actions/historiqueCras.actions';
import labelsCorrespondance from '../../../data/labelsCorrespondance.json';
import { htmlDecode } from '../../../utils/functionEncodeDecode';
import Footer from '../../Footer';
import Thematiques from './Thematiques';

function HistoriqueCras() {
  const dispatch = useDispatch();

  const accompagnements = useSelector(state => state.historiqueCras?.liste);
  const themes = useSelector(state => state.historiqueCras?.themes);
  const [thematique, setThematique] = useState(null);

  useEffect(() => {
    if (accompagnements === undefined || thematique || !thematique) {
      dispatch(historiqueCrasActions.getHistoriqueCrasListe(thematique));
    }
    if (themes === undefined) {
      dispatch(historiqueCrasActions.getHistoriqueCrasThematiques());
    }
  }, [thematique]);

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
          {!accompagnements &&
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-6 fr-mt-15w fr-mb-7w">
                  Vous n&rsquo;avez pas d&rsquo;accompagnement enregistr&eacute; dans les 30 derniers jours.
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
          {accompagnements &&
            <div className="fr-grid-row">
              <div className="fr-col-8 fr-mt-1w fr-mb-8w">
                Vous avez enregistr&eacute; {accompagnements.length} accompagnements au cours des 30 derniers jours.
              </div>

              <div className="fr-col-12 fr-mb-12w">
                <a className="fr-btn fr-btn--secondary" href="/compte-rendu-activite">Enregistrer un nouvel accompagnement</a>
                <div className="fr-table fr-table--bordered fr-table--layout-fixed">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" className="medium-column">Date</th>
                        <th scope="col" className="short-column">Canal</th>
                        <th scope="col">Lieu</th>
                        <th scope="col" className="short-column">Type</th>
                        <th scope="col" className="medium-column">Usagers</th>
                        <th scope="col">
                          <nav id="filtre-thematiques" className="fr-nav" role="navigation" aria-label="Filtre thématiques">
                            <ul className="fr-nav__list">
                              <li className="fr-nav__item">
                                <button className="fr-nav__btn btn-thematiques" aria-expanded="false"
                                  aria-controls="filtre-themes" aria-current="true">
                                  Th&eacute;matiques
                                </button>
                                <div className="fr-collapse fr-menu" id="filtre-themes">
                                  <ul className="fr-menu__list">
                                    {thematique &&
                                      <li className="fr-nav__item">
                                        <button className="fr-nav__link" onClick={() => {
                                          setThematique(null);
                                        }} target="_self">
                                          Afficher Tout
                                        </button>
                                      </li>
                                    }
                                    <li className="fr-nav__item">
                                      {themes?.map((theme, idx) =>
                                        <button key={idx} className="fr-nav__link" onClick={() => {
                                          setThematique(theme);
                                        }} target="_self">
                                          {htmlDecode(labelsCorrespondance.find(label => label.nom === theme)?.correspondance)}
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </nav>
                        </th>
                        <th scope="col" className="medium-column">Modifi&eacute; le</th>
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
                              data-tip={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.canal)?.correspondance)}
                              className="logo"
                            />
                          </td>
                          <td>{accompagnement.cra.codePostal + ' ' + accompagnement.cra.nomCommune}</td>
                          <td>
                            <img src={htmlDecode(labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.image)}
                              alt={labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.correspondance}
                              data-tip={labelsCorrespondance.find(label => label.nom === accompagnement.cra.activite)?.correspondance}
                              className="logo"
                            />
                          </td>
                          <td>
                            {accompagnement.cra.nbParticipants}
                          </td>
                          <td>{accompagnement.cra.themes.map((theme, idx) =>
                            <Thematiques key={idx} texte={theme} />
                          )}
                          </td>
                          <td className="modifie-le">
                            {dayjs(accompagnement.createdAt).format('DD/MM/YY à HH:MM')}
                          </td>
                          <td>
                            <a href={`/compte-rendu-activite/${accompagnement._id}`}>
                              <i className="ri-pencil-fill ri-xl"></i>
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default HistoriqueCras;
