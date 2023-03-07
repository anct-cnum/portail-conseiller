import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { permanenceActions } from '../../../actions';

import horairesInitiales from '../../../data/horairesInitiales.json';
import ListPermanences from './ListPermanences';
import Recapitulatif from './Recapitulatif';
import Horaires from './Horaires';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';
import { formatAdresse, formatRue } from '../../../utils/functionFormats';

function PermanencePrincipale({ structure, conseillerId, isUpdate }) {
  const dispatch = useDispatch();

  const listPermanences = useSelector(state => state.permanence?.permanences);
  const loadingHoraires = useSelector(state => state.permanence?.loadingHoraires);
  const erreursFormulaire = useSelector(state => state.permanence?.errorsFormulaire?.errors);
  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur?.estStructure)[0]?.estStructure;
  const adresseStructure = structure?.insee?.etablissement?.adresse;

  const [defaultCheckedOui, setDefaultCheckedOui] = useState(null);
  const [defaultCheckedNon, setDefaultCheckedNon] = useState(null);
  const [estClique, setEstClique] = useState(false);

  const fillPermanencePrincipale = permanencePrincipale => {
    const ruevoie = formatRue(permanencePrincipale?.adresse?.rue, adresseStructure?.type_voie ?? '', adresseStructure?.nom_voie ?? '');
    const adresse = formatAdresse(permanencePrincipale?.adresse, adresseStructure, ruevoie, permanencePrincipale?.adresseIntrouvable);
    dispatch(permanenceActions.updateField('principal_idPermanence', permanencePrincipale?._id ?? null));
    dispatch(permanenceActions.updateField('lieuPrincipalPour', permanencePrincipale?.lieuPrincipalPour));
    dispatch(permanenceActions.updateField('principal_numeroTelephone', permanencePrincipale?.numeroTelephone ?? null));
    dispatch(permanenceActions.updateField('principal_email', permanencePrincipale?.email ?? null));
    dispatch(permanenceActions.updateField('principal_siteWeb', permanencePrincipale?.siteWeb ?? null));

    dispatch(permanenceActions.updateField('principal_typeAcces', permanencePrincipale?.typeAcces));
    permanencePrincipale?.typeAcces?.forEach(type => {
      dispatch(permanenceActions.updateField('principal_' + type, true));
    });
    const horaires = permanencePrincipale?.horaires ?? horairesInitiales;
    dispatch(permanenceActions.updateField('principal_horaires', { principal_horaires: horaires }));
    dispatch(permanenceActions.updateField('principal_conseillers', permanencePrincipale?.conseillers ?? null));
    dispatch(permanenceActions.updateField('principal_nomEnseigne', permanencePrincipale?.nomEnseigne ?? structure?.nom));
    dispatch(permanenceActions.updateField('principal_siret', permanencePrincipale?.siret ?? structure?.siret));
    dispatch(permanenceActions.updateField('principal_numeroVoie',
      permanencePrincipale?.adresse?.numeroRue ?? adresseStructure?.numero_voie));
    dispatch(permanenceActions.updateField('principal_rueVoie', ruevoie));
    dispatch(permanenceActions.updateField('principal_codePostal',
      permanencePrincipale?.adresse?.codePostal ?? adresseStructure?.code_postal));
    dispatch(permanenceActions.updateField('principal_ville',
      permanencePrincipale?.adresse?.ville?.toUpperCase() ?? adresseStructure?.localite?.toUpperCase()));
    dispatch(permanenceActions.updateField('principal_adresse', adresse.toUpperCase()));
    dispatch(permanenceActions.updateField('principal_location', structure?.location));
    if (loadingHoraires) {
      loadingHoraires[0] = true;
      dispatch(permanenceActions.setHorairesLoading(loadingHoraires));
    }
    const adresseGeoloc = {
      numero: permanencePrincipale?.adresse?.numeroRue ?? adresseStructure?.numero_voie,
      rue: permanencePrincipale?.adresse?.rue ?? adresseStructure?.type_voie + ' ' + adresseStructure?.nom_voie,
      codePostal: permanencePrincipale?.adresse?.codePostal ?? adresseStructure?.code_postal,
      ville: permanencePrincipale?.adresse?.ville?.toUpperCase() ?? adresseStructure?.localite?.toUpperCase()
    };
    dispatch(permanenceActions.getGeocodeAdresse(adresseGeoloc, 'principal_'));
    dispatch(permanenceActions.disabledField('principal_', ruevoie?.trim() === '' ? false : !isUpdate));
  };

  function handleAdresse(estStructure) {
    setEstClique(true);
    dispatch(permanenceActions.updateField('estStructure', estStructure));
    dispatch(permanenceActions.updateField('principal_idPermanence', null));
    dispatch(permanenceActions.updateField('principal_numeroTelephone', null));
    dispatch(permanenceActions.updateField('principal_email', null));
    dispatch(permanenceActions.updateField('principal_siteWeb', null));
    dispatch(permanenceActions.updateField('principal_libre', null));
    dispatch(permanenceActions.updateField('principal_rdv', null));
    dispatch(permanenceActions.updateField('principal_prive', null));
    dispatch(permanenceActions.updateField('principal_horaires', horairesInitiales));
    dispatch(permanenceActions.updateField('principal_conseillers', null));
    dispatch(permanenceActions.updateField('principal_nomEnseigne', null));
    dispatch(permanenceActions.updateField('principal_siret', null));
    dispatch(permanenceActions.updateField('principal_numeroVoie', null));
    dispatch(permanenceActions.updateField('principal_rueVoie', null));
    dispatch(permanenceActions.updateField('principal_codePostal', null));
    dispatch(permanenceActions.updateField('principal_ville', null));
    dispatch(permanenceActions.updateField('principal_location', null));
    dispatch(permanenceActions.reserverPermanence({ prefixId: 'principal_', idPermanence: null }));

    if (estStructure) {
      const permanencePrincipale = listPermanences.find(permanence => permanence.structure.$id === structure?._id && permanence.estStructure === true);
      fillPermanencePrincipale(permanencePrincipale);
    } else {
      dispatch(permanenceActions.rebootGeocodeAdresse('principal_'));
      dispatch(permanenceActions.disabledField('principal_', false));
      dispatch(permanenceActions.updateField('principal_checkboxSiret', false));
    }
  }

  useEffect(() => {
    if (isUpdate && listPermanences) {
      const permanencePrincipale = listPermanences.find(permanence => permanence?.lieuPrincipalPour?.includes(conseillerId));
      fillPermanencePrincipale(permanencePrincipale);
      dispatch(permanenceActions.updateField('estStructure', permanencePrincipale?.estStructure));
      if (permanencePrincipale?.estStructure === true) {
        setDefaultCheckedOui(true);
      } else {
        setDefaultCheckedNon(true);
      }
      setEstClique(true);
    }
  }, [listPermanences]);

  return (
    <>
      <Recapitulatif
        nomStructure={structure?.nom}
        siret={structure?.siret}
        adresseStructure={adresseStructure}
      />

      <div className="fr-col-1 col-logo fr-mt-10w">
        <img className="pin" src="logos/permanences/pin.svg"/>
      </div>
      <div className="fr-col-11">
        <h2 className="sous-titre fr-mt-9w fr-mb-7w">Votre lieu d&rsquo;activit&eacute; principal</h2>
      </div>

      <div className="fr-col-offset-1 fr-col-11">
        <div className={(erreurAdresseExact && !estClique) ? 'fr-col-12 invalid fr-mb-7w' : 'fr-col-12 fr-mb-7w'}>
          Le nom et l&rsquo;adresse de la structure d&rsquo;accueil mentionn&eacute;e ci-dessus est-elle votre&nbsp;
          <b>lieu d&rsquo;activit&eacute; principal</b> ?&nbsp;
          <span className="obligatoire">*</span>
          <fieldset className="fr-fieldset fr-fieldset--inline fr-mt-2w">
            <div className="fr-fieldset__content">
              <div className="fr-radio-group">
                <input type="radio" id="Oui" name="principalLieuActivite" value="Oui"
                  defaultChecked={defaultCheckedOui}
                  required="required" onClick={() => {
                    handleAdresse(true);
                  }}/>
                <label className={(erreurAdresseExact && !estClique) ? 'fr-label invalid' : 'fr-label' } htmlFor="Oui">
                  Oui
                </label>
              </div>
              <div className="fr-radio-group">
                <input type="radio" id="Non" name="principalLieuActivite" value="Non" defaultChecked={defaultCheckedNon}
                  required="required" onClick={() => {
                    handleAdresse(false);
                  }}
                />
                <label className={(erreurAdresseExact && !estClique) ? 'fr-label invalid' : 'fr-label' } htmlFor="Non">
                  Non
                </label>
              </div>
            </div>
          </fieldset>
          { (erreurAdresseExact && !estClique) &&
            <p className="text-error fr-mb-n3w">{erreurAdresseExact}</p>
          }
        </div>
      </div>
      {estClique &&
        <>
          <ListPermanences prefixId="principal_" conseillerId={conseillerId} />

          <Adresse
            codeDepartement={structure?.codeDepartement}
            prefixId="principal_"
          />

          <TypeAcces prefixId="principal_" islieuPrincipal={true}/>

          <Horaires prefixId="principal_" horairesId={0}/>
        </>
      }
    </>
  );
}

PermanencePrincipale.propTypes = {
  permanence: PropTypes.object,
  structure: PropTypes.object,
  conseillerId: PropTypes.string,
  isUpdate: PropTypes.bool,
};

export default PermanencePrincipale;
