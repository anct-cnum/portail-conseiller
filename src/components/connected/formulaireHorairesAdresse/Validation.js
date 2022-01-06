import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Validation({ conseillerId }) {

  const dispatch = useDispatch();
  const form = useSelector(state => state.horairesAdresse);
  const errorsForm = useSelector(state => state.horairesAdresse?.errorsFormulaire);
  console.log(errorsForm);

  function handleSubmit() {
    const hasErrors = true;
    dispatch(formulaireHorairesAdresseActions.verifyFormulaire(form));
    if (hasErrors) {

    } else {
      dispatch(formulaireHorairesAdresseActions.createHorairesAdresse(conseillerId, { }));
    }
  }

  return (
    <div className="rf-col-4">
      <button className="rf-btn validation-btn rf-mb-15w" onClick={handleSubmit}>Enregistrer les informations</button>
    </div>
  );
}

Validation.propTypes = {
  conseillerId: PropTypes.string
};

export default Validation;
