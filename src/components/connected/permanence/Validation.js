import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { permanenceActions } from '../../../actions/permanence.actions';

function Validation({ conseillerId, structureId }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);

  const [clickSubmit, setClickSubmit] = useState(false);

  function handleSubmit() {
    dispatch(permanenceActions.verifyFormulaire(form));


  }

  useEffect(() => {
    if (errorsForm?.lengthError === 0 && clickSubmit) {
      dispatch(permanenceActions.createPermanence({
        conseillerId: conseillerId,
        structureId: structureId,
        nomEnseigne: form.nomEnseigne,
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
        itinerant: form.itinerance === 'true',
        estCoordinateur: form.estCoordinateur,
        emailPro: form.emailPro,
        telephonePro: form.telephonePro,
        typeAcces: form.typeAcces,
      }));
    }
    setClickSubmit(false);
  }, [errorsForm]);

  return (
    <div className="rf-col-offset-1 rf-col-4">
      <button className="rf-btn validation-btn rf-mb-12w" onClick={handleSubmit}>Enregistrer et revenir &agrave; l&rsquo;accueil</button>
    </div>
  );
}

Validation.propTypes = {
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
};

export default Validation;
