import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function SmallRadioButton({ type, label, image, imageSelected, heightImage }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let controlSelected = type === 'canal' ? cra?.canal : cra?.activite;

  const onClickRadio = e => {
    switch (type) {
      case 'canal':
        dispatch(craActions.updateCanal(e.target.getAttribute('value')));
        break;
      case 'activite':
        dispatch(craActions.updateActivite(e.target.getAttribute('value')));
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={label}>
      <button id="radioRattachement"
        className={`radioRattachement ${controlSelected === label ? 'radioRattachement-selected' : ''}`}
        style={{ height: '73px' }}
        value={label}>
        <div value={label}>
          <img
            src={controlSelected !== label ? image : imageSelected}
            alt={label} height={heightImage}
            style={{ marginTop: '0.2rem', marginRight: '0.5rem' }}
            value={label}/>
          <span
            className={`rf-label ${controlSelected === label ? 'radioRattachement-selected' : ''}`}
            style={{ display: 'inline-block', verticalAlign: 'bottom', lineHeight: '36px' }}
            value={label}>
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
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  typeButton: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default SmallRadioButton;
