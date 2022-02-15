import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AjouterAutrePermanence from './AjouterAutrePermanence';
import ListPermanences from './ListPermanences';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Adresse from './Adresse';

import { permanenceActions } from '../../../actions';

function PermanenceSecondaire() {
  const dispatch = useDispatch();

  const showLieuSecondaire = useSelector(state => state.permanence.showLieuSecondaire);

  function handleSecondaire(show) {
    dispatch(permanenceActions.montrerLieuSecondaire(show));
  }

  return (
    <>
      <div className="rf-col-1 col-logo">

        <img className="pin rf-mt-8w" src="logos/permanences/pin.svg"/>
      </div>
      <div className="rf-col-8 ">
        <h2 className="sous-titre rf-mt-7w rf-mb-4w">
          Lieu d&rsquo;activit&eacute; secondaire
          <span className="baseline rf-mt-1w">
            Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
            d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
          </span>
        </h2>
      </div>

      <div className="rf-col-offset-1 rf-col-11 rf-mb-7w">
        Effectuez-vous des accompagnements dans un lieu d&rsquo;activit&eacute; secondaire ?
        <span className="baseline rf-mt-1w">Vous pourrez ajouter et modifier vos lieux d&rsquo;activit&eacute; plus tard.</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="secondaire-Oui" name="secondaire" value="true" onClick={() => {
                handleSecondaire(true);
              }} />
              <label className="rf-label" htmlFor="secondaire-Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="secondaire-Non" name="secondaire" value="false"
                defaultChecked={true} onClick={() => {
                  handleSecondaire(false);
                }} />
              <label className="rf-label" htmlFor="secondaire-Non">Non</label>
            </div>
          </div>
        </fieldset>
      </div>
      {showLieuSecondaire &&
      <>
        <ListPermanences />

        <Adresse />

        <TypeAcces />

        <Horaires />

        <AjouterAutrePermanence />
      </>
      }
    </>
  );
}

PermanenceSecondaire.propTypes = {
};

export default PermanenceSecondaire;
