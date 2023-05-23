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
import { formatTelephone } from '../../../utils/functionFormats';

function PermanenceSecondaire({ structure, structureId, conseillerId, codeDepartement }) {
  const dispatch = useDispatch();

  const form = useSelector(state => state.permanence);
  const lieuxSecondaires = Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => ({}));
  const fields = useSelector(state => state.permanence?.fields);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);
  const validForms = useSelector(state => state.permanence.formulairesValides);
  const prefixId = useSelector(state => state.permanence?.prefixIdLieuEnregistrable);
  const listPermanences = useSelector(state => state.permanence?.permanences);
  const permanencePrincipale = listPermanences && listPermanences?.find(permanence => permanence?.lieuPrincipalPour?.includes(conseillerId));

  const [show, setShow] = useState(
    Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false))
  );

  const [clickSubmit, setClickSubmit] = useState(false);
  const [ouiBtn, setOuiBtn] = useState(false);

  function falseSecondaire() {
    setOuiBtn(false);
    show[0] = false;
    // dans le cas où il y a une erreur dans la form principal, garder le prefixId en 'principal_'
    // pour pouvoir l'enregsitrer en recochant oui ou enregistrement directe
    dispatch(permanenceActions.updateLieuEnregistrable(!permanencePrincipale ? 'principal_' : null));
    dispatch(permanenceActions.montrerLieuSecondaire(show));
    // condition nescessaire pour éviter la double enregistrement
    if (permanencePrincipale) {
      dispatch(permanenceActions.updateField('submit_and_next_0', false));
    }
  }

  function handleSecondaire(hasSecondaire) {
    if (hasSecondaire) {

      const typeAcces = [
        fields?.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
        fields?.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
        fields?.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
      ].filter(n => n);
      dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));
      setClickSubmit(true);
      setOuiBtn(true);
      if (prefixId === 'principal_') {
        dispatch(permanenceActions.verifyFormulaire(form, 'principal_'));
      }
      dispatch(permanenceActions.updateLieuEnregistrable(!permanencePrincipale ? 'principal_' : 'secondaire_0_'));
      if (!prefixId) {
        // dans le cas où le prefixId est à null (auparavant selectionner sur false)
        // si je ne met pas condition du if , c'ets à cause de cela u'il y a le doublon perm enregsitrer en meme temp !
        dispatch(permanenceActions.updateField('submit_and_next_0', true));
      }
      show[0] = true;
      dispatch(permanenceActions.montrerLieuSecondaire(show));
    } else {
      falseSecondaire();
    }
  }

  useEffect(async () => {
    if ((errorsForm?.lengthError === 0) && clickSubmit) {

      const conseillers = fields?.filter(field => field.name === prefixId + 'conseillers')[0]?.value ?? [];
      if (!conseillers.includes(conseillerId)) {
        conseillers.push(conseillerId);
      }

      const lieuPrincipalPour = fields?.filter(field => field.name === 'lieuPrincipalPour')[0]?.value ?? [];
      if (!lieuPrincipalPour.includes(conseillerId)) {
        lieuPrincipalPour.push(conseillerId);
      }
      let nouveauLieu = {
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
        location: fields.filter(field => field.name === prefixId + 'location')[0]?.value ?? null,
        horaires: fields.filter(field => field.name === prefixId + 'horaires')[0]?.value[prefixId + 'horaires'] ?? horairesInitiales,
        typeAcces: fields.filter(field => field.name === prefixId + 'typeAcces')[0]?.value ?? null,
        numeroRue: fields.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? null,
        rue: fields.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? null,
        codePostal: fields.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? null,
        codeCommune: fields.filter(field => field.name === prefixId + 'codeCommune')[0]?.value ?? null,
        ville: fields.filter(field => field.name === prefixId + 'ville')[0]?.value ?? null,
        conseillers: conseillers,
        structureId: structureId,
        hasPermanence: true,
        lieuPrincipalPour: lieuPrincipalPour,
      };

      nouveauLieu.telephonePro = formatTelephone(nouveauLieu.telephonePro, codeDepartement);
      nouveauLieu.numeroTelephone = formatTelephone(nouveauLieu.numeroTelephone, codeDepartement);
      nouveauLieu = JSON.parse(JSON.stringify(nouveauLieu).replace(/"\s+|\s+"/g, '"'));

      if (nouveauLieu?._id !== null && nouveauLieu?._id !== 'nouveau') {
        await dispatch(permanenceActions.updatePermanence(nouveauLieu._id, conseillerId, nouveauLieu, false, 'secondaire_0_'));
      } else if (prefixId) {
        nouveauLieu._id = null;
        await dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu, false, 'secondaire_0_'));
      }

      show[0] = true;
      dispatch(permanenceActions.updateField('submit_and_next_0', true));
      dispatch(permanenceActions.montrerLieuSecondaire(show));
      dispatch(permanenceActions.getListePermanences(structureId));

    } else if (errorsForm?.lengthError > 0 && clickSubmit) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (!permanencePrincipale) {
        falseSecondaire();
      }
    }
    setShow(show);
    setClickSubmit(false);
  }, [errorsForm]);

  useEffect(() => {

  }, [validForms]);

  return (
    <>
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-1 col-logo">
            <img className="pin fr-mt-8w" src="logos/permanences/pin.svg"/>
          </div>
          <div className="fr-col-8 ">
            <h2 className="sous-titre fr-mt-7w fr-mb-4w">
              Lieu d&rsquo;activit&eacute; secondaire
              {(!listPermanences?.find(permanence => permanence?.lieuPrincipalPour.includes(conseillerId))) &&
                <span className="baseline fr-mt-1w">
                  Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                  d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                </span>
              }
            </h2>
          </div>
          {/* on cache la partie oui/non quand j'ai au moins un lieux principale et 1 lieux secondaire de créer */}
          {listPermanences?.filter(permanence => permanence?.conseillers.includes(conseillerId))?.length < 2 &&
              <div className="fr-col-offset-1 fr-col-11 fr-mb-7w">
                Effectuez-vous des accompagnements dans un lieu d&rsquo;activit&eacute; secondaire ?
                <span className="baseline fr-mt-1w">Vous pourrez ajouter et modifier vos lieux d&rsquo;activit&eacute; plus tard.</span>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-mt-2w">
                  <div className="fr-fieldset__content">
                    <>
                      <div className="fr-radio-group">
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
                        <label className="fr-label" htmlFor="secondaire-Oui">Oui</label>
                      </div>

                      <div className="fr-radio-group">
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
                        <label className="fr-label" htmlFor="secondaire-Non">Non</label>
                      </div>
                    </>
                  </div>
                </fieldset>
              </div>
          }

        </div>
      </div>
      {lieuxSecondaires && lieuxSecondaires.map((lieuSecondaire, idx) => {
        return (
          <div key={idx} className="fr-container">
            <div className={(idx === 0 && show[0]) ||
              (idx > 0 && fields?.filter(field => field.name === 'submit_and_next_' + idx)[0]?.value) ? 'fr-grid-row' : 'hide'}>
              {idx >= 1 &&
                <>
                  <div className="fr-col-1 col-logo">
                    <img className="pin fr-mt-8w" src="logos/permanences/pin.svg"/>
                  </div>
                  <div className="fr-col-8 ">
                    <h2 className="sous-titre fr-mt-7w fr-mb-4w">
                      Lieu d&rsquo;activit&eacute; secondaire
                      {!(idx < listPermanences?.filter(permanence => permanence?.conseillers.includes(conseillerId)).length) &&
                        <span className="baseline fr-mt-1w">
                          Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                          d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                        </span>
                      }
                    </h2>
                  </div>
                </>
              }
              {idx + 2 > listPermanences?.filter(permanence => permanence?.conseillers.includes(conseillerId)).length &&
                <>
                  <ListPermanences prefixId={ 'secondaire_' + idx + '_'} conseillerId={conseillerId} firstTime={true}/>
                  <Adresse
                    codeDepartement={structure?.codeDepartement}
                    prefixId={ 'secondaire_' + idx + '_'}
                    chargeCarteFistSecondaire={(prefixId === `secondaire_${idx}_`) ? 'loading' : 'notLoading'}
                  />
                  <TypeAcces prefixId={ 'secondaire_' + idx + '_'} islieuPrincipal={false} />
                  <Horaires prefixId={ 'secondaire_' + idx + '_'} horairesId={idx + 1} />
                </>
              }
              {idx + 1 < listPermanences?.filter(permanence => permanence?.conseillers.includes(conseillerId)).length &&
                  <h5 className="fr-col-offset-1 fr-col-11 fr-mb-7w">
                    Lieu d&rsquo;activit&eacute; secondaire
                    {` ${listPermanences?.filter(permanence => permanence?.conseillers.includes(conseillerId))[idx + 1]?.nomEnseigne} `}
                    a bien &eacute;t&eacute; enregistr&eacute;
                  </h5>
              }
              {idx < 14 &&
                <AjouterAutrePermanence
                  secondaireId={ idx }
                  conseillerId={conseillerId}
                  structureId={structureId}
                  show={show}
                  codeDepartement={structure?.codeDepartement}/>
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
  codeDepartement: PropTypes.string,
};

export default PermanenceSecondaire;
