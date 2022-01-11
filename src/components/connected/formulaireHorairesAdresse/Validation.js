import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Validation({ conseillerId }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.horairesAdresse);
  const errorsForm = useSelector(state => state.horairesAdresse?.errorsFormulaire);

  const [clickSubmit, setClickSubmit] = useState(false);
  function handleSubmit() {
    dispatch(formulaireHorairesAdresseActions.verifyFormulaire(form));
    setClickSubmit(true);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (errorsForm?.length === 0 && clickSubmit) {
      dispatch(formulaireHorairesAdresseActions.createHorairesAdresse(conseillerId, {
        nomEnseigne: form.lieuActivite,
        numeroTelephone: form.numeroTelephone,
        email: form.email,
        siteWeb: form.siteWeb,
        siret: form.siret,
        numeroRue: form.numeroVoie,
        rue: form.rueVoie,
        codePostal: form.codePostal,
        ville: form.ville,
        lundiMatinDebut: form.lundiMatinDebut,
        lundiMatinFin: form.lundiMatinFin,
        lundiApresMidiDebut: form.lundiApresMidiDebut,
        lundiApresMidiFin: form.lundiApresMidiFin,
        mardiMatinDebut: form.mardiMatinDebut,
        mardiMatinFin: form.mardiMatinFin,
        mardiApresMidiDebut: form.mardiApresMidiDebut,
        mardiApresMidiFin: form.mardiApresMidiFin,
        mercrediMatinDebut: form.mercrediMatinDebut,
        mercrediMatinFin: form.mercrediMatinFin,
        mercrediApresMidiDebut: form.mercrediApresMidiDebut,
        mercrediApresMidiFin: form.mercrediApresMidiFin,
        jeudiMatinDebut: form.jeudiMatinDebut,
        jeudiMatinFin: form.jeudiMatinFin,
        jeudiApresMidiDebut: form.jeudiApresMidiDebut,
        jeudiApresMidiFin: form.jeudiApresMidiFin,
        vendrediMatinDebut: form.vendrediMatinDebut,
        vendrediMatinFin: form.vendrediMatinFin,
        vendrediApresMidiDebut: form.vendrediApresMidiDebut,
        vendrediApresMidiFin: form.vendrediApresMidiFin,
        samediMatinDebut: form.samediMatinDebut,
        samediMatinFin: form.samediMatinFin,
        samediApresMidiDebut: form.samediApresMidiDebut,
        samediApresMidiFin: form.samediApresMidiFin,
        dimancheMatinDebut: form.dimancheMatinDebut,
        dimancheMatinFin: form.dimancheMatinFin,
        dimancheApresMidiDebut: form.dimancheApresMidiDebut,
        dimancheApresMidiFin: form.dimancheApresMidiFin,
        itinerant: form.itinerance
      }));
    }
    setClickSubmit(false);
  }, [errorsForm]);

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
