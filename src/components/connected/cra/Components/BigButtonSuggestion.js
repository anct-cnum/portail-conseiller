import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import { sortSousThemes } from '../../../../utils/functionsSort';
import labelsCorrespondance from '../../../../data/labelsCorrespondance.json';
import correspondencesSousThemes from '../../../../data/sousThemes.json';
import { decodeEntitiesSuggestion } from '../utils/CraFunctions';

function BigButtonSuggestion() {
  const dispatch = useDispatch();

  let cra = useSelector(state => state.cra);
  const listeSousThemes = useSelector(state => state.cra?.listeSousThemes);
  const error = useSelector(state => state.cra?.errorSousTheme);

  const [modalOpenClose, setModalOpenClose] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const clearSuggestion = () => {
    setSuggestion('');
    dispatch(craActions.clearListeSousThemes());
    dispatch(craActions.updateMultipleThemes([]));
  };

  const searchSuggestion = e => {
    const value = e.target.value;
    setSuggestion(value);
    if (value.length > 2) {
      dispatch(craActions.searchSuggestion(cra.themes[0], value));
    } else {
      dispatch(craActions.clearListeSousThemes());
    }
  };

  const onClickOption = e => {
    const value = e.target.getAttribute('value');
    setSuggestion(value);
    dispatch(craActions.clearListeSousThemes());
  };

  const selectSousThemes = sousThemes => {
    const options = [];
    if (sousThemes?.length > 0) {
      const sousThemesFiltered = sortSousThemes(sousThemes);
      sousThemesFiltered?.forEach(sousTheme => options.push(
        <div key={`${sousTheme}`}
          value={`${sousTheme}`}
          onClick={onClickOption}>
          {sousTheme}
        </div>
      ));
    }
    return options;
  };

  const saveSuggestion = () => {
    dispatch(craActions.verifySuggestion(suggestion));
  };

  useEffect(() => {
    if (error?.sousTheme === null) {
      const sousThemes = [];
      if (cra?.sousThemes) {
        const theme = cra?.themes[0];
        const sousThemesExistants = cra?.sousThemes[0]?.[theme] ?? [];
        sousThemesExistants.push(suggestion);
        sousThemes.push({ [theme]: sousThemesExistants });
      } else {
        sousThemes.push({ [cra?.themes[0]]: [suggestion] });
      }
      dispatch(craActions.updateMultipleThemes(sousThemes));
      setModalOpenClose(false);
    }
  }, [error]);

  useEffect(() => {
    if (cra?.themes?.length !== 1 && suggestion) {
      setSuggestion('');
      dispatch(craActions.updateMultipleThemes([]));
    } else if (cra?.themes?.length === 1 && cra?.sousThemes?.length > 0) {
      const theme = cra?.themes[0];
      const sousTheme = cra?.sousThemes[0][theme] ? cra?.sousThemes[0][theme][0] : '';
      if (!correspondencesSousThemes.find(label => label.theme === theme)) {
        setSuggestion(sousTheme);
      } else if (correspondencesSousThemes.find(label => label.theme === theme) &&
        !correspondencesSousThemes.find(label => label.theme === theme).values.includes(sousTheme)) {
        setSuggestion(sousTheme);
      }
    }
  }, [cra]);

  return (
    <>
      <div className="checkboxButton" onClick={() => {
        if (cra?.themes?.length === 1) {
          setModalOpenClose(true);
        }
      }}>
        <div className={`${cra?.themes?.length !== 1 ? 'inactif-box' : 'gradient-box'}`}>
          <button className={`checkboxRattachement2 ${cra?.themes?.length !== 1 ? 'inactif-btn' : ''}`}
            style={{ height: '104px' }}
            value="suggestion">
            <div value="suggestion" style={{ display: 'flex' }}>
              <span className={`imageTheme ${cra?.themes?.length !== 1 ? 'suggestionInactif' : 'suggestion'}`}></span>
              <span
                className={`fr-label labelCheckboxCustom ${cra?.themes?.length !== 1 ? 'text-suggestion-inactif' : 'text-suggestion'} `} value="suggestion">
                {(suggestion && cra?.themes?.length) === 1 &&
                <>{decodeEntitiesSuggestion(labelsCorrespondance.find(label => label.nom === cra?.themes[0])?.correspondance)}</>
                }
                {(!suggestion || cra?.themes?.length !== 1) &&
                  <>
                    Pr&eacute;ciser la th&eacute;matique coch&eacute;e
                  </>
                }
                <br/>
                <span value="suggestion" className="baseline">
                  {suggestion &&
                    <>{ suggestion }</>
                  }
                  {!suggestion &&
                    <>Annoter l&rsquo;activit&eacute; et proposer une &eacute;volution future</>
                  }
                </span>
              </span>
            </div>
          </button>
        </div>
      </div>
      {modalOpenClose &&
      <dialog aria-labelledby="fr-modal-suggestion" role="dialog" id="fr-modal-suggestion" className="fr-modal modalOpened">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-sm-10 fr-col-md-9 fr-modal__body modal-suggestion">
              <div className="fr-modal__header fr-mt-n3w">
                <button className="fr-btn--close fr-btn fr-mt-n3w" title="Fermer la fen&ecirc;tre modale" aria-controls="fr-modal-suggestion" onClick={() => {
                  setModalOpenClose(false);
                  clearSuggestion();
                }}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 className="fr-modal__title fr-mb-2w">Annoter l&rsquo;activit&eacute; et proposer une &eacute;volution.</h1>
                <label htmlFor="suggestion" className={`label-suggestion ${error?.sousTheme ? 'text-error' : ''}`}>
                  Saisissez votre intitul&eacute; (35 caract&egrave;res max.)
                  <input id="suggestion" name="suggestion" className={`fr-input input-suggestion fr-mt-1w ${error?.sousTheme ? 'input-error' : ''}`} type="text"
                    style={{ width: '470px' }} value={suggestion} onChange={
                      e => {
                        searchSuggestion(e);
                      }}/>
                  <div className="scrollOptionsSuggestion">{selectSousThemes(listeSousThemes)}</div>
                </label>
                { error &&
                  <p className="text-error fr-mb-n1w">{error?.sousTheme}</p>
                }
                <ul className="fr-mt-3w">
                  <li>Vous pouvez retrouver votre annotation sur l&rsquo;historique de vos activit&eacute;s.</li>
                  <li>L&rsquo;intitul&eacute; de votre annotation th&eacute;matique sera enregistr&eacute; dans la base de donn&eacute;es CnFS.<br/>
                    Celle-ci sera analys&eacute;e en vue d&rsquo;une am&eacute;lioration des boutons de th&eacute;matiques d&rsquo;accompagnement. </li>
                </ul>
                <div className="fr-mt-3w" style={{ textAlign: 'right' }}>
                  <button className={`fr-btn fr-mr-3w ${cra?.sousThemes?.length >= 1 ? 'suggestion-delete-btn' : 'disabled-btn'}`}
                    disabled={cra?.sousThemes?.length < 1} onClick={() => {
                      clearSuggestion();
                    }} >
                    Supprimer l&rsquo;annotation
                  </button>
                  <button className="fr-btn suggestion-create-btn" disabled={suggestion?.length < 2 && suggestion?.length > 35 } onClick={() => {
                    saveSuggestion();
                  }} >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      }
    </>
  );
}

export default BigButtonSuggestion;
