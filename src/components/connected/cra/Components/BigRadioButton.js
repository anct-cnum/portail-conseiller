import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function BigRadioButton({ label, image, imageSelected, heightImage, classDiv }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  const onClickRadio = e => {
    dispatch(craActions.updateCanal(e.target.getAttribute('value')));
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={label}>
      <button id="radioRattachement"
        className={`radioRattachement ${cra?.canal === label ? 'radioRattachement-selected' : ''}`}
        style={{ height: '144px' }}
        value={label}>
        <div value={label}>
          <div className={classDiv !== undefined ? classDiv : '' } value={label}>
            <img
              src={cra?.canal !== label ? image : imageSelected}
              alt={label}
              height={heightImage}
              value={label}/>
          </div>
          <span
            className={`rf-label labelRadioCustom ${cra?.canal === label ? 'radioRattachement-selected' : ''}`}
            value={label}>
            {label}
          </span>
        </div>
      </button>

    </div>
  );
}

BigRadioButton.propTypes = {
  label: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  typeButton: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButton;
