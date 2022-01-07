import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Itinerance() {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);

  const erreurItinerance = erreursFormulaire?.filter(erreur => erreur.name === 'itinerance')[0];

  function handleChange(e) {
    dispatch(formulaireHorairesAdresseActions.updateItinerance(e.target.value));
  }

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

      <div className={erreurItinerance ? 'question rf-col-12 rf-mb-9w invalid' : 'question rf-col-12 rf-mb-9w'}>
        Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Oui" name="itinerance" value="true" onChange={handleChange} />
              <label className={erreurItinerance ? 'rf-label invalid' : 'rf-label' } htmlFor="itinerance-Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Non" name="itinerance" value="false" required="required" onChange={handleChange}/>
              <label className={erreurItinerance ? 'rf-label invalid' : 'rf-label' } htmlFor="itinerance-Non">Non</label>
            </div>
          </div>
        </fieldset>
        { erreurItinerance &&
          <p className="text-error rf-mb-n3w">{erreurItinerance.error}</p>
        }
      </div>
    </>
  );
}

export default Itinerance;
