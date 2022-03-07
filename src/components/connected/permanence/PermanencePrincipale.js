import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { permanenceActions } from '../../../actions';

import ListPermanences from './ListPermanences';
import Recapitulatif from './Recapitulatif';
import Horaires from './Horaires';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';

function PermanencePrincipale({ structure }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence?.errorsFormulaire?.errors);
  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur?.principalLieuActivite)[0]?.principalLieuActivite;

  const adresseStructure = structure?.insee?.etablissement?.adresse;

  function handleAdresse(estLieuPrincipal) {
    dispatch(permanenceActions.updateField('estLieuPrincipal', estLieuPrincipal));
    /*
    dispatch(permanenceActions.updateLieuPrincipal(estLieuPrincipal));
    if (estLieuPrincipal) {
      dispatch(permanenceActions.updateField('principal_nomEnseigne', structure?.nom));
      dispatch(permanenceActions.updateField('principal_siret', structure?.siret));
      dispatch(permanenceActions.initAdresse('principal_', adresseStructure));
    }
    */
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
        <div className={erreurAdresseExact ? 'rf-col-12 invalid rf-mb-7w' : 'rf-col-12 rf-mb-7w'}>
            Votre structure d&rsquo;accueil mentionn&eacute;e ci-dessus est-elle votre <b>lieu d&rsquo;activit&eacute; principal</b> ?&nbsp;
          <span className="obligatoire">*</span>
          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="Oui" name="principalLieuActivite" value="Oui" required="required" onClick={() => {
                  handleAdresse(true);
                }}/>
                <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Oui">
                  Oui
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="Non" name="principalLieuActivite" value="Non"
                  required="required" onClick={() => {
                    handleAdresse(false);
                  }}
                />
                <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Non">
                  Non
                </label>
              </div>
            </div>
          </fieldset>
          { erreurAdresseExact &&
            <p className="text-error rf-mb-n3w">{erreurAdresseExact}</p>
          }
        </div>
      </div>

      <ListPermanences prefixId="principal_" />

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
  structure: PropTypes.object
};

export default PermanencePrincipale;
