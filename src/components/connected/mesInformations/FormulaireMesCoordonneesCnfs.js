import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
registerLocale('fr', fr);

function FormulaireMesCoordonneesCnfs({ conseiller }) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    dateDebut: '',
    dateFin: '',
    typeContrat: '',
  });


  return (
    <div className="fr-col-6">
      <h2 className="">Mes Coordonées CnFS</h2>

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
FormulaireMesCoordonneesCnfs.propTypes = {
  conseiller: PropTypes.object
};
export default FormulaireMesCoordonneesCnfs;
