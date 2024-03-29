import React from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function BigRadioButton({ type, label, value, image, imageSelected, heightImage, classDiv }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const onClickRadio = () => {
    switch (type) {
      case 'canal':
        dispatch(craActions.updateCanal(value));
        break;
      case 'activite':
        dispatch(craActions.updateActivite(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={value}>
      <button id="radioRattachement"
        className={type !== 'accompagnement' ? `radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}` :
          `radioRattachement ${controlSelected[value] === value ? 'radioRattachement-selected' : ''}`}
        value={value}>
        <div value={value}>
          <div className={classDiv !== undefined ? classDiv : '' } value={value}>
            <img
              src={controlSelected !== value ? image : imageSelected}
              alt={label}
              height={heightImage}
              value={value}/>
          </div>
          <span
            className={`fr-label labelBigRadioCustom ${controlSelected === value ? 'radioRattachement-selected' : ''}`}
            value={value}>
            {label}
          </span>
        </div>
      </button>
    </div>
  );
}

BigRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButton;
