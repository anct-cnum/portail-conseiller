import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';

function ValidationButton() {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  const saveInProgress = useSelector(state => state.cra.saveInProgress);
  const error = useSelector(state => state.cra.error);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const sendCra = () => {
    let hasErrors = false;
    Object.values(cra?.errorsRequired).forEach(error => {
      if (error === true) {
        hasErrors = true;
      }
    });
    if (hasErrors) {
      //Affichage des erreurs
      dispatch(craActions.verifyCra(Object.values(cra?.errorsRequired)));
    } else {
      // eslint-disable-next-line max-len, no-unused-vars
      let { errorsRequired, printError, searchCP, searchInput, saveInProgress, error, showSelectRedirection, nbParticipantsAge, nbParticipantsStatut,
      // eslint-disable-next-line max-len, no-unused-vars
        nbParticipantsAccompagnement, printFlashbag, buttonCP, buttonPermanence, nomEnseigne, ...dataCraToSend } = cra;
      if (dataCraToSend?.sousThemes?.length === 0) {
        delete dataCraToSend.sousThemes;
      }
      if (cra.id) {
        dispatch(craActions.updateCra(dataCraToSend, conseiller._id));
      } else {
        dispatch(craActions.submitCra(dataCraToSend));
      }
    }
  };

  //Pour la maj de printError quand errorsRequired change
  useEffect(() => {
    if (cra?.printError) {
      dispatch(craActions.verifyCra(Object.values(cra?.errorsRequired)));
    }
  }, [cra?.printError, cra?.errorsRequired]);

  return (
    <div className="fr-grid-row fr-grid-row--center fr-pb-12w fr-mb-3w">
      <div className="fr-col-sm-10 fr-col-md-6 submitResponsive" style={{ textAlign: 'center' }}>
        {saveInProgress ?
          <button className="fr-btn fr-text--bold big-btn submitCra" disabled >Valider</button> :
          <button className="fr-btn fr-text--bold big-btn submitCra" onClick={sendCra}>Valider</button>
        }
        <br/>
        {saveInProgress &&
          <span>Enregistrement en cours...</span>
        }
        { cra?.printError &&
          <span className="labelError" style={{ display: 'block' }}>
            Erreur&nbsp;: veuillez remplir tous les champs obligatoires du formulaire.
          </span>
        }
        {!saveInProgress && error && !cra?.printError &&
          <span className="labelError">{error?.toString()}</span>
        }
      </div>
    </div>
  );
}

export default ValidationButton;
