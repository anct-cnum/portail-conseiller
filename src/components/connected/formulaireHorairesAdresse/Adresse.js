import React from 'react';
import PropTypes from 'prop-types';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';
import { useDispatch, useSelector } from 'react-redux';

function Adresse() {

  const dispatch = useDispatch();
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);

  const erreurNumeroVoie = erreursFormulaire?.filter(erreur => erreur.name === 'numeroVoie')[0];
  const erreurRueVoie = erreursFormulaire?.filter(erreur => erreur.name === 'rueVoie')[0];
  const erreurcodePostal = erreursFormulaire?.filter(erreur => erreur.name === 'codePostal')[0];
  const erreurVille = erreursFormulaire?.filter(erreur => erreur.name === 'ville')[0];

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">Coordonn&eacute;es de mon lieu d&rsquo;activit&eacute;</h2>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurNumeroVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="numero-voie">
          Num&eacute;ro de voie <span className="obligatoire">*</span>
          <input className={erreurNumeroVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="numero-voie" name="numeroVoie" required="required" onChange={handleChange} />
        </label>
        { erreurNumeroVoie &&
          <p className="text-error rf-mb-n3w">{erreurNumeroVoie.error}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurRueVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="rue-voie">
          Rue <span className="obligatoire">*</span>
          <input className={erreurRueVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="rue-voie" name="rueVoie" required="required" onChange={handleChange} />
        </label>
        { erreurRueVoie &&
          <p className="text-error rf-mb-n3w">{erreurRueVoie.error}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurcodePostal ? 'rf-label invalid' : 'rf-label' } htmlFor="code-postal">
          Code Postal <span className="obligatoire">*</span>
          <input className={erreurcodePostal ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="code-postal" name="codePostal" required="required" onChange={handleChange} />
        </label>
        { erreurcodePostal &&
          <p className="text-error rf-mb-n3w">{erreurcodePostal.error}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w">
        <label className={erreurVille ? 'rf-label invalid' : 'rf-label' } htmlFor="ville">
          Ville <span className="obligatoire">*</span>
          <input className={erreurVille ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="ville" name="ville" required="required" onChange={handleChange} />
        </label>
        { erreurVille &&
          <p className="text-error rf-mb-n3w">{erreurVille.error}</p>
        }
      </div>

    </>
  );
}

Adresse.propTypes = {
  adresseStructure: PropTypes.object
};

export default Adresse;
