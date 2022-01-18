import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';

function Itinerance({ permanence }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurItinerance = erreursFormulaire?.filter(erreur => erreur?.itinerance)[0]?.itinerance;

  function handleChange(e) {
    dispatch(permanenceActions.updateItinerance(e.target.value));
  }

  const [inputs, setInputs] = useState({ itinerance: null });

  const { itinerance } = inputs;

  useEffect(() => {
    if (permanence) {
      setInputs({ itinerance: permanence?.itinerant });
    }
  }, [permanence]);

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

      <div className={erreurItinerance ? 'question rf-col-12 rf-mb-9w invalid' : 'question rf-col-12 rf-mb-9w'}>
        Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Oui" name="itinerance" value="true" required="required" onChange={handleChange} defaultChecked={itinerance}
              />
              <label className={erreurItinerance ? 'rf-label invalid' : 'rf-label' } htmlFor="itinerance-Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Non" name="itinerance" value="false" required="required" onChange={handleChange}
                defaultChecked={itinerance === false}
              />
              <label className={erreurItinerance ? 'rf-label invalid' : 'rf-label' } htmlFor="itinerance-Non">Non</label>
            </div>
          </div>
        </fieldset>
        { erreurItinerance &&
          <p className="text-error rf-mb-n3w">{erreurItinerance}</p>
        }
      </div>
    </>
  );
}

Itinerance.propTypes = {
  permanence: PropTypes.object
};

export default Itinerance;
