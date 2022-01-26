import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { permanenceActions } from '../../../actions/permanence.actions';

function Validation({ permanence, conseillerId, structureId }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);

  const [clickSubmit, setClickSubmit] = useState(false);
  function handleSubmit() {
    dispatch(permanenceActions.verifyFormulaire(form));
    setClickSubmit(true);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (errorsForm?.lengthError === 0 && clickSubmit) {
      if (permanence) {
        permanence.conseillerId = conseillerId;
        permanence.structureId = structureId;
        permanence.nomEnseigne = form.lieuActivite;
        permanence.numeroTelephone = form.numeroTelephone;
        permanence.email = form.email;
        permanence.siteWeb = form.siteWeb;
        permanence.siret = form.siret;
        permanence.adresse.numeroRue = form.numeroVoie;
        permanence.adresse.rue = form.rueVoie;
        permanence.adresse.codePostal = form.codePostal;
        permanence.adresse.ville = form.ville;
        permanence.horaires = form.horaires;
        permanence.itinerant = form.itinerance === 'true';

        dispatch(permanenceActions.updatePermanence(permanence._id, permanence));
      } else {
        dispatch(permanenceActions.createPermanence({
          conseillerId: conseillerId,
          structureId: structureId,
          nomEnseigne: form.lieuActivite,
          numeroTelephone: form.numeroTelephone,
          email: form.email,
          siteWeb: form.siteWeb,
          siret: form.siret,
          adresse: {
            numeroRue: form.numeroVoie,
            rue: form.rueVoie,
            codePostal: form.codePostal,
            ville: form.ville
          },
          horaires: form.horaires,
          itinerant: form.itinerance === 'true'
        }));
      }
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
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
};

export default Validation;
