import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function BigCheckboxButton({ type, label, value, image, imageSelected, baseline }) {

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
      <div className="gradient-box">
        <button className={`checkboxRattachement2 ${controlSelected?.includes(value) ? 'checkboxRattachement2-selected' : ''}`}
          style={{ height: '104px' }}
          value={value}>
          <div value={value} style={{ display: 'flex' }}>
            <span className={`imageTheme ${!controlSelected?.includes(value) ? image : imageSelected}`}></span>
            <span
              className={`fr-label labelCheckboxCustom
                ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
              value={value}>
              {label}
              {baseline &&
                <>
                  <br/>
                  <span value={value} className="baseline">{baseline}</span>
                </>
              }
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

BigCheckboxButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  baseline: PropTypes.string,
};

export default BigCheckboxButton;
