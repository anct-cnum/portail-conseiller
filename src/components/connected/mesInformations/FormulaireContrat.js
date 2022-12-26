import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
registerLocale('fr', fr);

function FormulaireContrat({ conseiller }) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    dateDebut: '',
    dateFin: '',
    typeContrat: '',
  });


  return (
    <div className="fr-col-6">
      <h2 className="">Mon contrat de travail</h2>
      <div className="fr-input-group fr-col-6">
        <fieldset className="fr-fieldset">
          <legend className="fr-fieldset__legend fr-text--regular" id="contrat-legend">
          Type de contrat en cours :
          </legend>
          <div className="fr-fieldset__content">
            <div className="fr-radio-group">
              <input type="radio" id="contrat-1" name="CDD" value="CDD"/>
              <label className="fr-label" htmlFor="contrat-1">CDD</label>
            </div>
            <div className="fr-radio-group">
              <input type="radio" id="contrat-2" name="ContratProjet" value="Contrat de projet"/>
              <label className="fr-label" htmlFor="contrat-2">Contrat de projet</label>
            </div>
            <div className="fr-radio-group">
              <input type="radio" id="contrat-3" name="CDI" value="CDI"/>
              <label className="fr-label" htmlFor="contrat-3">CDI</label>
            </div>
            <div className="fr-radio-group">
              <input type="radio" id="contrat-4" name="CUICIE" value="CUI/CIE"/>
              <label className="fr-label" htmlFor="contrat-4">CUI/CIE</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="fr-input-group ">
        <label className="fr-label" htmlFor="debutContrat">Date de début du contrat</label>
        <input className="fr-input" type="text" id="debutContrat" name="debutContrat"/>
      </div>
      <div className="fr-input-group ">
        <label>

          <label className="fr-label" htmlFor="finContrat">Date de fin du contrat</label>
          <input className="fr-input" type="text" id="finContrat" name="finContrat"></input>
        </label>
      </div>
      <div>
        <button className="form-button fr-btn fr-mb-4w">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
FormulaireContrat.propTypes = {
  conseiller: PropTypes.object
};
export default FormulaireContrat;
