import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function InputText({ textLabel, errorInput, nameInput, requiredInput, baselineInput, valueInput, placeholderInput }) {
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(permanenceActions.updateField(name, value));
  };

  return (
    <>
      <label className={errorInput ? 'rf-label invalid' : 'rf-label'} htmlFor={ nameInput }>
        {textLabel}
        {requiredInput &&
          <span className="obligatoire">&nbsp;*</span>
        }
        {baselineInput &&
          <span className="baseline">{baselineInput}</span>
        }
        <input className={errorInput ? 'rf-input rf-mt-2v input-error' : 'rf-input rf-mt-2v'}
          name={ nameInput }
          id={ nameInput }
          value={ valueInput }
          required={ requiredInput }
          onChange={handleChange}
          placeholder={placeholderInput}
        />

      </label>
      { errorInput &&
        <p className="text-error rf-mb-n3w">{errorInput}</p>
      }
    </>
  );
}

InputText.propTypes = {
  textLabel: PropTypes.string,
  errorInput: PropTypes.string,
  nameInput: PropTypes.string,
  baselineInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  requiredInput: PropTypes.bool,
  valueInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholderInput: PropTypes.string,
};

export default InputText;
