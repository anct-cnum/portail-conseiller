import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function BigRadioButton({ type, label, value, image, classDiv }) {

  const dispatch = useDispatch();
  const cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  //Gestion du style du bouton
  let styleClass = 'radioRattachement2';
  let disabled = false;
  switch (type) {
    case 'canal':
      if (cra?.canal === 'domicile') {
        if (value === 'rattachement') {
          styleClass = 'disabled';
        } else {
          styleClass += cra?.errorsRequired.cp ? ' buttonError' : 'radioRattachement2';
        }

      }
      styleClass += cra?.canal === 'distance' && cra?.errorsRequired.cp ? ' buttonError' : '';
      disabled = cra?.canal === 'domicile' && value === 'rattachement';
      break;
    case 'activite':
      styleClass += controlSelected === value ? ' selected' : '';
      break;
    case 'accompagnement':
      styleClass += controlSelected[value] === value ? ' selected' : '';
      break;
    default:
      break;
  }

  const onClickRadio = () => {
    switch (type) {
      case 'canal':
        if (cra?.canal !== 'distance') {
          dispatch(craActions.updateCanal(value));
        }
        switch (value) {
          case 'autre':
            dispatch(craActions.getButtonCP());
            setTimeout(() => {
              document.getElementById('buttonCP').style.zIndex = 3;
              document.getElementById('buttonCP').focus();
            }, 100);
            break;
          case 'rattachement':
            dispatch(craActions.getButtonPermanences());
            setTimeout(() => {
              document.getElementById('buttonPermanences').style.zIndex = 3;
              document.getElementById('buttonPermanences').focus();
            }, 100);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton2" onClick={onClickRadio} value={value}>
      <button id="radioRattachement2" className={styleClass} value={value} disabled={disabled}>
        <div value={value}>
          <div className={classDiv !== undefined ? classDiv : '' } value={value}>
            <span className={image}></span>
          </div>
          <span className="fr-label labelBigRadioCustom" value={value}>
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
