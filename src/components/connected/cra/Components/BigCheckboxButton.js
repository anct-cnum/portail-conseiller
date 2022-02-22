import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function BigCheckboxButton({ type, label, value, image, imageSelected, heightImage, baseline }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  const onClickCheckbox = e => {
    switch (type) {
      case 'themes':
        let newthemesList = cra?.themes ? cra?.themes : [];
        if (!newthemesList.includes(e.target.getAttribute('value'))) {
          newthemesList.push(e.target.getAttribute('value'));
        } else {
          newthemesList = newthemesList.filter(theme => theme !== e.target.getAttribute('value'));
        }
        dispatch(craActions.updateThemes(newthemesList));
        break;
      default:
        break;
    }
  };

  return (
    <div className="checkboxButton" onClick={onClickCheckbox} value={value}>
      <button id="checkboxRattachement"
        className={`checkboxRattachement ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
        style={{ height: '108px' }}
        value={value}>
        <div value={value} style={{ display: 'flex' }}>
          <img
            src={!controlSelected?.includes(value) ? image : imageSelected}
            alt={label} height={heightImage}
            style={{ margin: '24px' }}
            value={value}/>
          <span
            className={`rf-label labelCheckboxCustom ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
            value={value}>
            {label}
            {baseline &&
              <>
                <br/>
                <span className="baseline">{baseline}</span>
              </>
            }
          </span>
        </div>
      </button>
    </div>
  );
}

BigCheckboxButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  baseline: PropTypes.string,
};

export default BigCheckboxButton;
