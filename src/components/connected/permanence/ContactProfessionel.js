import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import telephoneHorsMetropole from '../../../data/indicatifs.json';

function ContactProfessionel({ codeDepartement }) {

  const erreurTypeCnFS = useSelector(state => state.permanence?.erreurTypeCnFS);
  const erreurTelephonePro = useSelector(state => state.permanence?.erreurTelephonePro);
  const erreurEmailPro = useSelector(state => state.permanence?.erreurEmailPro);

  let indicatif = codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33';

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-offset-1 rf-col-11 rf-mt-9w">
          Vous &ecirc;tes :
          <fieldset className="rf-fieldset rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="CnFS" name="typeCnFS" value="CnFS" required="required" />
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFS">
                Conseiller.&egrave;re num&eacute;rique France Services
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="CnFSCoord" name="typeCnFS" value="CnFSCoord" required="required" />
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFSCoord">
                  Conseiller.&egrave;re num&eacute;rique France Services Coordinateur.ice
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="rf-col-1 rf-mt-10w col-logo">
          <img className="hexagone" src="logos/permanences/hexagone.svg"/>
        </div>
        <div className="rf-col-11">
          <h2 className="sous-titre rf-mt-9w rf-mb-3w">Informations de contact professionnel</h2>
        </div>

        <div className="rf-col-offset-1 rf-col-5 rf-mb-6w">
          <label className={erreurEmailPro ? 'rf-label invalid' : 'rf-label' } htmlFor="emailPro">
            Courriel professionnel
            <span className="baseline">Si votre structure vous a fourni une adresse mail, vous pouvez la renseigner ici.</span>
            <input className={erreurEmailPro ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
              id="emailPro" name="emailPro" />
          </label>
          { erreurEmailPro &&
            <p className="text-error rf-mb-n3w">{erreurEmailPro}</p>
          }
        </div>
        <div className="rf-col-5"></div>
        <div className="rf-col-offset-1 rf-col-5 rf-mb-6w">
          <label className={erreurTelephonePro ? 'rf-label invalid' : 'rf-label' } htmlFor="telephone-pro">
            T&eacute;l&eacute;phone professionel
            <span className="baseline">Si votre structure vous en a fourni un.</span>
            <input className={erreurTelephonePro ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="tel"
              id="telephone-pro" name="telephonePro" placeholder={indicatif + ' XXX XXX XXX'}/>
          </label>
          { erreurTelephonePro &&
            <p className="text-error rf-mb-n3w">{erreurTelephonePro}</p>
          }
        </div>
      </div>
    </div>
  );
}
ContactProfessionel.propTypes = {
  codeDepartement: PropTypes.string,
};
export default ContactProfessionel;
