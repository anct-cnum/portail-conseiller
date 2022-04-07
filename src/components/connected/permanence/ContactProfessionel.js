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

  let indicatif = conseiller.codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === conseiller.codeDepartement).indicatif : '+33';

  const [inputs, setInputs] = useState({
    estCoordinateur: null,
    emailPro: conseiller.emailPro ?? '',
    telephonePro: conseiller.telephonePro ?? '',
  });

  const { emailPro, telephonePro } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(permanenceActions.updateField(name, value === 'true'));
  }

  const onFocus = e => {
    e.target.value = indicatif;
  };

  useEffect(() => {
    if (conseiller?.emailPro) {
      dispatch(permanenceActions.updateField('emailPro', conseiller.emailPro));
    }
    if (conseiller?.telephonePro) {
      dispatch(permanenceActions.updateField('emailPro', conseiller.telephonePro));
    }
  }, [conseiller]);

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-offset-1 rf-col-11 rf-mt-9w">
          Vous &ecirc;tes&nbsp;<span className="obligatoire">*</span>&nbsp;
          <fieldset className="rf-fieldset rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="CnFS" name="estCoordinateur" value="false" required="required" onClick={handleChange}/>
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFS">
                Conseiller·&egrave;re num&eacute;rique France Services
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="CnFSCoord" name="estCoordinateur" value="true" required="required" onClick={handleChange}/>
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFSCoord">
                  Conseiller·&egrave;re num&eacute;rique France Services Coordinateur.ice
                </label>
              </div>
            </div>
          </fieldset>
          { erreurTypeCnFS &&
            <p className="text-error rf-mb-n3w">{erreurTypeCnFS}</p>
          }
        </div>

        <div className="rf-col-1 rf-mt-10w col-logo">
          <img className="hexagone" src="logos/permanences/hexagone.svg"/>
        </div>
        <div className="rf-col-11">
          <h2 className="sous-titre rf-mt-9w rf-mb-5w">Informations de contact professionnel</h2>
        </div>
        <div className="rf-col-offset-1 rf-col-11 rf-mb-5w">
          {conseiller.prenom + ' ' + conseiller.nom}
        </div>
        <div className="rf-col-offset-1 rf-col-10 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
          <label className={erreurEmailPro ? 'rf-label invalid' : 'rf-label' } htmlFor="emailPro">
            Courriel professionnel
            <span className="baseline">Si votre structure vous a fourni une adresse mail, vous pouvez la renseigner ici.</span>
            <input className={erreurEmailPro ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
              id="emailPro" name="emailPro" value={emailPro} onChange={handleChange}/>
          </label>
          { erreurEmailPro &&
            <p className="text-error rf-mb-n3w">{erreurEmailPro}</p>
          }
        </div>
        <div className="rf-col-5"></div>
        <div className="rf-col-offset-1 rf-col-10 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
          <label className={erreurTelephonePro ? 'rf-label invalid' : 'rf-label' } htmlFor="telephone-pro">
            T&eacute;l&eacute;phone professionnel
            <span className="baseline">Si votre structure vous en a fourni un.</span>
            <input className={erreurTelephonePro ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="tel"
              id="telephone-pro" name="telephonePro" placeholder={indicatif} value={telephonePro}
              onChange={handleChange} onFocus={onFocus} />
          </label>
          { erreurTelephonePro &&
            <p className="text-error rf-mb-n3w">{erreurTelephonePro}</p>
          }
        </div>
        <div className="rf-col-offset-1 rf-col-10 rf-mb-9w conditions">
          Conform&eacute;ment aux CGU, mes informations de contact seront affich&eacute;es sur la carte nationale Conseillers num&eacute;rique Frances Services,
          et pourront &eacute;galement &ecirc;tre utilis&eacute;es sur d&rsquo;autres supports num&eacute;riques ou imprim&eacute;s dans le cadre du dispositif.
          En cas de d&eacute;part, mes informations seront supprim&eacute;es de l&rsquo;annuaire et de sa base de donn&eacute;es.
        </div>
        {/* En attente de l'écran
        <div className="rf-col-offset-1 rf-col-10 rf-mb-9w astuce">
          Astuce : vous pourrez modifier vos informations de contact en cliquant sur votre nom en haut &agrave; droite de l&rsquo;&eacute;cran.
        </div>
        */}
      </div>
    </div>
  );
}
ContactProfessionel.propTypes = {
  codeDepartement: PropTypes.string,
  conseiller: PropTypes.object,
};
export default ContactProfessionel;
