import React from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function SquareButton({ value, label, type }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);

  const onClickSquare = e => {
    switch (type) {
      case 'age':
        dispatch(craActions.updateAge(e.target.getAttribute('value')));
        break;
      case 'statut':
        dispatch(craActions.updateStatut(e.target.getAttribute('value')));
        break;
      case 'duree':
        dispatch(craActions.updateDuree(e.target.getAttribute('value')));
        break;
      default:
        break;
    }
  };

  return (
    <div className="squareButton" onClick={onClickSquare} value={value}>
      <button
        id="squareRattachement"
        className={`squareRattachement ${controlSelected === value ? 'squareRattachement-selected' : ''}`}
        value={value}>
        <span
          className={`rf-label squareLabel ${controlSelected === value ? 'squareRattachement-selected' : ''}`}
          value={value}>
          {label}
        </span>
      </button>
    </div>
  );
}

SquareButton.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

export default SquareButton;
