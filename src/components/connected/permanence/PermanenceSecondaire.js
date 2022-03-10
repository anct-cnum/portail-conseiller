import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AjouterAutrePermanence from './AjouterAutrePermanence';
import ListPermanences from './ListPermanences';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Adresse from './Adresse';

import { permanenceActions } from '../../../actions';

function PermanenceSecondaire({ structure }) {
  const dispatch = useDispatch();

  const lieuxSecondaires = Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => ({}));
  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const fields = useSelector(state => state.permanence.fields);

  const [show, setShow] = useState(
    Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false))
  );

  function handleSecondaire(showPermanence, idx) {
    show[idx] = showPermanence;
    setShow(show);
    dispatch(permanenceActions.updateField('submit_and_next_' + idx, showPermanence));

  }

  return (
    <>
      <div className="rf-container">
        <div className="rf-grid-row">
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
                    handleSecondaire(true, 0);
                  }} />
                  <label className="rf-label" htmlFor="secondaire-Oui">Oui</label>
                </div>
                <div className="rf-radio-group">
                  <input type="radio" id="secondaire-Non" name="secondaire" value="false"
                    defaultChecked={true} onClick={() => {
                      handleSecondaire(false, 0);
                    }} />
                  <label className="rf-label" htmlFor="secondaire-Non">Non</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      {lieuxSecondaires && lieuxSecondaires.map((lieuSecondaire, idx) => {
        return (
          <div key={idx} className="rf-container">
            <div className={(idx === 0 && show[0]) ||
              (idx > 0 && fields.filter(field => field.name === 'submit_and_next_' + idx)[0]?.value) ? 'rf-grid-row' : 'hide'}>

              <ListPermanences prefixId={ 'secondaire_' + idx + '_'} />
              <Adresse
                codeDepartement={structure?.codeDepartement}
                adressePermanence={adresseStructure}
                nomEnseignePermanence={structure?.nom}
                prefixId={ 'secondaire_' + idx + '_'}
                secondaireId={ idx }
                islieuPrincipal={false}
              />
              <TypeAcces prefixId={ 'secondaire_' + idx + '_'} islieuPrincipal={false} />
              <Horaires prefixId={ 'secondaire_' + idx + '_'} />
              <AjouterAutrePermanence secondaireId={ idx } />

            </div>
          </div>
        );
      })
      }
    </>

  );
}

PermanenceSecondaire.propTypes = {
  structure: PropTypes.object,
  tableauIndex: PropTypes.array,
};

export default PermanenceSecondaire;
