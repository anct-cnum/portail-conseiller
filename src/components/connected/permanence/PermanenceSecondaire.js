import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AjouterAutrePermanence from './AjouterAutrePermanence';
import ListPermanences from './ListPermanences';
import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Adresse from './Adresse';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { permanenceActions } from '../../../actions';

function PermanenceSecondaire({ structure, structureId, conseillerId }) {
  const dispatch = useDispatch();

  const form = useSelector(state => state.permanence);
  const lieuxSecondaires = Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => ({}));
  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const validForms = useSelector(state => state.permanence.formulairesValides);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);

  const [show, setShow] = useState(
    Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false))
  );

  const [clickSubmit, setClickSubmit] = useState(false);
  const [ouiBtn, setOuiBtn] = useState(false);

  function handleSecondaire(hasSecondaire) {
    if (hasSecondaire) {

      const typeAcces = [
        fields?.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
        fields?.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
        fields?.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
      ].filter(n => n);
      dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));

      dispatch(permanenceActions.verifyFormulaire(form));
      setClickSubmit(true);
      setOuiBtn(true);
    } else {
      show[0] = false;
      dispatch(permanenceActions.updateField('submit_and_next_0', false));
      dispatch(permanenceActions.montrerLieuSecondaire(show));
    }
  }

  useEffect(() => {

    if (errorsForm?.lengthError === 0 && clickSubmit) {
      const conseillers = fields.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];
      if (!conseillers.includes(conseillerId)) {
        conseillers.push(conseillerId);
      }

      const lieuPrincipalPour = fields.filter(field => field.name === 'lieuPrincipalPour')[0]?.value ?? [];
      if (!lieuPrincipalPour.includes(conseillerId)) {
        lieuPrincipalPour.push(conseillerId);
      }

      const nouveauLieu = {
        //Données du CNFS
        estCoordinateur: fields.filter(field => field.name === 'estCoordinateur')[0]?.value ?? null,
        emailPro: fields.filter(field => field.name === 'emailPro')[0]?.value ?? null,
        telephonePro: fields.filter(field => field.name === 'telephonePro')[0]?.value ?? null,
        //Données du lieu d'activité
        estStructure: prefixId === 'principal_' ? fields.filter(field => field.name === 'estStructure')[0]?.value : false,
        _id: fields.filter(field => field.name === prefixId + 'idPermanence')[0]?.value ?? null,
        nomEnseigne: fields.filter(field => field.name === prefixId + 'nomEnseigne')[0]?.value ?? null,
        numeroTelephone: fields.filter(field => field.name === prefixId + 'numeroTelephone')[0]?.value ?? null,
        email: fields.filter(field => field.name === prefixId + 'email')[0]?.value ?? null,
        siteWeb: fields.filter(field => field.name === prefixId + 'siteWeb')[0]?.value ?? null,
        siret: fields.filter(field => field.name === prefixId + 'siret')[0]?.value ?? null,
        adresse: {
          numeroRue: fields.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? null,
          rue: fields.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? null,
          codePostal: fields.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? null,
          ville: fields.filter(field => field.name === prefixId + 'ville')[0]?.value ?? null,
        },
        location: fields.filter(field => field.name === prefixId + 'location')[0]?.value ?? null,
        horaires: fields.filter(field => field.name === prefixId + 'horaires')[0]?.value[prefixId + 'horaires'] ?? horairesInitiales,
        typeAcces: fields.filter(field => field.name === prefixId + 'typeAcces')[0]?.value ?? null,
        conseillers: conseillers,
        structureId: structureId,
        showPermanenceForm: true,
        hasPermanence: false,
        lieuPrincipalPour: lieuPrincipalPour,
      };

      if (nouveauLieu._id !== null) {
        dispatch(permanenceActions.updatePermanence(nouveauLieu._id, conseillerId, nouveauLieu, false, 'secondaire_0_'));
      } else {
        dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, false, 'secondaire_0_'));
      }
      show[0] = true;
      dispatch(permanenceActions.updateField('submit_and_next_0', true));
      dispatch(permanenceActions.montrerLieuSecondaire(show));

    } else if (errorsForm?.lengthError > 0 && clickSubmit) {
      window.scrollTo(0, 0);
      setOuiBtn(false);
    }
    setShow(show);
    setClickSubmit(false);
  }, [errorsForm]);

  useEffect(() => {

  }, [validForms]);

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
                  {ouiBtn === true &&
                    <input type="radio" id="secondaire-Oui" name="secondaire" value="true" defaultChecked={true} onClick={() => {
                      handleSecondaire(true);
                    }} />
                  }
                  {ouiBtn === false &&
                    <input type="radio" id="secondaire-Oui" name="secondaire" value="true" onClick={() => {
                      handleSecondaire(true);
                    }} />
                  }
                  <label className="rf-label" htmlFor="secondaire-Oui">Oui</label>
                </div>

                <div className="rf-radio-group">
                  {ouiBtn === true &&
                    <input type="radio" id="secondaire-Non" name="secondaire" value="false" onClick={() => {
                      handleSecondaire(false);
                    }} />
                  }
                  {ouiBtn === false &&
                    <input type="radio" id="secondaire-Non" name="secondaire" value="false" defaultChecked={true} onClick={() => {
                      handleSecondaire(false);
                    }} />
                  }
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
              (idx > 0 && fields?.filter(field => field.name === 'submit_and_next_' + idx)[0]?.value) ? 'rf-grid-row' : 'hide'}>

              <ListPermanences prefixId={ 'secondaire_' + idx + '_'} conseillerId={conseillerId}/>
              <Adresse
                codeDepartement={structure?.codeDepartement}
                adressePermanence={adresseStructure}
                nomEnseignePermanence={structure?.nom}
                prefixId={ 'secondaire_' + idx + '_'}
                secondaireId={ idx }
                islieuPrincipal={false}
              />
              <TypeAcces prefixId={ 'secondaire_' + idx + '_'} islieuPrincipal={false} />
              <Horaires prefixId={ 'secondaire_' + idx + '_'} horairesId={idx + 1}/>
              {idx < 14 &&
                <AjouterAutrePermanence secondaireId={ idx } conseillerId={conseillerId} structureId={structureId} show={show} />
              }
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
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
};

export default PermanenceSecondaire;
