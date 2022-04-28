import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import horairesInitiales from '../../../../data/horairesInitiales.json';
import { useLocation } from 'react-router-dom';

function ButtonAjoutLieu({ secondaireId, conseillerId, structureId, show, isUpdate }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const form = useSelector(state => state.permanence);
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);

  const [clickSubmit, setClickSubmit] = useState(false);

  const onClick = () => {
    if (isUpdate) {
      show[secondaireId] = true;
      dispatch(permanenceActions.updateField('submit_and_next_' + secondaireId, true));
      dispatch(permanenceActions.montrerLieuSecondaire(show));
      dispatch(permanenceActions.updateLieuEnregistrable('secondaire_' + secondaireId + '_'));
    } else {
      const typeAcces = [
        fields.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
        fields.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
        fields.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
      ].filter(n => n);
      dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));
      dispatch(permanenceActions.verifyFormulaire(form));
    }
    setClickSubmit(true);
  };

  useEffect(() => {
    if (isUpdate) {

    } else {
      const submit = fields?.filter(field => field.name === 'submit_and_next_' + secondaireId)[0]?.value;
      if (errorsForm?.lengthError === 0 && submit === true && clickSubmit === true) {

        const conseillers = fields?.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];
        if (!conseillers.includes(conseillerId)) {
          conseillers.push(conseillerId);
        }

        const itinerant = fields?.filter(field => field.name === prefixId + 'itinerant')[0]?.value;
        const conseillersItinerants = fields?.filter(field => field.name === prefixId + 'conseillersItinerants')[0]?.value ?? [];
        if (!conseillersItinerants.includes(conseillerId) && itinerant) {
          conseillersItinerants.push(conseillerId);
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
          conseillersItinerants: conseillersItinerants,
          conseillers: conseillers,
          structureId: structureId,
          showPermanenceForm: location.pathname === '/accueil',
          hasPermanence: location.pathname === '/lieux-activite',
        };

        if (nouveauLieu._id !== null) {
          dispatch(permanenceActions.updatePermanence(nouveauLieu._id, conseillerId, nouveauLieu, false, 'secondaire_' + (secondaireId + 1) + '_'));
        } else {
          dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, false, 'secondaire_' + (secondaireId + 1) + '_'));
        }
        show[secondaireId + 1] = true;
        setClickSubmit(false);
        dispatch(permanenceActions.updateField('submit_and_next_' + (secondaireId + 1), true));
        dispatch(permanenceActions.montrerLieuSecondaire(show));
      } else if (errorsForm?.lengthError > 0 && submit === true && clickSubmit === true) {
        dispatch(permanenceActions.montrerLieuSecondaire(show));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

  }, [errorsForm]);

  return (
    <button id={'submit_and_next_' + (secondaireId + 1)} className="rf-btn nouveau-btn rf-mb-2w" onClick={() => {
      onClick();
    }}>
      Ajouter un autre lieu d&rsquo;activit&eacute; secondaire
    </button>
  );
}

ButtonAjoutLieu.propTypes = {
  show: PropTypes.array,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
  secondaireId: PropTypes.number,
  isUpdate: PropTypes.bool,
};

export default ButtonAjoutLieu;
