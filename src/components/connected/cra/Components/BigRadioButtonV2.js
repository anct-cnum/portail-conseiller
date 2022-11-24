import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function BigRadioButton({ type, label, value, image, classDiv }) {

  const dispatch = useDispatch();
  const cra = useSelector(state => state.cra);

  //Gestion du style du bouton
  let styleClass = 'radioRattachement2';
  switch (type) {
    case 'canal':
      if (cra?.canal === 'domicile') {
        if (value === 'rattachement') {
          styleClass = 'disabled';
        } else {
          styleClass += cra?.errorsRequired.cp ? ' buttonError' : '';
        }
      } else if (!cra?.idPermanence && cra?.canal === 'rattachement' && value === 'rattachement') {
        styleClass += ' buttonError';
      }
      styleClass += cra?.canal === 'distance' && cra?.errorsRequired.cp ? ' buttonError' : '';
      break;
    default:
      break;
  }

  const onClickRadio = () => {
    switch (type) {
      case 'canal':
        if (cra?.canal !== 'distance' && cra?.canal !== 'domicile') {
          dispatch(craActions.updateCanal(value));
        }
        if (value === 'autre') {
          dispatch(craActions.getButtonCP());
          setTimeout(() => {
            document.getElementById('dropdown').style.display = 'block';
            document.getElementById('buttonCP').style.zIndex = 3;
            document.getElementById('buttonCP').focus();
          }, 100);
        } else if (value === 'rattachement') {
          dispatch(craActions.getButtonPermanences());
          setTimeout(() => {
            if (document.getElementById('dropdown')) {
              document.getElementById('dropdown').style.display = 'none';
            }
            document.getElementById('buttonPermanences').style.zIndex = 3;
            document.getElementById('buttonPermanences').focus();
          }, 100);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton2" onClick={onClickRadio} value={value}>
      <button id="radioRattachement2" className={styleClass} value={value} disabled={cra?.canal === 'domicile' && value === 'rattachement'}>
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
