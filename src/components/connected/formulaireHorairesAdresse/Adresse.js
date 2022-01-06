import React from 'react';
import PropTypes from 'prop-types';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';
import { useDispatch } from 'react-redux';

function Adresse() {

  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">Coordonn&eacute;es de mon lieu d&rsquo;activit&eacute;</h2>

      <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="numero-voie">
        Num&eacute;ro de voie <span className="obligatoire">*</span>
        <input className="rf-input rf-mt-2v" type="text" id="numero-voie" name="numeroVoie"
          required="required" onChange={handleChange} />
      </label>

      <div className="rf-col-offset-4"></div>

      <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="rue-voie">
        Rue <span className="obligatoire">*</span>
        <input className="rf-input rf-mt-2v" type="text" id="rue-voie" name="rueVoie"
          required="required" onChange={handleChange} />
      </label>

      <div className="rf-col-offset-4"></div>

      <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w" htmlFor="code-postal">
        Code Postal <span className="obligatoire">*</span>
        <input className="rf-input rf-mt-2v" type="text" id="code-postal" name="codePostal"
          required="required" onChange={handleChange} />
      </label>

      <div className="rf-col-offset-4"></div>

      <label className="rf-label rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w" htmlFor="ville">
        Ville <span className="obligatoire">*</span>
        <input className="rf-input rf-mt-2v" type="text" id="ville" name="ville"
          required="required" onChange={handleChange} />
      </label>
    </>
  );
}

Adresse.propTypes = {
  adresseStructure: PropTypes.object
};

export default Adresse;
