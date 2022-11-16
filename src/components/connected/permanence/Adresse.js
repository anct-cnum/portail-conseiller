import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import InputText from './Components/InputText';
import InputCheckbox from './Components/InputCheckbox';
import CarteAdresse from './Components/CarteAdresse';
import ButtonLocalisation from './Components/ButtonLocalisation';
import SelectAdresse from './Components/SelectAdresse';

function Adresse({ codeDepartement, prefixId, isUpdate, chargeCarteFistSecondaire }) {

  const fields = useSelector(state => state.permanence?.fields);
  const disabledFields = useSelector(state => state.permanence?.disabledFields);
  const codePostal = fields?.filter(field => field.name === prefixId + 'codePostal')[0]?.value;

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurLieuActivite = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'nomEnseigne'])[0]?.[prefixId + 'nomEnseigne'];
  const erreurSiret = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'siret'])[0]?.[prefixId + 'siret'];
  const erreurNumeroVoie = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'numeroVoie'])[0]?.[prefixId + 'numeroVoie'];
  const erreurRueVoie = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'rueVoie'])[0]?.[prefixId + 'rueVoie'];
  const erreurcodePostal = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'codePostal'])[0]?.[prefixId + 'codePostal'];
  const erreurVille = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'ville'])[0]?.[prefixId + 'ville'];
  const erreurNumeroTelephone = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'numeroTelephone'])[0]?.[prefixId + 'numeroTelephone'];
  const erreurEmail = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'email'])[0]?.[prefixId + 'email'];
  const erreurSiteWeb = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'siteWeb'])[0]?.[prefixId + 'siteWeb'];
  const erreurLocation = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'location'])[0]?.[prefixId + 'location'];

  const estDisabled = disabledFields?.filter(field => field.id === prefixId)[0]?.value;

  const [indicatif, setIndicatif] = useState(codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33');

  useEffect(() => {
    if (codePostal?.length === 5) {
      setIndicatif(telephoneHorsMetropole?.find(item => item.codeDepartement === codePostal.substr(0, 3))?.indicatif ?? '+33');
    }
  }, [codePostal]);

  return (
    <>
      {(prefixId !== 'principal_' ||
       (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
        <>
          {!fields?.filter(field => field.name === String(prefixId) + 'checkboxSiret')[0]?.value &&
            <>
              <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
                <InputText
                  textLabel="Num&eacute;ro de Siret"
                  errorInput={erreurSiret}
                  nameInput= {prefixId + 'siret'}
                  baselineInput={<>
                    <a className="link" href="https://annuaire-entreprises.data.gouv.fr/?mtm_campaign=Conseiller_numériqueFS"
                      title="Lien vers https://annuaire-entreprises.data.gouv.fr/" target="blank" rel="noreferrer">
                      O&ugrave; trouver un num&eacute;ro de Siret&nbsp;?
                    </a><span>&nbsp;Pensez &eacute;galement &agrave; vous renseigner aupr&egrave;s de vos collaborateurs.</span></>
                  }
                  valueInput={fields?.filter(field => field.name === prefixId + 'siret')[0]?.value ?? ''}
                  prefixId={prefixId}
                />
              </div>
            </>
          }
          <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-10 fr-mb-6w">
            <InputCheckbox
              textLabel="La structure n&rsquo;a pas de num&eacute;ro de Siret"
              errorInput={null}
              prefixId={prefixId}
              nameInput="checkboxSiret"
              baselineInput="Si l&rsquo;adresse pr&eacute;-remplie par le num&eacute;ro de Siret ne correspond pas &agrave;
              votre lieu d&rsquo;activit&eacute;, vous pouvez cocher la case ci-dessus."
              classBaseline="toggle-siret"
            />
          </div>
        </>
      }

      {(prefixId !== 'principal_' ||
      (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
        <>
          <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
            <InputText disabled={estDisabled}
              textLabel={ prefixId === 'principal_' ? <Fragment>Nom de votre lieu d&rsquo;activit&eacute; principal</Fragment> :
                <Fragment>Nom de votre lieu d&rsquo;activit&eacute;</Fragment> }
              errorInput={erreurLieuActivite}
              nameInput= {prefixId + 'nomEnseigne'}
              requiredInput={true}
              baselineInput="Il sera affich&eacute; sur la carte nationale des conseillers num&eacute;riques, et sera modifiable."
              valueInput={fields?.filter(field => field.name === prefixId + 'nomEnseigne')[0]?.value ?? ''}
            />
          </div>

          <div className="fr-col-5"></div>
        </>
      }

      {prefixId !== 'principal_' &&
        <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-10 fr-mb-6w">
          <InputCheckbox
            textLabel="Lieu d&rsquo;activit&eacute; itin&eacute;rant (exemple&nbsp;: bus)"
            errorInput={null}
            prefixId={prefixId}
            nameInput="itinerant"
            baselineInput="Chaque point d&rsquo;itin&eacute;rance doit être enregistr&eacute; comme un nouveau lieu d&rsquo;activit&eacute;."
          />
        </div>
      }

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5">
        <InputText disabled={estDisabled}
          textLabel="Num&eacute;ro de voie"
          errorInput={erreurNumeroVoie}
          nameInput= {prefixId + 'numeroVoie'}
          requiredInput={false}
          valueInput={fields?.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? ''}
          classInput="fr-mb-6w"
        />
      </div>

      <div className="fr-col-4"></div>

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5">
        <InputText disabled={estDisabled}
          textLabel="Voie"
          errorInput={erreurRueVoie}
          nameInput= {prefixId + 'rueVoie'}
          requiredInput={true}
          valueInput={fields?.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? ''}
          classInput="fr-mb-6w"
        />
      </div>

      <div className="fr-col-4"></div>

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5">
        <InputText disabled={estDisabled}
          textLabel="Code postal"
          errorInput={erreurcodePostal}
          nameInput= {prefixId + 'codePostal'}
          requiredInput={true}
          valueInput={fields?.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? ''}
          classInput="fr-mb-6w"
        />

        <InputText disabled={estDisabled}
          textLabel="Ville"
          errorInput={erreurVille}
          nameInput= {prefixId + 'ville'}
          requiredInput={true}
          valueInput={fields?.filter(field => field.name === prefixId + 'ville')[0]?.value ?? ''}
          classInput="fr-mb-6w"
        />

        <div>
          <SelectAdresse prefixId={prefixId}
            errorInput={erreurLocation}
            isUpdate={isUpdate}
            estStructure={fields?.filter(field => field.name === 'estStructure')[0]?.value ?? null}/>
        </div>

        <div className="localisation-btn-position">
          <ButtonLocalisation prefixId={prefixId} />
        </div>
      </div>

      <div className="fr-col-sm-12 fr-col-md-4">
      {chargeCarteFistSecondaire === 'loading' ? <CarteAdresse prefixId={prefixId}/> : '' }
      {!chargeCarteFistSecondaire && <CarteAdresse prefixId={prefixId}/> }
      </div>

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
        <InputText
          textLabel="T&eacute;l&eacute;phone de la structure"
          errorInput={erreurNumeroTelephone}
          nameInput= {prefixId + 'numeroTelephone'}
          baselineInput="Accueil. Vous pouvez laisser vide si la structure n&rsquo;a pas de t&eacute;l&eacute;phone d&rsquo;accueil."
          valueInput={fields?.filter(field => field.name === prefixId + 'numeroTelephone')[0]?.value ?? ''}
          placeholderInput={indicatif}
          indicatif={indicatif}
        />
      </div>
      <div className="fr-col-4"></div>

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
        <InputText
          textLabel="Mail de la structure"
          errorInput={erreurEmail}
          nameInput= {prefixId + 'email'}
          baselineInput="Mail g&eacute;n&eacute;rique (accueil). Vous pouvez laisser vide si la structure n&rsquo;en a pas."
          valueInput={fields?.filter(field => field.name === prefixId + 'email')[0]?.value ?? ''}
        />
      </div>
      <div className="fr-col-4"></div>

      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
        <InputText
          textLabel="Site web de la structure"
          errorInput={erreurSiteWeb}
          nameInput= {prefixId + 'siteWeb'}
          baselineInput="Vous pouvez laisser vide si la structure n&rsquo;en a pas."
          valueInput={fields?.filter(field => field.name === prefixId + 'siteWeb')[0]?.value ?? ''}
        />
      </div>
      <div className="fr-col-4"></div>

    </>
  );
}

Adresse.propTypes = {
  codeDepartement: PropTypes.string,
  prefixId: PropTypes.string,
  isUpdate: PropTypes.bool,
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  chargeCarteFistSecondaire: PropTypes.string,
};

export default Adresse;
