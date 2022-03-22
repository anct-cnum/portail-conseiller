import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function InputText({ textLabel, errorInput, nameInput, requiredInput, baselineInput, valueInput, placeholderInput, disabled }) {
  const dispatch = useDispatch();

  const reg = new RegExp('^[0-9]{14}$');
  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(permanenceActions.updateField(name, value));
    if (name.slice(-5) === 'siret' && value.length === 14 && reg.test(value)) {
      dispatch(permanenceActions.verifySiret(name.slice(0, -5), value));
    }
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
          onPaste={handleChange}
          placeholder={placeholderInput}
          disabled={disabled}
        />

      </label>
      { errorInput &&
        <p className="text-error rf-mb-n3w">{errorInput}</p>
      }
    </>
  );
}

InputText.propTypes = {
  textLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
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
  disabled: PropTypes.bool,
};

export default InputText;
