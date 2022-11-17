import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions } from '../../../actions/permanence.actions';

function Validation({ conseillerId, structureId, statut = 'principal_', redirectionValidation = null, codeDepartement, idPermanenceUrl }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);

  const [clickSubmit, setClickSubmit] = useState(false);
  let [redirection, setRedirection] = useState(redirectionValidation !== null ? redirectionValidation : '/accueil');

  function handleSubmit(redirection = '/accueil') {
    const typeAcces = [
      fields?.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
      fields?.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
      fields?.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
    ].filter(n => n);

    dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));
    dispatch(permanenceActions.verifyFormulaire(form, statut));

    setClickSubmit(true);
    setRedirection(redirection);
  }

  useEffect(() => {

    if (errorsForm?.lengthError === 0 && clickSubmit) {

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

      nouveauLieu.idOldPermanence = fields?.filter(field => field.name === 'idOldPermanence')[0]?.value ?? null;
      const PHONE_REGEX = /^(?:(?:\+)(33|590|596|594|262|269))(?:\d{3}){3}$/;
      const findIndicatif = telephoneHorsMetropole.find(r => r.codeDepartement === codeDepartement);
      nouveauLieu.telephonePro = nouveauLieu.telephonePro?.trim();
      const condition = value => !PHONE_REGEX.test(nouveauLieu.telephonePro) ?
        `${findIndicatif?.indicatif ?? '+33'}${value.substr(1)}` : value;
      nouveauLieu.telephonePro = nouveauLieu.telephonePro ? condition(nouveauLieu.telephonePro) : '';
      if (!PHONE_REGEX.test(nouveauLieu.telephonePro)) {
        nouveauLieu.telephonePro = null;
      }
      nouveauLieu.adresse = JSON.parse(JSON.stringify(nouveauLieu.adresse,
        (key, value) => (value === '') ? null : value
      ));
      if (redirection === 'cartographie') {
        redirection = nouveauLieu._id ?? conseillerId;
      }
      if (nouveauLieu._id !== null && nouveauLieu._id !== 'nouveau') {
        if (prefixId === 'principal_' && (idPermanenceUrl !== nouveauLieu._id)) {
          nouveauLieu.idOldPermanence = idPermanenceUrl;
        }
        dispatch(permanenceActions.updatePermanence(nouveauLieu?._id, conseillerId, nouveauLieu, true, null, redirection));
      } else if (prefixId) {
        if (prefixId === 'principal_') {
          nouveauLieu.idOldPermanence = idPermanenceUrl;
        }
        nouveauLieu._id = null;
        dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, true, null, redirection));
      } else if (prefixId === null) {
        dispatch(permanenceActions.validerPermanenceForm(conseillerId));
      }

    } else if (errorsForm?.lengthError > 0 && clickSubmit === true) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setClickSubmit(false);
  }, [errorsForm]);

  return (
    <>
      <div className="fr-col-offset-1 fr-col-4">
        <button className="fr-link fr-fi-external-link-line fr-link--icon-right validation-extern-btn" onClick={() => {
          handleSubmit('cartographie');
        }}>
          Enregistrer et afficher sur la carte nationale
        </button>
        <div className="fr-mb-12w fr-mt-4w">
          ( <span className="obligatoire">*</span> ) champs obligatoires
        </div>
      </div>

      <div className="fr-col-5">
        <button className="fr-btn validation-btn fr-mb-4w" onClick={() => {
          handleSubmit(redirection);
        }}>
          Enregistrer&nbsp;
          {
            statut === 'update' && <>les modifications</>
          }
          et revenir &agrave;&nbsp;
          {statut === null && <>l&rsquo;accueil</>}
          {statut !== null && <>la liste</>}
        </button>
      </div>


    </>

  );
}

Validation.propTypes = {
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
  redirectionValidation: PropTypes.string,
  statut: PropTypes.string,
  codeDepartement: PropTypes.string,
  idPermanenceUrl: PropTypes.string
};

export default Validation;
