import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';
import { useDispatch, useSelector } from 'react-redux';

function Adresse({ adresseCartographie }) {

  const dispatch = useDispatch();
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire?.errors);

  const erreurNumeroVoie = erreursFormulaire?.filter(erreur => erreur?.numeroVoie)[0]?.numeroVoie;
  const erreurRueVoie = erreursFormulaire?.filter(erreur => erreur?.rueVoie)[0]?.rueVoie;
  const erreurcodePostal = erreursFormulaire?.filter(erreur => erreur?.codePostal)[0]?.codePostal;
  const erreurVille = erreursFormulaire?.filter(erreur => erreur?.ville)[0]?.ville;
  const isAdresseCachee = useSelector(state => state.horairesAdresse?.isAdresseCachee);

  const [inputs, setInputs] = useState({
    numeroVoie: '',
    rueVoie: '',
    codePostal: '',
    ville: ''
  });

  const { numeroVoie, rueVoie, codePostal, ville } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  useEffect(() => {
    if (adresseCartographie) {
      setInputs({
        numeroVoie: adresseCartographie?.numeroRue,
        rueVoie: adresseCartographie?.rue,
        codePostal: adresseCartographie?.codePostal,
        ville: adresseCartographie?.ville,
      });
    }
  }, [adresseCartographie]);

  useEffect(() => {
    if (!isAdresseCachee) {
      setInputs({
        numeroVoie: '',
        rueVoie: '',
        codePostal: '',
        ville: ''
      });
    } else {
      setInputs({
        numeroVoie: adresseCartographie?.numeroRue,
        rueVoie: adresseCartographie?.rue,
        codePostal: adresseCartographie?.codePostal,
        ville: adresseCartographie?.ville,
      });
    }
  }, [isAdresseCachee]);
  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">Coordonn&eacute;es de mon lieu d&rsquo;activit&eacute;</h2>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurNumeroVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="numero-voie">
          Num&eacute;ro de voie <span className="obligatoire">*</span>
          <input className={erreurNumeroVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="numero-voie" name="numeroVoie" required="required" onChange={handleChange} value={numeroVoie}/>
        </label>
        { erreurNumeroVoie &&
          <p className="text-error rf-mb-n3w">{erreurNumeroVoie}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurRueVoie ? 'rf-label invalid' : 'rf-label' } htmlFor="rue-voie">
          Rue <span className="obligatoire">*</span>
          <input className={erreurRueVoie ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="rue-voie" name="rueVoie" required="required" onChange={handleChange} value={rueVoie}/>
        </label>
        { erreurRueVoie &&
          <p className="text-error rf-mb-n3w">{erreurRueVoie}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-5w">
        <label className={erreurcodePostal ? 'rf-label invalid' : 'rf-label' } htmlFor="code-postal">
          Code Postal <span className="obligatoire">*</span>
          <input className={erreurcodePostal ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="code-postal" name="codePostal" required="required" onChange={handleChange} value={codePostal}/>
        </label>
        { erreurcodePostal &&
          <p className="text-error rf-mb-n3w">{erreurcodePostal}</p>
        }
      </div>

      <div className="rf-col-offset-4"></div>

      <div className="rf-col-10 rf-col-sm-7 rf-col-md-4 rf-mb-9w">
        <label className={erreurVille ? 'rf-label invalid' : 'rf-label' } htmlFor="ville">
          Ville <span className="obligatoire">*</span>
          <input className={erreurVille ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'} type="text"
            id="ville" name="ville" required="required" onChange={handleChange} value={ville}/>
        </label>
        { erreurVille &&
          <p className="text-error rf-mb-n3w">{erreurVille}</p>
        }
      </div>

    </>
  );
}

Adresse.propTypes = {
  adresseCartographie: PropTypes.object
};

export default Adresse;
