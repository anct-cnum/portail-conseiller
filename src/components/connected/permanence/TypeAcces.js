import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';

function TypeAcces({ permanence, islieuPrincipal, prefixId }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeAcces = erreursFormulaire?.filter(erreur => erreur?.typeAcces)[0]?.typeAcces;

  function handleChange(e) {
    dispatch(permanenceActions.updateTypeAcces(e.target.value));
  }

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11">
        <div className={erreurTypeAcces ? 'rf-col-12 invalid rf-mb-6w' : 'rf-col-12 rf-mb-6w'}>
          Type d’acc&egrave;s <span className="obligatoire">*</span>
          <span className="baseline">Comment les usagers acc&egrave;dent-ils &agrave; la structure ?</span>

          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <div className="rf-radio-group">
                <input type="radio" id={prefixId + 'libre'} name={prefixId + 'typeAcces'} value="libre" required="required"
                  defaultChecked={permanence?.typeAcces === 'libre'} onClick={handleChange}/>
                <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor={prefixId + 'libre'}>
                  Acc&egrave;s libre
                </label>
              </div>
              <div className="rf-radio-group">
                <input type="radio" id={prefixId + 'rdv'} name={prefixId + 'typeAcces'} value="rdv"
                  defaultChecked={permanence?.typeAcces === 'rdv'} onClick={handleChange}/>
                <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor={prefixId + 'rdv'}>
                  Sur rendez-vous
                </label>
              </div>
              {!islieuPrincipal &&
                <div className="rf-radio-group">
                  <input type="radio" id={prefixId + 'prive'} name={prefixId + 'typeAcces'} value="prive"
                    defaultChecked={permanence?.typeAcces === 'prive'} onClick={handleChange}/>
                  <label className={erreurTypeAcces ? 'rf-label invalid' : 'rf-label' } htmlFor={prefixId + 'prive'}>
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
  islieuPrincipal: PropTypes.bool,
  prefixId: PropTypes.string,
};

export default TypeAcces;
