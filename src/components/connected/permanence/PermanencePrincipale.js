import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { permanenceActions } from '../../../actions';

import ListPermanences from './ListPermanences';
import Recapitulatif from './Recapitulatif';
import Horaires from './Horaires';
import Adresse from './Adresse';
import TypeAcces from './TypeAcces';

function PermanencePrincipale({ permanence, structure }) {
  const dispatch = useDispatch();

  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const siretStructure = `${permanence?.siret ?? structure?.siret}`;
  const isAdresseCachee = useSelector(state => state.permanence?.isAdresseCachee);
  const erreursFormulaire = useSelector(state => state.permanence?.errorsFormulaire?.errors);

  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur?.adresseExact)[0]?.adresseExact;


  const [inputs, setInputs] = useState({
    lieuActivite: '',
    siret: '',
    numeroTelephone: '',
    email: '',
    siteWeb: '',
    adresseExact: null
  });

  const { adresseExact } = inputs;

  function handleAdresse(hide) {
    dispatch(permanenceActions.cacherAdresse(hide));
    if (hide) {
      adresseStructure.siret = siretStructure;
      dispatch(permanenceActions.initAdresse(adresseStructure));
    } else {
      setInputs(inputs => ({ ...inputs, siret: '' }));
    }
  }

  useEffect(() => {
    if (permanence) {
      setInputs({
        lieuActivite: permanence?.nomEnseigne,
        siret: permanence?.siret,
        numeroTelephone: permanence?.numeroTelephone,
        email: permanence?.email,
        siteWeb: permanence?.siteWeb ?? '',
        adresseExact: true
      });
    }
  }, [permanence]);
  return (
    <>
      <Recapitulatif
        nomStructure={permanence?.nomEnseigne ?? structure?.nom}
        siret={permanence?.siret ? String(permanence?.siret) : structure?.siret}
        adresseStructure={permanence?.adresse ?? adresseStructure}
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
                <input type="radio" id="Oui" name="adresseExact" value="Oui" defaultChecked={adresseExact} required="required" onClick={() => {
                  handleAdresse(true);
                }}/>
                <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Oui">
                  Oui
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="Non" name="adresseExact" value="Non" defaultChecked={!adresseExact && adresseExact !== null}
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

      <ListPermanences isAdresseCachee={isAdresseCachee}/>

      <Adresse isAdresseCachee={isAdresseCachee}/>

      <TypeAcces isAdresseCachee={isAdresseCachee} />

      <Horaires horairesPermanence={permanence?.horaires}/>
    </>
  );
}

PermanencePrincipale.propTypes = {
  permanence: PropTypes.object,
  structure: PropTypes.object
};

export default PermanencePrincipale;
