import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';
import telephoneHorsMetropole from '../../../data/indicatifs.json';

function Informations({ structure, adresseStructure, siretStructure, informationsCartographie }) {
  const dispatch = useDispatch();
  const isAdresseCachee = useSelector(state => state.horairesAdresse?.isAdresseCachee);
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);

  const erreurAdresseExact = erreursFormulaire?.filter(erreur => erreur.name === 'adresseExact')[0];
  const erreurLieuActivite = erreursFormulaire?.filter(erreur => erreur.name === 'lieuActivite')[0];
  const erreurSiret = erreursFormulaire?.filter(erreur => erreur.name === 'siret')[0];
  const erreurNumeroTelephone = erreursFormulaire?.filter(erreur => erreur.name === 'numeroTelephone')[0];
  const erreurEmail = erreursFormulaire?.filter(erreur => erreur.name === 'email')[0];
  const erreurSiteWeb = erreursFormulaire?.filter(erreur => erreur.name === 'siteWeb')[0];

  let indicatif = structure?.codeDepartement.length === 3 ?
    telephoneHorsMetropole?.find(item => item.codeDepartement === structure?.codeDepartement).indicatif : '+33';

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
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  function handleAdresse(boolean) {
    dispatch(formulaireHorairesAdresseActions.cacherAdresse(boolean));
    if (boolean) {
      adresseStructure.siret = siretStructure;
      dispatch(formulaireHorairesAdresseActions.initAdresse(adresseStructure));
    } else {
      setInputs(inputs => ({ ...inputs, siret: '' }));
    }
  }

  useEffect(() => {
    if (informationsCartographie) {
      setInputs({
        lieuActivite: informationsCartographie?.nomEnseigne,
        siret: informationsCartographie?.siret,
        numeroTelephone: informationsCartographie?.numeroTelephone,
        email: informationsCartographie?.email,
        siteWeb: informationsCartographie?.siteWeb ? informationsCartographie?.siteWeb : '',
        adresseExact: true
      });
    }
  }, [informationsCartographie]);

  return (
    <>
      <div className={erreurAdresseExact ? 'question rf-col-12 invalid rf-mb-5w' : 'question rf-col-12 rf-mb-5w'}>
        Ces informations correspondent-elles à votre lieu principal d&rsquo;activit&eacute; ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="Oui" name="adresseExact" value="Oui" defaultChecked={adresseExact} onClick={() => {
                handleAdresse(true);
              }}/>
              <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="Non" name="adresseExact" value="Non" required="required" onClick={() => {
                handleAdresse(false);
              }}/>
              <label className={erreurAdresseExact ? 'rf-label invalid' : 'rf-label' } htmlFor="Non">Non</label>
            </div>
          </div>
        </fieldset>
        { erreurAdresseExact &&
          <p className="text-error rf-mb-n3w">{erreurAdresseExact.error}</p>
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
          <p className="text-error rf-mb-n3w">{erreurLieuActivite.error}</p>
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
                type="number" id="siret" name="siret" value={siret} onChange={handleChange} />
            </label>
            { erreurSiret &&
            <p className="text-error rf-mb-n3w">{erreurSiret.error}</p>
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
          <p className="text-error rf-mb-n3w">{erreurNumeroTelephone.error}</p>
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
          <p className="text-error rf-mb-n3w">{erreurEmail.error}</p>
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
          <p className="text-error rf-mb-n3w">{erreurSiteWeb.error}</p>
        }
      </div>
    </>
  );
}

Informations.propTypes = {
  structure: PropTypes.object,
  adresseStructure: PropTypes.object,
  siretStructure: PropTypes.string,
  informationsCartographie: PropTypes.object
};

export default Informations;
