import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';
import { useDispatch, useSelector } from 'react-redux';
import telephoneHorsMetropole from '../../../data/indicatifs.json';

function Adresse({ codeDepartement, adressePermanence }) {

  console.log(adressePermanence);
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);

  const erreurLieuActivite = erreursFormulaire?.filter(erreur => erreur?.nomEnseigne)[0]?.nomEnseigne;
  const erreurSiret = erreursFormulaire?.filter(erreur => erreur?.siret)[0]?.siret;
  const erreurNumeroVoie = erreursFormulaire?.filter(erreur => erreur?.numeroVoie)[0]?.numeroVoie;
  const erreurRueVoie = erreursFormulaire?.filter(erreur => erreur?.rueVoie)[0]?.rueVoie;
  const erreurcodePostal = erreursFormulaire?.filter(erreur => erreur?.codePostal)[0]?.codePostal;
  const erreurVille = erreursFormulaire?.filter(erreur => erreur?.ville)[0]?.ville;
  const isAdresseCachee = useSelector(state => state.permanence?.isAdresseCachee);
  const erreurNumeroTelephone = erreursFormulaire?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
  const erreurEmail = erreursFormulaire?.filter(erreur => erreur?.email)[0]?.email;
  const erreurSiteWeb = erreursFormulaire?.filter(erreur => erreur?.siteWeb)[0]?.siteWeb;

  let indicatif = codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33';

  const [inputs, setInputs] = useState({
    nomEnseigne: '',
    siret: '',
    numeroVoie: '',
    rueVoie: '',
    codePostal: '',
    ville: ''
  });

  const { nomEnseigne, siret, numeroTelephone, email, siteWeb, numeroVoie, rueVoie, codePostal, ville } = inputs;


  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(permanenceActions.updateField(name, value));
  }

  useEffect(() => {
    if (adressePermanence) {
      setInputs({
        nomEnseigne: adressePermanence?.nomEnseigne,
        siret: adressePermanence?.siret,
        numeroVoie: adressePermanence?.numeroRue,
        rueVoie: adressePermanence?.rue,
        codePostal: adressePermanence?.codePostal,
        ville: adressePermanence?.ville,
      });
    }
  }, [adressePermanence]);

  useEffect(() => {
    if (!isAdresseCachee) {
      setInputs({
        nomEnseigne: '',
        siret: '',
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: ''
      });
    } else {
      setInputs({
        nomEnseigne: adressePermanence?.nomEnseigne,
        siret: adressePermanence?.siret,
        numeroVoie: adressePermanence?.numeroRue,
        rueVoie: adressePermanence?.rue,
        codePostal: adressePermanence?.codePostal,
        ville: adressePermanence?.ville,
      });
    }
  }, [isAdresseCachee]);

  return (
    <>
      {!isAdresseCachee &&
        <>
          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurLieuActivite ? 'rf-label invalid' : 'rf-label' } htmlFor="lieu-activite">
              Nom de votre lieu d&rsquo;activit&eacute; principal <span className="obligatoire">*</span>
              <span className="baseline">Il sera affich&eacute; sur la carte nationale des conseillers num&eacute;riques, et sera modifiable.</span>
              <input className={erreurLieuActivite ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'}
                type="text" id="nom-enseigne" name="nomEnseigne" value={nomEnseigne}
                required="required" onChange={handleChange}/>
            </label>
            { erreurLieuActivite &&
              <p className="text-error rf-mb-n3w">{erreurLieuActivite}</p>
            }
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <div className="rf-checkbox-group">
              <input type="checkbox" id="intinerant" name="intinerant" value={true}/>
              <label className="rf-label" htmlFor="intinerant">
                Lieu d&rsquo;activit&eacute; itin&eacute;rant (exemple&nbsp;: bus)
              </label>
              <span className="baseline">
                Chaque point d&rsquo;itin&eacute;rance doit être enregistr&eacute; comme un nouveau lieu d&rsquo;activit&eacute;.
              </span>
            </div>
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurSiret ? 'rf-label invalid' : 'rf-label' } htmlFor="siret">
              Num&eacute;ro de Siret
              <span className="baseline">
                <a className="link" href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                  O&ugrave; trouver un num&eacute;ro de Siret&nbsp;?
                </a>
              </span>
              <input className={erreurSiret ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'}
                type="string" id="siret" name="siret" value={siret} onChange={handleChange} />
            </label>
            { erreurSiret &&
            <p className="text-error rf-mb-n3w">{erreurSiret}</p>
            }
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurNumeroVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="numero-voie">
              N° de voie <span className="obligatoire">*</span>
              <input className={erreurNumeroVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
                id="numero-voie" name="numeroVoie" required="required" onChange={handleChange} value={numeroVoie}/>
            </label>
            { erreurNumeroVoie &&
              <p className="text-error rf-mb-n3w">{erreurNumeroVoie}</p>
            }
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurRueVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="rue-voie">
              Voie <span className="obligatoire">*</span>
              <input className={erreurRueVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
                id="rue-voie" name="rueVoie" required="required" onChange={handleChange} value={rueVoie}/>
            </label>
            { erreurRueVoie &&
              <p className="text-error rf-mb-n3w">{erreurRueVoie}</p>
            }
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurcodePostal ? 'rf-label invalid' : 'rf-label' } htmlFor="code-postal">
              Code postal <span className="obligatoire">*</span>
              <input className={erreurcodePostal ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
                id="code-postal" name="codePostal" required="required" onChange={handleChange} value={codePostal}/>
            </label>
            { erreurcodePostal &&
              <p className="text-error rf-mb-n3w">{erreurcodePostal}</p>
            }
          </div>

          <div className="rf-col-4"></div>

          <div className="rf-col-offset-1 rf-col-11 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
            <label className={erreurVille ? 'rf-label invalid' : 'rf-label' } htmlFor="ville">
              Ville <span className="obligatoire">*</span>
              <input className={erreurVille ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
                id="ville" name="ville" required="required" onChange={handleChange} value={ville}/>
            </label>
            { erreurVille &&
              <p className="text-error rf-mb-n3w">{erreurVille}</p>
            }
          </div>

          <div className="rf-col-4"></div>
        </>
      }

      <div className="rf-col-offset-1 rf-col-10 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <label className={erreurNumeroTelephone ? 'rf-label invalid' : 'rf-label' } htmlFor="numero-telephone">
          T&eacute;l&eacute;phone de la structure
          <span className="baseline">Accueil. Vous pouvez laisser vide si la structure n&rsquo;a pas de t&eacute;l&eacute;phone d&rsquo;accueil.</span>
          <input className={erreurNumeroTelephone ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="tel"
            id="numero-telephone" name="numeroTelephone" required="required" placeholder={indicatif + ' XXX XXX XXX'}
            value={numeroTelephone} onChange={handleChange}/>
        </label>
        { erreurNumeroTelephone &&
          <p className="text-error rf-mb-n3w">{erreurNumeroTelephone}</p>
        }
      </div>

      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-10 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <label className={erreurEmail ? 'rf-label invalid' : 'rf-label' } htmlFor="email">
          Mail de la structure
          <span className="baseline">Mail g&eacute;n&eacute;rique (accueil). Vous pouvez laisser vide si la structure n&rsquo;en a pas.</span>
          <input className={erreurEmail ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="email" name="email" required="required" value={email} onChange={handleChange}/>
        </label>
        { erreurEmail &&
          <p className="text-error rf-mb-n3w">{erreurEmail}</p>
        }
      </div>

      <div className="rf-col-4"></div>

      <div className="rf-col-offset-1 rf-col-10 rf-col-sm-7 rf-col-md-5 rf-mb-6w">
        <label className={erreurSiteWeb ? 'rf-label invalid' : 'rf-label' } htmlFor="site-web">
          Site web de la structure
          <span className="baseline">Vous pouvez laisser vide la structure n&rsquo;en a pas.</span>
          <input className={erreurSiteWeb ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="url"
            id="site-web" name="siteWeb" value={siteWeb} onChange={handleChange}/>
        </label>
        { erreurSiteWeb &&
          <p className="text-error rf-mb-n3w">{erreurSiteWeb}</p>
        }
      </div>

      <div className="rf-col-4"></div>
    </>
  );
}

Adresse.propTypes = {
  codeDepartement: PropTypes.string,
  adressePermanence: PropTypes.object,
};

export default Adresse;
