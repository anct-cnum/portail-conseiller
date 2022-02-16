import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { permanenceActions } from '../../../actions/permanence.actions';

function AjouterAutrePermanence({ permanence, conseillerId, structureId }) {
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
          conseillerId,
          structureId,
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
    <>
      <div className="rf-col-1 col-logo rf-mt-8w">
        <img className="pin" src="logos/permanences/pin.svg"/>
      </div>
      <div className="rf-col-8 rf-mt-7w">
        <button className="rf-btn nouveau-btn rf-mb-2w" onClick={handleSubmit}>
          Ajouter un autre lieu d&rsquo;activit&eacute; secondaire</button>
        <span className="baseline rf-mb-6w">
          Vous pourrez ajouter et modifier vos lieux d&rsquo;activit&eacute; plus tard.
        </span>
      </div>
    </>
  );
}

AjouterAutrePermanence.propTypes = {
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
};

export default AjouterAutrePermanence;
