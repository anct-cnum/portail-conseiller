import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-loader-spinner';
import telephoneHorsMetropole from '../../../data/indicatifs.json';
import InputText from './Components/InputText';
import InputCheckbox from './Components/InputCheckbox';
import CarteAdresse from './Components/CarteAdresse';
import { permanenceActions } from '../../../actions';

function Adresse({ codeDepartement, prefixId, chargeCarteFistSecondaire }) {
  const dispatch = useDispatch();
  const fields = useSelector(state => state.permanence?.fields);
  const disabledFields = useSelector(state => state.permanence?.disabledFields);
  const codePostal = fields?.filter(field => field.name === prefixId + 'codePostal')[0]?.value;

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurLieuActivite = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'nomEnseigne'])[0]?.[prefixId + 'nomEnseigne'];
  const erreurSiret = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'siret'])[0]?.[prefixId + 'siret'];
  const erreurNumeroTelephone = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'numeroTelephone'])[0]?.[prefixId + 'numeroTelephone'];
  const erreurEmail = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'email'])[0]?.[prefixId + 'email'];
  const erreurSiteWeb = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'siteWeb'])[0]?.[prefixId + 'siteWeb'];
  const erreurAdresse = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'adresse'])[0]?.[prefixId + 'adresse'];
  const erreurLocalisation = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'location'])[0]?.[prefixId + 'location'];
  const listeAdresses = useSelector(state => state.permanence?.listeAdresses);
  const loadingAdresses = useSelector(state => state.permanence?.loadingAdresses);
  const erreurAdresseApi = useSelector(state => state.permanence?.errorAdresses);
  const erreurAddresseIntrouvable = useSelector(state => state.permanence?.errorAdresseIntrouvable);

  const geocodeAdresses = useSelector(state => state.permanence?.geocodeAdresses);
  const geocodeAdresse = geocodeAdresses?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
  const estDisabled = disabledFields?.filter(field => field.id === prefixId)[0]?.value;

  const [indicatif, setIndicatif] = useState(codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33');

  const onClickAdresse = adresse => {
    dispatch(permanenceActions.setAdresse(adresse, prefixId));
    const adresseEl = document.getElementById(prefixId + 'adresse');
    adresseEl.value = adresse?.properties?.label;
  };

  useEffect(() => {
    if (codePostal?.length === 5) {
      setIndicatif(telephoneHorsMetropole?.find(item => item.codeDepartement === codePostal.substr(0, 3))?.indicatif ?? '+33');
    }
    if (geocodeAdresse) {
      dispatch(permanenceActions.updateField(prefixId + 'location', geocodeAdresse ??
      { type: 'Point', coordinates: process.env.REACT_APP_INIT_COORDONNEES.split(',').split(',') }));
    }
  }, [codePostal, geocodeAdresse]);

  return (
    <>
      <div className="fr-col-offset-1 fr-col-11 fr-col-sm-7 fr-col-md-5 fr-mb-6w">
        {(prefixId !== 'principal_' ||
          (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
          <>
            {!fields?.filter(field => field.name === String(prefixId) + 'checkboxSiret')[0]?.value &&
              <div className="fr-mb-6w">
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
            }
            <div className="fr-mb-6w">
              <InputCheckbox
                textLabel="La structure n&rsquo;a pas de num&eacute;ro de Siret"
                errorInput={null}
                prefixId={prefixId}
                nameInput= "checkboxSiret"
                requiredInput={true}
                baselineInput="Si l&rsquo;adresse pr&eacute;-remplie par le num&eacute;ro de Siret ne correspond pas &agrave;
                votre lieu d&rsquo;activit&eacute;, vous pouvez cocher la case ci-dessus."
                classBaseline="toggle-siret"
              />
            </div>
          </>
        }

        {(prefixId !== 'principal_' ||
         (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
        <div className="fr-mb-6w">
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
        }

        {prefixId !== 'principal_' &&
        <div className="fr-mb-6w">
          <InputCheckbox
            textLabel="Lieu d&rsquo;activit&eacute; itin&eacute;rant (exemple&nbsp;: bus)"
            errorInput={null}
            prefixId={prefixId}
            nameInput="itinerant"
            baselineInput="Chaque point d&rsquo;itin&eacute;rance doit être enregistr&eacute; comme un nouveau lieu d&rsquo;activit&eacute;."
          />
        </div>
        }
        <InputText
          textLabel="Entrez l&rsquo;adresse de votre lieu d&rsquo;activit&eacute;"
          baselineInput="Remplissez le champ avec l&rsquo;adresse compl&egrave;te de votre lieu d&rsquo;activit&eacute;"
          errorInput={erreurAdresse || erreurLocalisation}
          nameInput= {prefixId + 'adresse'}
          requiredInput={true}
          valueInput={fields?.filter(field => field.name === prefixId + 'adresse')[0]?.value ?? ''}
          prefixId={prefixId}
        />
        {listeAdresses?.length > 0 &&
          <div className="listeAdresses">
            {loadingAdresses &&
              <div className="spinnerDiv">
                <Spinner
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  visible={true}
                />
              </div>
            }
            <div className="adressesTrouvees">
              { !loadingAdresses && listeAdresses?.map((adresse, idx) => {
                return (
                  <div key={idx} className="adresse" onClick={() => {
                    onClickAdresse(adresse);
                  }}>
                    {adresse?.properties?.label?.toUpperCase()}
                  </div>
                );
              })}
            </div>
            <div className="adresseIntrouvable">
              <InputCheckbox
                textLabel="Si votre adresse est introuvable, merci de cocher la case"
                errorInput={null}
                prefixId={prefixId}
                disabled={fields?.filter(field => field.name === prefixId + 'adresseIntrouvable')[0]?.value}
                nameInput="adresseIntrouvable"
              />
            </div>
          </div>
        }
        {erreurAdresseApi &&
          <div className="text-error fr-mb-n3w fr-mt-3w">
            Une erreur est survenue lors de la recherche de votre adresse, veuillez r&eacute;essayer ult&eacute;rieurement...
          </div>
        }
        {erreurAddresseIntrouvable &&
          <div className="text-error fr-mb-n3w fr-mt-3w">
            Une erreur est survenue lors de la recherche de votre demande d&rsquo;adresse, veuillez la renseigner de nouveau.
          </div>
        }
        { erreurLocalisation &&
          <div className="text-error fr-mb-n3w fr-mt-3w">
            D&eacute;sol&eacute;, votre adresse est introuvable. Pour faire remonter le problème&nbsp;
            <a className="link" href="https://go.crisp.chat/chat/embed/?website_id=ea669e13-e40f-40c8-be23-e43565c0e62c"
              title="Lien vers l&rsquo;aide crisp" target="blank" rel="noopener noreferrer">
              contactez nous
            </a>. Notre équipe traitera votre demande.<br/>
            Dans cette attente, vos informations ne seront pas visibles sur la cartographie CnFS.
          </div>
        }
        <div className="fr-mt-6w">
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
      </div>

      <div className="fr-col-sm-12 fr-col-md-4">
        {chargeCarteFistSecondaire === 'loading' ? <CarteAdresse prefixId={prefixId}/> : '' }
        {!chargeCarteFistSecondaire && <CarteAdresse prefixId={prefixId}/> }
      </div>

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
  permanence: PropTypes.object,
  chargeCarteFistSecondaire: PropTypes.string,
};

export default Adresse;
