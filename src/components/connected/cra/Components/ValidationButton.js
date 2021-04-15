import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';

function ValidationButton() {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  const saveInProgress = useSelector(state => state.cra.saveInProgress);
  const error = useSelector(state => state.cra.error);

  const sendCra = () => {
    let hasErrors = false;
    Object.values(cra?.errorsRequired).forEach(error => {
      if (error === true) {
        hasErrors = true;
      }
    });
    if (hasErrors) {
      //Print errors
      dispatch(craActions.verifyCra(Object.values(cra?.errorsRequired)));
    } else {
      //No errors, we can send to API only necessary data
      let { errorsRequired, printError, searchCP, searchInput, saveInProgress, error, ...dataCraToSend } = cra;
      //Add optional question
      if (cra?.accompagnement === undefined) {
        dataCraToSend.accompagnement = null;
      }
      dispatch(craActions.submitCra(dataCraToSend));
    }
  };

  //Necessary to update printError when errorsRequired changed
  useEffect(() => {
    if (cra?.printError) {
      dispatch(craActions.verifyCra(Object.values(cra?.errorsRequired)));
    }
  }, [cra?.printError, cra?.errorsRequired]);

  return (
    <div className="rf-grid-row rf-grid-row--center rf-pb-12w rf-mb-3w">
      <div className="rf-col-sm-8 rf-col-md-6 submitResponsive" style={{ textAlign: 'center' }}>
        { cra?.printError &&
          <span className="labelError">Toutes les questions obligatoires n&rsquo;ont pas été répondues (marquées par un *)</span>
        }
        <button className="rf-btn rf-text--bold big-btn submitCra" onClick={sendCra}>Valider</button>
        <br/>
        {saveInProgress &&
          <span>Enregistrement en cours...</span>
        }
        {!saveInProgress && error &&
          <span className="labelError">{error?.toString()}</span>
        }
      </div>
    </div>
  );
}

export default ValidationButton;
