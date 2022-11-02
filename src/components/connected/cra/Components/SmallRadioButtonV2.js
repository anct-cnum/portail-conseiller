import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { craActions } from '../../../../actions';
import { getCraValue } from '../utils/CraFunctions';

function SmallRadioButton({ type, label, value, image }) {

  const dispatch = useDispatch();

  const cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  const onClickRadio = e => {
    switch (type) {
      case 'canal':
        const value = e.target.getAttribute('value');
        dispatch(craActions.updateCanal(value));
        if (cra?.canal === value) {
          dispatch(craActions.deleteCanalValue());
        } else if (value === 'domicile') {
          dispatch(craActions.clearCanal());
        }
        break;
      case 'activite':
        dispatch(craActions.updateActivite(e.target.getAttribute('value')));
        break;
      case 'accompagnement':
        if (cra?.nbParticipants > cra?.nbParticipantsAccompagnement) {
          const accompagnement = cra?.accompagnement;
          for (let key in cra?.accompagnement) {
            if (key === value) {
              accompagnement[key] += 1;
            }
          }
          dispatch(craActions.updateAccompagnement(accompagnement, cra?.nbParticipantsAccompagnement + 1));
          if (value === 'redirection') {
            dispatch(craActions.updateOrganisme(null));
            dispatch(craActions.showSelectRedirection(true));
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton2 small" onClick={onClickRadio} value={value}>
      <button id="radioRattachement2" className={`smallRadioRattachement2 ${controlSelected === value ? 'selected' : ''}`} value={value}>
        <div value={value}>
          <span className={image}></span>&nbsp;
          <span
            className="labelSmallRadioCustom" value={value}>
            {label}
          </span>
        </div>
      </button>
    </div>
  );
}

SmallRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
};

export default SmallRadioButton;
