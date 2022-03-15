import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import InputText from './Components/InputText';
import InputCheckbox from './Components/InputCheckbox';

function Adresse({ codeDepartement, prefixId }) {

  const fields = useSelector(state => state.permanence.fields);
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

  let indicatif = codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33';
  return (
    <>
      {(prefixId !== 'principal_' ||
      (prefixId === 'principal_' && fields.filter(field => field.name === 'estLieuPrincipal')[0]?.value === false)) &&
        <>
          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <InputText
              textLabel={ prefixId === 'principal_' ? <Fragment>Nom de votre lieu d&rsquo;activit&eacute; principal</Fragment> :
                <Fragment>Nom de votre lieu d&rsquo;activit&eacute;</Fragment> }
              errorInput={erreurLieuActivite}
              nameInput= {prefixId + 'nomEnseigne'}
              requiredInput={true}
              baselineInput="Il sera affich&eacute; sur la carte nationale des conseillers num&eacute;riques, et sera modifiable."
              valueInput={fields.filter(field => field.name === prefixId + 'nomEnseigne')[0]?.value ?? ''}
            />
          </div>
          <div className="rf-col-4"></div>
        </>
      }
      {prefixId !== 'principal_' &&
        <>
          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-10 rf-mb-6w">
            <InputCheckbox
              textLabel="Lieu d&rsquo;activit&eacute; itin&eacute;rant (exemple&nbsp;: bus)"
              errorInput={null}
              nameInput={ prefixId + 'intinerant' }
              baselineInput="Chaque point d&rsquo;itin&eacute;rance doit être enregistr&eacute; comme un nouveau lieu d&rsquo;activit&eacute;."
            />
          </div>
          {!fields.filter(field => field.name === String(prefixId) + 'checkboxSiret')[0]?.value &&
            <>
              <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
                <InputText
                  textLabel="Num&eacute;ro de Siret"
                  errorInput={erreurSiret}
                  nameInput= {prefixId + 'siret'}
                  baselineInput={
                    <a className="link" href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                      O&ugrave; trouver un num&eacute;ro de Siret&nbsp;?
                    </a>
                  }
                  valueInput={fields.filter(field => field.name === prefixId + 'siret')[0]?.value ?? ''}
                />
              </div>
              <div className="rf-col-4"></div>
            </>
          }
          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-10 rf-mb-6w">
            <InputCheckbox
              textLabel="La structure n&rsquo;a pas de num&eacute;ro de Siret"
              errorInput={null}
              nameInput={ prefixId + 'checkboxSiret' }
              baselineInput="Si l&rsquo;adresse pr&eacute;-remplie par le num&eacute;ro de Siret ne correspond pas &agrave;
              votre lieu d&rsquo;activit&eacute;, vous pouvez cochez la case ci-dessus."
              classBaseline="toggle-siret"
            />
          </div>
        </>
      }
      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Num&eacute;ro de voie"
          errorInput={erreurNumeroVoie}
          nameInput= {prefixId + 'numeroVoie'}
          requiredInput={true}
          valueInput={fields.filter(field => field.name === prefixId + 'numeroVoie')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Voie"
          errorInput={erreurRueVoie}
          nameInput= {prefixId + 'rueVoie'}
          requiredInput={true}
          valueInput={fields.filter(field => field.name === prefixId + 'rueVoie')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Code postal"
          errorInput={erreurcodePostal}
          nameInput= {prefixId + 'codePostal'}
          requiredInput={true}
          valueInput={fields.filter(field => field.name === prefixId + 'codePostal')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Ville"
          errorInput={erreurVille}
          nameInput= {prefixId + 'ville'}
          requiredInput={true}
          valueInput={fields.filter(field => field.name === prefixId + 'ville')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="T&eacute;l&eacute;phone de la structure"
          errorInput={erreurNumeroTelephone}
          nameInput= {prefixId + 'numeroTelephone'}
          baselineInput="Accueil. Vous pouvez laisser vide si la structure n&rsquo;a pas de t&eacute;l&eacute;phone d&rsquo;accueil."
          valueInput={fields.filter(field => field.name === prefixId + 'numeroTelephone')[0]?.value ?? ''}
          placeholderInput={indicatif + ' XXX XXX XXX'}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Mail de la structure"
          errorInput={erreurEmail}
          nameInput= {prefixId + 'email'}
          baselineInput="Mail g&eacute;n&eacute;rique (accueil). Vous pouvez laisser vide si la structure n&rsquo;en a pas."
          valueInput={fields.filter(field => field.name === prefixId + 'email')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <InputText
          textLabel="Site web de la structure"
          errorInput={erreurSiteWeb}
          nameInput= {prefixId + 'siteWeb'}
          baselineInput="Vous pouvez laisser vide la structure n&rsquo;en a pas."
          valueInput={fields.filter(field => field.name === prefixId + 'siteWeb')[0]?.value ?? ''}
        />
      </div>
      <div className="rf-col-4"></div>
    </>
  );
}

Adresse.propTypes = {
  codeDepartement: PropTypes.string,
  adressePermanence: PropTypes.object,
  nomEnseignePermanence: PropTypes.string,
  prefixId: PropTypes.string,
  secondaireId: PropTypes.number,
};

export default Adresse;
