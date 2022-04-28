import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions } from '../../../actions/permanence.actions';

function Validation({ conseillerId, structureId, isUpdate, permanences }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);

  const [clickSubmit, setClickSubmit] = useState(false);

  function handleSubmit() {
    const typeAcces = [
      fields?.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
      fields?.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
      fields?.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
    ].filter(n => n);
    dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));

    if (isUpdate) {
      dispatch(permanenceActions.verifyFormulaireUpdate(permanences, fields, form));
    } else {
      dispatch(permanenceActions.verifyFormulaire(form));
    }
    setClickSubmit(true);

  }

  useEffect(() => {
    if (errorsForm?.lengthError === 0 && clickSubmit && !isUpdate) {

      const conseillers = fields.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];
      if (!conseillers.includes(conseillerId)) {
        conseillers.push(conseillerId);
      }

      const nouveauLieu = {
        //Données du CNFS
        estCoordinateur: fields.filter(field => field.name === 'estCoordinateur')[0]?.value ?? null,
        emailPro: fields.filter(field => field.name === 'emailPro')[0]?.value ?? null,
        telephonePro: fields.filter(field => field.name === 'telephonePro')[0]?.value ?? null,
        //Données du lieu d'activité
        estStructure: prefixId === 'principal_' ? fields.filter(field => field.name === 'estStructure')[0]?.value : false,
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
        },
        location: fields.filter(field => field.name === prefixId + 'location')[0]?.value ?? null,
        horaires: fields.filter(field => field.name === prefixId + 'horaires')[0]?.value[prefixId + 'horaires'] ?? horairesInitiales,
        typeAcces: fields.filter(field => field.name === prefixId + 'typeAcces')[0]?.value ?? null,
        conseillers: conseillers,
        structureId: structureId,
        showPermanenceForm: false,
        hasPermanence: true,
      };

      if (prefixId === 'principal_') {
        const lieuPrincipalPour = fields?.filter(field => field.name === 'lieuPrincipalPour')[0]?.value ?? [];
        if (!lieuPrincipalPour.includes(conseillerId)) {
          lieuPrincipalPour.push(conseillerId);
        }
        nouveauLieu.lieuPrincipalPour = lieuPrincipalPour;
      } else {
        const itinerant = fields?.filter(field => field.name === prefixId + 'itinerant')[0]?.value;
        const conseillersItinerants = fields?.filter(field => field.name === prefixId + 'conseillersItinerants')[0]?.value ?? [];
        if (!conseillersItinerants.includes(conseillerId) && itinerant) {
          conseillersItinerants.push(conseillerId);
          nouveauLieu.conseillersItinerants = conseillersItinerants;
        }
      }

      if (nouveauLieu._id !== null) {
        dispatch(permanenceActions.updatePermanence(nouveauLieu._id, conseillerId, nouveauLieu, true, null));
      } else {
        dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, true, null));
      }
    } else if (errorsForm?.lengthError === 0 && clickSubmit && isUpdate) {
      dispatch(permanenceActions.updatePermanences(fields, conseillerId, permanences));
    } else if (errorsForm?.lengthError > 0 && clickSubmit === true) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setClickSubmit(false);
  }, [errorsForm]);

  return (
    <div className="rf-col-offset-1 rf-col-4">
      <button className="rf-btn validation-btn rf-mb-4w" onClick={handleSubmit}>Enregistrer et revenir &agrave; l&rsquo;accueil</button>
      <div className="rf-mb-12w">
        ( <span className="obligatoire">*</span> ) champs obligatoires
      </div>
    </div>
  );
}

Validation.propTypes = {
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
  isUpdate: PropTypes.bool,
  permanences: PropTypes.array,
};

export default Validation;
