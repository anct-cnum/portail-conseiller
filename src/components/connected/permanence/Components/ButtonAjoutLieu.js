import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function ButtonAjoutLieu({ secondaireId }) {
  const dispatch = useDispatch();
  const onClick = e => {
    const { id } = e.target;
    dispatch(permanenceActions.updateField(id, true));
  };

  return (
    <button id={'submit_and_next_' + (secondaireId + 1)} className="rf-btn nouveau-btn rf-mb-2w" onClick={e => {
      onClick(e);
    }}>
      Ajouter un autre lieu d&rsquo;activit&eacute; secondaire
    </button>
  );
}

ButtonAjoutLieu.propTypes = {
  textLabel: PropTypes.string,
  errorInput: PropTypes.string,
  nameInput: PropTypes.string,
  baselineInput: PropTypes.string,
  secondaireId: PropTypes.number,
};

export default ButtonAjoutLieu;
