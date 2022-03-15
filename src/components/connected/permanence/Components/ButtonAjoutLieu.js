import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function ButtonAjoutLieu({ secondaireId, show }) {
  const dispatch = useDispatch();

  const onClick = e => {
    const { id } = e.target;
    show[secondaireId + 1] = true;
    dispatch(permanenceActions.updateField(id, true));
    dispatch(permanenceActions.montrerLieuSecondaire(show));
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
  show: PropTypes.array,
  secondaireId: PropTypes.number,
};

export default ButtonAjoutLieu;
