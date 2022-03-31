import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { permanenceActions } from '../../../actions';

import horairesInitiales from '../../../data/horairesInitiales.json';
import ListPermanences from './ListPermanences';
import Recapitulatif from './Recapitulatif';
import Horaires from './Horaires';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';

function PermanencePrincipale({ structure, conseillerId }) {
  const dispatch = useDispatch();

  const listPermanences = useSelector(state => state.permanence?.permanences);
  const erreursFormulaire = useSelector(state => state.permanence?.errorsFormulaire?.errors);
  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur?.estStructure)[0]?.estStructure;
  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const fields = useSelector(state => state.permanence?.fields);
  const boolLieuPrincipal = fields?.filter(field => field.name === 'estStructure')[0]?.value === null;
  
  function handleAdresse(estStructure) {
    dispatch(permanenceActions.updateField('principal_estStructure', estStructure));
    dispatch(permanenceActions.updateField('principal_idPermanence', null));
    dispatch(permanenceActions.updateField('principal_numeroTelephone', null));
    dispatch(permanenceActions.updateField('principal_email', null));
    dispatch(permanenceActions.updateField('principal_siteWeb', null));
    dispatch(permanenceActions.updateField('principal_typeAcces', null));
    dispatch(permanenceActions.updateField('principal_horaires', horairesInitiales));
    dispatch(permanenceActions.updateField('principal_conseillers', null));
    dispatch(permanenceActions.updateField('principal_nomEnseigne', null));
    dispatch(permanenceActions.updateField('principal_siret', null));
    dispatch(permanenceActions.updateField('principal_numeroVoie', null));
    dispatch(permanenceActions.updateField('principal_rueVoie', null));
    dispatch(permanenceActions.updateField('principal_codePostal', null));
    dispatch(permanenceActions.updateField('principal_ville', null));

    if (estStructure) {
      const permanencePrincipale = listPermanences.find(permanence => permanence.structure.$id === structure._id && permanence.estStructure === true);
      dispatch(permanenceActions.updateField('principal_idPermanence', permanencePrincipale?._id ?? null));
      dispatch(permanenceActions.updateField('principal_numeroTelephone', permanencePrincipale?.numeroTelephone ?? null));
      dispatch(permanenceActions.updateField('principal_email', permanencePrincipale?.email ?? null));
      dispatch(permanenceActions.updateField('principal_siteWeb', permanencePrincipale?.siteWeb ?? null));
      dispatch(permanenceActions.updateField('principal_typeAcces', permanencePrincipale?.typeAcces ?? null));
      dispatch(permanenceActions.updateField('principal_horaires', permanencePrincipale?.horaires ?? horairesInitiales));
      dispatch(permanenceActions.updateField('principal_conseillers', permanencePrincipale?.conseillers ?? null));
      dispatch(permanenceActions.updateField('principal_nomEnseigne', permanencePrincipale?.nomEnseigne ?? structure?.nom));
      dispatch(permanenceActions.updateField('principal_siret', permanencePrincipale?.siret ?? structure?.siret));
      dispatch(permanenceActions.updateField('principal_numeroVoie',
        permanencePrincipale?.adresse?.numeroRue ?? adresseStructure.numero_voie));
      dispatch(permanenceActions.updateField('principal_rueVoie',
        permanencePrincipale?.adresse?.rue ?? adresseStructure.type_voie + ' ' + adresseStructure.nom_voie));
      dispatch(permanenceActions.updateField('principal_codePostal',
        permanencePrincipale?.adresse?.codePostal ?? adresseStructure.code_postal));
      dispatch(permanenceActions.updateField('principal_ville',
        permanencePrincipale?.adresse?.ville.toUpperCase() ?? adresseStructure.localite.toUpperCase()));
    }
  }

  return (
    <>
      <Recapitulatif
        nomStructure={structure?.nom}
        siret={structure?.siret}
        adresseStructure={adresseStructure}
      />

      <div className="rf-col-1 col-logo rf-mt-10w">
        <img className="pin" src="logos/permanences/pin.svg"/>
      </div>
      <div className="rf-col-11">
        <h2 className="sous-titre rf-mt-9w rf-mb-7w">Votre lieu d’activité principal</h2>
      </div>

      <div className="rf-col-offset-1 rf-col-11">
        <div className={(erreurAdresseExact && boolLieuPrincipal) ? 'rf-col-12 invalid rf-mb-7w' : 'rf-col-12 rf-mb-7w'}>
            Votre structure d&rsquo;accueil mentionn&eacute;e ci-dessus est-elle votre <b>lieu d&rsquo;activit&eacute; principal</b> ?&nbsp;
          <span className="obligatoire">*</span>
          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="Oui" name="principalLieuActivite" value="Oui" required="required" onClick={() => {
                  handleAdresse(true);
                }}/>
                <label className={(erreurAdresseExact && boolLieuPrincipal) ? 'rf-label invalid' : 'rf-label' } htmlFor="Oui">
                  Oui
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="Non" name="principalLieuActivite" value="Non"
                  required="required" onClick={() => {
                    handleAdresse(false);
                  }}
                />
                <label className={(erreurAdresseExact && boolLieuPrincipal) ? 'rf-label invalid' : 'rf-label' } htmlFor="Non">
                  Non
                </label>
              </div>
            </div>
          </fieldset>
          { (erreurAdresseExact && boolLieuPrincipal === undefined) &&
            <p className="text-error rf-mb-n3w">{erreurAdresseExact}</p>
          }
        </div>
      </div>

      <ListPermanences prefixId="principal_" conseillerId={conseillerId} />

      <Adresse
        codeDepartement={structure?.codeDepartement}
        adressePermanence={adresseStructure}
        nomEnseignePermanence={structure?.nom}
        prefixId="principal_"
        islieuPrincipal={true}
      />

      <TypeAcces prefixId="principal_" islieuPrincipal={true} />

      <Horaires prefixId="principal_" />
    </>
  );
}

PermanencePrincipale.propTypes = {
  permanence: PropTypes.object,
  structure: PropTypes.object,
  conseillerId: PropTypes.string,
};

export default PermanencePrincipale;
