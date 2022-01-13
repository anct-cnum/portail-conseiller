import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Itinerance({ informationsCartographie }) {
  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire?.errors);
  const erreurItinerance = erreursFormulaire?.filter(erreur => erreur?.itinerance)[0]?.itinerance;

  function handleChange(e) {
    dispatch(formulaireHorairesAdresseActions.updateItinerance(e.target.value));
  }

  const [inputs, setInputs] = useState({ itinerance: null });

  const { itinerance } = inputs;

  useEffect(() => {
    if (informationsCartographie) {
      setInputs({ itinerance: informationsCartographie.itinerant });
    }
  }, [informationsCartographie]);

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">A propos de mon activit&eacute; de conseiller num&eacute;rique</h2>

      <div className={erreurItinerance ? 'question rf-col-12 rf-mb-9w invalid' : 'question rf-col-12 rf-mb-9w'}>
        Effectuez-vous des accompagnements en itin&eacute;rance ? <span className="obligatoire">*</span>
        <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
          <div className="rf-fieldset__content">
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Oui" name="itinerance" value="true" onChange={handleChange} defaultChecked={itinerance}
              />
              <label className={erreurItinerance ? 'rf-label invalid' : 'rf-label' } htmlFor="itinerance-Oui">Oui</label>
            </div>
            <div className="rf-radio-group">
              <input type="radio" id="itinerance-Non" name="itinerance" value="false" required="required" onChange={handleChange}
                defaultChecked={!itinerance && itinerance !== null}
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
  informationsCartographie: PropTypes.object
};

export default Itinerance;
