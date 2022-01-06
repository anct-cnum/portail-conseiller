import React from 'react';
import { useDispatch } from 'react-redux';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Itinerance() {
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(formulaireHorairesAdresseActions.updateItinerance(e.target.value));
  }

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

      <div className="question rf-col-12 rf-mb-9w">
        Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Oui" name="itinerance" value="true" onChange={handleChange} />
              <label className="rf-label" htmlFor="itinerance-Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Non" name="itinerance" value="false" required="required" onChange={handleChange}/>
              <label className="rf-label" htmlFor="itinerance-Non">Non</label>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Itinerance;
