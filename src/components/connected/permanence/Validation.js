import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions } from '../../../actions/permanence.actions';

function Validation({ conseillerId, structureId }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);

  const [clickSubmit, setClickSubmit] = useState(false);

  function handleSubmit() {
    dispatch(permanenceActions.verifyFormulaire(form));
    setClickSubmit(true);
  }

  useEffect(() => {
    if (errorsForm?.lengthError === 0 && clickSubmit) {

      const conseillers = fields.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];
      if (!conseillers.includes(conseillerId)) {
        conseillers.push(conseillerId);
      }
      const itinerant = fields?.filter(field => field.name === prefixId + 'itinerant')[0]?.value ?? [];
      if (!itinerant.includes(conseillerId)) {
        itinerant.push(conseillerId);
      }

      const nouveauLieu = {
        //Données du CNFS
        estCoordinateur: fields.filter(field => field.name === 'estCoordinateur')[0]?.value ?? null,
        emailPro: fields.filter(field => field.name === 'emailPro')[0]?.value ?? null,
        telephonePro: fields.filter(field => field.name === 'telephonePro')[0]?.value ?? null,
        //Données du lieu d'activité
        estStructure: fields.filter(field => field.name === prefixId + 'estStructure')[0]?.value ?? false,
        _id: fields.filter(field => field.name === prefixId + 'idPermanence')[0]?.value ?? null,
        nomEnseigne: fields.filter(field => field.name === prefixId + 'nomEnseigne')[0]?.value ?? null,
        numeroTelephone: fields.filter(field => field.name === prefixId + 'numeroTelephone')[0]?.value ?? null,
        email: fields.filter(field => field.name === prefixId + 'email')[0]?.value ?? null,
        siteWeb: fields.filter(field => field.name === prefixId + 'siteWeb')[0]?.value ?? null,
        siret: fields.filter(field => field.name === prefixId + 'siret')[0]?.value ?? null,
        adresse: {
          numeroRue: fields.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? null,
          rue: fields.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? null,
          codePostal: fields.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? null,
          ville: fields.filter(field => field.name === prefixId + 'ville')[0]?.value ?? null,
          location: fields.filter(field => field.name === prefixId + 'location')[0]?.value ?? null,
        },
        horaires: fields.filter(field => field.name === prefixId + 'horaires')[0]?.value[prefixId + 'horaires'] ?? horairesInitiales,
        conseillersItinerants: itinerant,
        typeAcces: fields.filter(field => field.name === prefixId + 'typeAcces')[0]?.value ?? null,
        conseillers: conseillers,
        structureId: structureId,
        hasPermanence: true,
      };
      console.log(nouveauLieu);
      if (nouveauLieu._id !== null) {
        dispatch(permanenceActions.updatePermanence(nouveauLieu._id, conseillerId, nouveauLieu, true, null));
      } else {
        dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, true, null));
      }
    } else if (errorsForm?.lengthError > 0 && clickSubmit === true) {
      window.scrollTo(0, 0);
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
