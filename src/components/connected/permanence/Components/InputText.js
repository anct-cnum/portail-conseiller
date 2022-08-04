import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch } from 'react-redux';


function InputText({ textLabel, errorInput, nameInput, requiredInput, baselineInput,
  valueInput, placeholderInput, classInput, disabled, indicatif, prefixId }) {

  const dispatch = useDispatch();

  const reg = new RegExp('^[0-9]{14}$');

  const filtreValue = value => {
    return value.replace(/\s/g, '');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.slice(-5) === 'siret' && filtreValue(value).length === 14 && reg.test(filtreValue(value))) {
      dispatch(permanenceActions.verifySiret(name.slice(0, -5), filtreValue(value)));
      dispatch(permanenceActions.updateField(name, filtreValue(value)));
    } else {
      dispatch(permanenceActions.updateField(name, value));
      if (prefixId) {
        dispatch(permanenceActions.disabledField(prefixId, false));
      }
    }
  };

  const onFocus = e => {
    if (nameInput.slice(-9) === 'Telephone') {
      e.target.value = indicatif;
    }
    if (nameInput.slice(-7) === 'siteWeb') {
      e.target.value = 'https://www.';
    }
  };

  return (
    <div className={classInput}>
      <label className={errorInput ? 'fr-label invalid' : 'fr-label'} htmlFor={ nameInput }>
        {textLabel}
        {requiredInput &&
          <span className="obligatoire">&nbsp;*</span>
        }
        {baselineInput &&
          <span className="baseline">{baselineInput}</span>
        }
        <input className={errorInput ? 'fr-input fr-mt-2v input-error' : 'fr-input fr-mt-2v'}
          name={ nameInput }
          id={ nameInput }
          value={ valueInput }
          required={ requiredInput }
          onChange={handleChange}
          onPaste={handleChange}
          placeholder={placeholderInput}
          disabled={disabled}
          onFocus={e => {
            onFocus(e);
          }}
        />

      </label>
      { errorInput &&
        <p className="text-error fr-mb-n3w">{errorInput}</p>
      }
    </div>
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
  classInput: PropTypes.string,
  disabled: PropTypes.bool,
  indicatif: PropTypes.string,
  prefixId: PropTypes.string,
};

export default InputText;
