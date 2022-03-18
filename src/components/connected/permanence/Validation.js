import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { permanenceActions } from '../../../actions/permanence.actions';
import { prepareLieuActivite } from './utils/PermanenceFunctions';

function Validation({ conseillerId, structureId }) {
  const dispatch = useDispatch();
  const form = useSelector(state => state.permanence);
  const errorsForm = useSelector(state => state.permanence?.errorsFormulaire);

  const [clickSubmit, setClickSubmit] = useState(false);

  function handleSubmit() {
    dispatch(permanenceActions.verifyFormulaire(form));
    setClickSubmit(true);
  }

  useEffect(() => {
    if (errorsForm?.lengthError === 0 && clickSubmit) {

      const nouveauLieu = prepareLieuActivite(conseillerId, structureId);

      if (nouveauLieu._id !== null) {
        dispatch(permanenceActions.updatePermanence(nouveauLieu._id, nouveauLieu));
      } else {
        dispatch(permanenceActions.createPermanence(conseillerId, nouveauLieu));
      }
    }
    setClickSubmit(false);
  }, [errorsForm]);

  return (
    <div className="rf-col-offset-1 rf-col-4">
      <button className="rf-btn validation-btn rf-mb-12w" onClick={handleSubmit}>Enregistrer et revenir &agrave; l&rsquo;accueil</button>
    </div>
  );
}

Validation.propTypes = {
  permanence: PropTypes.object,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
};

export default Validation;
