import React from 'react';
import { useSelector } from 'react-redux';

function ContactProfessionel() {

  const erreurTypeCnFS = useSelector(state => state.permanence?.erreurTypeCnFS);

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-offset-1 rf-col-11 rf-mt-9w">
          Vous êtes :
          <fieldset className="rf-fieldset rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="CnFS" name="typeCnFS" value="CnFS" required="required" />
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFS">
                Conseiller.ère numérique France Services
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="CnFSCoord" name="typeCnFS" value="CnFSCoord" required="required" />
                <label className={erreurTypeCnFS ? 'rf-label invalid' : 'rf-label' } htmlFor="CnFSCoord">
                  Conseiller.ère numérique France Services Coordinateur.ice
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="rf-col-1 rf-mt-11w col-logo">
          <img className="hexagone" src="logos/permanences/hexagone.svg"/>
        </div>
        <div className="rf-col-11">
          <h2 className="rf-mt-9w rf-mb-3w">Informations de contact professionnel</h2>
        </div>
      </div>
    </div>
  );
}

export default ContactProfessionel;
