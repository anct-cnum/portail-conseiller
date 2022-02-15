import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';

function TypeAcces({ permanence, isAdresseCachee }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeAcces = erreursFormulaire?.filter(erreur => erreur?.typeAcces)[0]?.typeAcces;

  function handleChange(e) {
    dispatch(permanenceActions.updateTypeAcces(e.target.value));
  }

  const [inputs, setInputs] = useState({ typeAcces: null });

  const { typeAcces } = inputs;

  useEffect(() => {
    if (permanence) {
      setInputs({ typeAcces: permanence?.typeAcces });
    }
  }, [permanence]);

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11">
        <div className={erreurTypeAcces ? 'rf-col-12 invalid rf-mb-6w' : 'rf-col-12 rf-mb-6w'}>
          Type d’accès <span className="obligatoire">*</span>
          <span className="baseline">Comment les usagers acc&egrave;dent-ils &agrave; la structure ?</span>

          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id="libre" name="typeAcces" value="libre" required="required"/>
                <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor="libre">
                  Acc&egrave;s libre
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id="rdv" name="typeAcces" value="rdv" />
                <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor="rdv">
                  Sur rendez-vous
                </label>
              </div>
              {isAdresseCachee &&
                <div className="rf-radio-group">
                  <input type="radio" id="prive" name="typeAcces" value="prive" />
                  <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor="prive">
                    La structure n&rsquo;accueille pas de public
                  </label>
                </div>
              }
            </div>
          </fieldset>

          { erreurTypeAcces &&
            <p className="text-error rf-mb-n3w">{erreurTypeAcces}</p>
          }
        </div>
      </div>
    </>
  );
}

TypeAcces.propTypes = {
  permanence: PropTypes.object,
  isAdresseCachee: PropTypes.bool,
};

export default TypeAcces;
