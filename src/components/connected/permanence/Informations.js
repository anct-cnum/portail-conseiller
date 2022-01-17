import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';
import telephoneHorsMetropole from '../../../data/indicatifs.json';

function Informations({ codeDepartement, adresseStructure, siretStructure, permanence }) {
  const dispatch = useDispatch();
  const isAdresseCachee = useSelector(state => state.permanence?.isAdresseCachee);
  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);

  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur?.adresseExact)[0]?.adresseExact;
  const erreurLieuActivite = erreursFormulaire?.filter(erreur => erreur?.lieuActivite)[0]?.lieuActivite;
  const erreurNumeroTelephone = erreursFormulaire?.filter(erreur => erreur?.numeroTelephone)[0]?.numeroTelephone;
  const erreurEmail = erreursFormulaire?.filter(erreur => erreur?.email)[0]?.email;
  const erreurSiret = erreursFormulaire?.filter(erreur => erreur?.siret)[0]?.siret;
  const erreurSiteWeb = erreursFormulaire?.filter(erreur => erreur?.siteWeb)[0]?.siteWeb;

  let indicatif = codeDepartement?.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === codeDepartement).indicatif : '+33';

  const [inputs, setInputs] = useState({
    lieuActivite: '',
    siret: '',
    numeroTelephone: '',
    email: '',
    siteWeb: '',
    adresseExact: null
  });

  const { lieuActivite, siret, numeroTelephone, email, siteWeb, adresseExact } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(permanenceActions.updateField(name, value));
  }

  function handleAdresse(boolean) {
    dispatch(permanenceActions.cacherAdresse(boolean));
    if (boolean) {
      adresseStructure.siret = siretStructure;
      dispatch(permanenceActions.initAdresse(adresseStructure));
    } else {
      setInputs(inputs => ({ ...inputs, siret: '' }));
    }
  }

  useEffect(() => {
    if (permanence) {
      setInputs({
        lieuActivite: permanence?.nomEnseigne,
        siret: permanence?.siret,
        numeroTelephone: permanence?.numeroTelephone,
        email: permanence?.email,
        siteWeb: permanence?.siteWeb ? permanence?.siteWeb : '',
        adresseExact: true
      });
    }
  }, [permanence]);

  return (
    <>
      <div className={erreurAdresseExact ? 'question rf-col-12 invalid rf-mb-5w' :
        'question rf-col-12 rf-mb-5w'}>
        Ces informations correspondent-elles à votre lieu principal d&rsquo;activit&eacute; ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="Oui" name="adresseExact" value="Oui" defaultChecked={adresseExact} required="required" onClick={() => {
                handleAdresse(true);
              }}/>
              <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Oui">
                Oui
              </label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="Non" name="adresseExact" value="Non" defaultChecked={!adresseExact && adresseExact !== null}
                required="required" onClick={() => {
                  handleAdresse(false);
                }}
              />
              <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Non">
                Non
              </label>
            </div>
          </div>
        </fieldset>
        { erreurAdresseExact &&
          <p className="text-error rf-mb-n3w">{erreurAdresseExact}</p>
        }
      </div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurLieuActivite ? 'rf-label invalid' : 'rf-label' } htmlFor="lieu-activite">
          Nom de mon lieu principal d&rsquo;activit&eacute; <span className="obligatoire">*</span>
          <input className={erreurLieuActivite ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'}
            type="text" id="lieu-activite" name="lieuActivite" value={lieuActivite}
            required="required" onChange={handleChange}/>
        </label>
        { erreurLieuActivite &&
          <p className="text-error rf-mb-n3w">{erreurLieuActivite}</p>
        }
      </div>

      {!isAdresseCachee &&
        <>
          <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
            <label className={erreurSiret ? 'rf-label invalid' : 'rf-label' } htmlFor="siret">
              Num&eacute;ro de siret (optionnel)
              <a href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                <i className="rf-ml-1w ri-information-line ri-xl ri-info"></i>
              </a>
              <input className={erreurSiret ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'}
                type="string" id="siret" name="siret" value={siret} onChange={handleChange} />
            </label>
            { erreurSiret &&
            <p className="text-error rf-mb-n3w">{erreurSiret}</p>
            }
          </div>
          <div className="rf-col-offset-3"></div>
        </>
      }
      {isAdresseCachee &&
        <div className="rf-col-offset-4"></div>
      }

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurNumeroTelephone ? 'rf-label invalid' : 'rf-label' } htmlFor="numero-telephone">
          Num&eacute;ro de t&eacute;l&eacute;phone (accueil) <span className="obligatoire">*</span>
          <input className={erreurNumeroTelephone ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="tel"
            id="numero-telephone" name="numeroTelephone" required="required" placeholder={indicatif + ' XXX XXX XXX'}
            value={numeroTelephone} onChange={handleChange}/>
        </label>
        { erreurNumeroTelephone &&
          <p className="text-error rf-mb-n3w">{erreurNumeroTelephone}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurEmail ? 'rf-label invalid' : 'rf-label' } htmlFor="email">
          Mail <span className="obligatoire">*</span>
          <input className={erreurEmail ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="email" name="email" required="required" value={email} onChange={handleChange}/>
        </label>
        { erreurEmail &&
          <p className="text-error rf-mb-n3w">{erreurEmail}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w">
        <label className={erreurSiteWeb ? 'rf-label invalid' : 'rf-label' } htmlFor="site-web">
          Site web (optionnel)
          <input className={erreurSiteWeb ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="url"
            id="site-web" name="siteWeb" value={siteWeb} onChange={handleChange}/>
        </label>
        { erreurSiteWeb &&
          <p className="text-error rf-mb-n3w">{erreurSiteWeb}</p>
        }
      </div>
    </>
  );
}

Informations.propTypes = {
  codeDepartement: PropTypes.string,
  adresseStructure: PropTypes.object,
  siretStructure: PropTypes.string,
  permanence: PropTypes.object
};

export default Informations;
