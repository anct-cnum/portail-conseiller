import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function SmallRadioButton({ label, image, imageSelected, heightImage }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  const onClickRadio = e => {
    dispatch(craActions.updateCanal(e.target.getAttribute('value')));
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={label}>
      <button id="radioRattachement"
        className={`radioRattachement ${cra?.canal === label ? 'radioRattachement-selected' : ''}`}
        style={{ height: '73px' }}
        value={label}>
        <div value={label}>
          <img
            src={cra?.canal !== label ? image : imageSelected}
            alt={label} height={heightImage}
            style={{ marginTop: '0.2rem', marginRight: '0.5rem' }}
            value={label}/>
          <span
            className={`rf-label ${cra?.canal === label ? 'radioRattachement-selected' : ''}`}
            style={{ display: 'inline-block', verticalAlign: 'super' }}
            value={label}>
            {label}
          </span>
        </div>
      </button>
    </div>
  );
}

SmallRadioButton.propTypes = {
  label: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  typeButton: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default SmallRadioButton;
