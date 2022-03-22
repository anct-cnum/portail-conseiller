import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function InputCheckbox({ textLabel, errorInput, nameInput, baselineInput, classBaseline }) {
  const dispatch = useDispatch();
  const onClick = e => {
    const { name, checked } = e.target;
    const prefixId = name.slice(0, -13);

    dispatch(permanenceActions.updateField(name, checked));
    if (name.slice(-5) === 'Siret') {
      dispatch(permanenceActions.updateField(prefixId + 'siret', ''));
      dispatch(permanenceActions.disabledField(prefixId, false));
    }
  };

  return (
    <>
      <div className="rf-checkbox-group">
        <input type="checkbox" id={ nameInput } name={ nameInput } value={true} onClick={ e => {
          onClick(e);
        }}/>
        <label className="rf-label" htmlFor={ nameInput }>
          {textLabel}
        </label>
        {baselineInput &&
          <span className={'baseline ' + classBaseline}>
            {baselineInput}
          </span>
        }
      </div>

      { errorInput &&
        <p className="text-error rf-mb-n3w">{errorInput}</p>
      }
    </>
  );
}

InputCheckbox.propTypes = {
  textLabel: PropTypes.string,
  errorInput: PropTypes.string,
  nameInput: PropTypes.string,
  baselineInput: PropTypes.string,
  classBaseline: PropTypes.string,
};

export default InputCheckbox;
