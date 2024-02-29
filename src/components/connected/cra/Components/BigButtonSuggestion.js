import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import { sortByString } from '../../../../utils/functionsSort';
import { changeToMinusculeWithTrim } from '../utils/CraFunctions';

function BigButtonSuggestion() {
  const dispatch = useDispatch();

  let cra = useSelector(state => state.cra);
  const listeSousThemes = useSelector(state => state.cra?.listeSousThemes);
  const error = useSelector(state => state.cra?.errorSousTheme);

  const [modalOpenClose, setModalOpenClose] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const clearSuggestion = () => {
    setSuggestion('');
    const sousThemes = cra?.sousThemes?.filter(sousTheme => Object.keys(sousTheme)[0] !== 'annotation') ?? [];
    dispatch(craActions.clearListeSousThemes());
    dispatch(craActions.updateMultipleThemes(sousThemes));
  };

  const searchSuggestion = e => {
    const value = e.target.value;
    setSuggestion(value);
    if (value.length > 5) {
      dispatch(craActions.searchSuggestion(changeToMinusculeWithTrim(value)));
    } else {
      dispatch(craActions.clearListeSousThemes());
    }
  };

  const onClickOption = e => {
    const value = e.target.getAttribute('value');
    setSuggestion(changeToMinusculeWithTrim(value));
    dispatch(craActions.clearListeSousThemes());
  };

  const selectSousThemes = sousThemes => {
    const options = [];
    if (sousThemes?.length > 0) {
      const sousThemesFiltered = sortByString(sousThemes);
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
      if (cra?.sousThemes?.length > 0) {
        let insertAnnotation = false;
        cra?.sousThemes.forEach(sousTheme => {
          if (sousTheme?.annotation?.length > 0) {
            sousThemes.push({ 'annotation': [suggestion] });
            insertAnnotation = true;
          } else {
            sousThemes.push(sousTheme);
          }
        });
        if (!insertAnnotation) {
          sousThemes.push({ 'annotation': [suggestion] });
        }
      } else {
        sousThemes.push({ 'annotation': [suggestion] });
      }
      dispatch(craActions.updateMultipleThemes(sousThemes));
      setModalOpenClose(false);
    }
  }, [error]);

  useEffect(() => {
    if (cra?.themes?.length === 0 && suggestion) {
      setSuggestion('');
      dispatch(craActions.updateMultipleThemes([]));
    } else if (cra?.themes?.length > 0 && cra?.sousThemes?.length > 0) {
      cra?.sousThemes.forEach(sousTheme => {
        if (sousTheme?.annotation?.length > 0) {
          setSuggestion(changeToMinusculeWithTrim(sousTheme?.annotation[0]));
        }
      });
    }
  }, [cra]);

  return (
    <>
      <div className="checkboxButton" onClick={() => {
        if (cra?.themes?.length >= 1) {
          setModalOpenClose(true);
        }
      }}>
        <div className={`${cra?.themes?.length === 0 ? 'inactif-box' : 'gradient-box'}`}>
          <button className={`checkboxRattachement2 ${cra?.themes?.length === 0 || !cra?.themes ? 'inactif-btn' : ''}
            ${suggestion ? 'checkboxRattachement2-selected' : ''}`} style={{ height: '104px' }} value="suggestion">
            <div value="suggestion" style={{ display: 'flex' }}>
              <span className={`imageTheme ${cra?.themes?.length === 0 || !cra?.themes ? 'suggestionInactif' : ''}
                ${suggestion ? 'suggestionSelected' : 'suggestion'}
              `}></span>
              <span
                className={`fr-label labelCheckboxCustom ${cra?.themes?.length === 0 || !cra?.themes ?
                  'text-suggestion-inactif' : 'text-suggestion'} `} value="suggestion">
                {!suggestion &&
                 <>
                  Pr&eacute;ciser la th&eacute;matique coch&eacute;e
                 </>
                }
                <br/>
                <span value="suggestion" className="baseline">
                  {suggestion && suggestion.length <= 35 &&
                    <span style={{ top: '-15px', position: 'relative', color: '#000' }}>{ suggestion }</span>
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
                  <input id="suggestion" name="suggestion" maxLength="35" type="text"
                    className={`fr-input input-suggestion fr-mt-1w ${error?.sousTheme ? 'input-error' : ''}`}
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
                  <li>L&rsquo;intitul&eacute; de votre annotation th&eacute;matique sera enregistr&eacute; dans la base de donn&eacute;es Conum.<br/>
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
