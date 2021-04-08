import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function SmallCheckboxButton({ type, label, value }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  const onClickCheckbox = e => {
    let newthemesList = cra?.themes ? cra?.themes : [];
    if (!newthemesList.includes(e.target.getAttribute('value'))) {
      newthemesList.push(e.target.getAttribute('value'));
    } else {
      newthemesList = newthemesList.filter(theme => theme !== e.target.getAttribute('value'));
    }

    switch (type) {
      case 'themes':
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
        style={{ height: '73px' }}
        value={value}>
        <span
          className={`rf-label labelCheckboxCustom ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
          style={{ textAlign: 'center' }}
          value={value}>
          {label}
        </span>
      </button>
    </div>
  );
}

SmallCheckboxButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default SmallCheckboxButton;
