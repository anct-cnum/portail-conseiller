import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import { permanenceActions } from '../../../actions';

function ContactProfessionel({ conseiller }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeCnFS = erreursFormulaire?.filter(erreur => erreur?.estCoordinateur)[0]?.estCoordinateur;
  const erreurTelephonePro = erreursFormulaire?.filter(erreur => erreur?.telephonePro)[0]?.telephonePro;
  const erreurEmailPro = erreursFormulaire?.filter(erreur => erreur?.emailPro)[0]?.emailPro;

  let indicatif = conseiller?.codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === conseiller.codeDepartement).indicatif : '+33';

  const [inputs, setInputs] = useState({
    estCoordinateur: String(conseiller?.estCoordinateur) ?? null,
    emailPro: conseiller?.emailPro ?? '',
    telephonePro: conseiller?.telephonePro ?? '',
  });

  const { emailPro, telephonePro } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(permanenceActions.updateField(name, name === 'estCoordinateur' ? value === 'true' : value));
  }

  const onFocus = e => {
    e.target.value = indicatif;
  };

  useEffect(() => {
    if (conseiller?.emailPro) {
      dispatch(permanenceActions.updateField('emailPro', conseiller.emailPro));
    }
    if (conseiller?.telephonePro) {
      dispatch(permanenceActions.updateField('telephonePro', conseiller.telephonePro));
    }
    dispatch(permanenceActions.updateField('estCoordinateur', conseiller?.estCoordinateur === 'true'));

  }, [conseiller]);

  return (
    <div className="fr-container">
      <div className="fr-grid-row">
        <div className="fr-col-offset-1 fr-col-11 fr-mt-9w">
          Vous &ecirc;tes&nbsp;<span className="obligatoire">*</span>&nbsp;
          <fieldset className="fr-fieldset fr-mt-2w">
            <div className="fr-fieldset__content">
              <div className="fr-radio-group">
                <input type="radio" id="CnFS" name="estCoordinateur" value="false" required="required"
                  defaultChecked={!conseiller?.estCoordinateur ?? false} onClick={handleChange}/>
                <label className={erreurTypeCnFS ? 'fr-label invalid' : 'fr-label' } htmlFor="CnFS">
                Conseiller·&egrave;re num&eacute;rique France Services
                </label>
              </div>
              <div className="fr-radio-group">
                <input type="radio" id="CnFSCoord" name="estCoordinateur" value="true" required="required"
                  defaultChecked={conseiller?.estCoordinateur ?? false} onClick={handleChange}/>
                <label className={erreurTypeCnFS ? 'fr-label invalid' : 'fr-label' } htmlFor="CnFSCoord">
                  Conseiller·&egrave;re num&eacute;rique France Services Coordinateur.ice
                </label>
              </div>
            </div>
          </fieldset>
          { erreurTypeCnFS &&
            <p className="text-error fr-mb-n3w">{erreurTypeCnFS}</p>
          }
        </div>

        <div className="fr-col-1 fr-mt-10w col-logo">
          <img className="hexagone" src="/logos/permanences/hexagone.svg"/>
        </div>
        <div className="fr-col-11">
          <h2 className="sous-titre fr-mt-9w fr-mb-5w">Informations de contact professionnel</h2>
        </div>
        <div className="fr-col-offset-1 fr-col-11 fr-mb-5w">
          {conseiller.prenom + ' ' + conseiller.nom}
        </div>
        <div className="fr-col-offset-1 fr-col-10 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
          <label className={erreurEmailPro ? 'fr-label invalid' : 'fr-label' } htmlFor="emailPro">
            Courriel professionnel
            <span className="baseline">Si votre structure vous a fourni une adresse mail, vous pouvez la renseigner ici.</span>
            <input className={erreurEmailPro ? 'fr-input fr-mt-2v input-error' : 'fr-input fr-mt-2v'} type="text"
              id="emailPro" name="emailPro" value={emailPro} onChange={handleChange}/>
          </label>
          { erreurEmailPro &&
            <p className="text-error fr-mb-n3w">{erreurEmailPro}</p>
          }
        </div>
        <div className="fr-col-5"></div>
        <div className="fr-col-offset-1 fr-col-10 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
          <label className={erreurTelephonePro ? 'fr-label invalid' : 'fr-label' } htmlFor="telephone-pro">
            T&eacute;l&eacute;phone professionnel
            <span className="baseline">Si votre structure vous en a fourni un.</span>
            <input className={erreurTelephonePro ? 'fr-input fr-mt-2v input-error' : 'fr-input fr-mt-2v'} type="tel"
              id="telephone-pro" name="telephonePro" placeholder={indicatif} value={telephonePro}
              onChange={handleChange} onFocus={onFocus} />
          </label>
          { erreurTelephonePro &&
            <p className="text-error fr-mb-n3w">{erreurTelephonePro}</p>
          }
        </div>
        <div className="fr-col-offset-1 fr-col-10 fr-mb-3w conditions">
          Conform&eacute;ment aux CGU, mes informations de contact seront affich&eacute;es sur la carte nationale Conseillers num&eacute;rique Frances Services,
          et pourront &eacute;galement &ecirc;tre utilis&eacute;es sur d&rsquo;autres supports num&eacute;riques ou imprim&eacute;s dans le cadre du dispositif.
          En cas de d&eacute;part, mes informations seront supprim&eacute;es de l&rsquo;annuaire et de sa base de donn&eacute;es.
        </div>
        <div className="fr-col-offset-1 fr-col-10 fr-mb-9w astuce">
          Astuce : vous pourrez modifier vos informations de contact en cliquant sur votre nom en haut &agrave; droite de l&rsquo;&eacute;cran.
        </div>
      </div>
    </div>
  );
}
ContactProfessionel.propTypes = {
  conseiller: PropTypes.object
};
export default ContactProfessionel;
