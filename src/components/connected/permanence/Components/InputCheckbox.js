import React from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';


function InputCheckbox({ textLabel, errorInput, prefixId, nameInput, baselineInput, classBaseline, disabled }) {
  const dispatch = useDispatch();

  const fields = useSelector(state => state.permanence?.fields);
  const checked = fields?.filter(field => field.name === prefixId + nameInput)[0]?.value;
  const types = ['libre', 'rdv', 'prive'];

  const onClick = e => {
    const { checked } = e.target;

    dispatch(permanenceActions.updateField(prefixId + nameInput, checked));

    if (nameInput.slice(-5) === 'Siret') {
      dispatch(permanenceActions.updateField(prefixId + 'adresse', ''));
      dispatch(permanenceActions.updateField(prefixId + 'siret', ''));
      dispatch(permanenceActions.updateField(prefixId + 'nomEnseigne', ''));
      dispatch(permanenceActions.disabledField(prefixId, false));
    }
    if (types.includes(nameInput)) {
      const typeAcces = [
        fields?.filter(field => field.name === prefixId + 'libre')[0]?.value ? 'libre' : null,
        fields?.filter(field => field.name === prefixId + 'rdv')[0]?.value ? 'rdv' : null,
        fields?.filter(field => field.name === prefixId + 'prive')[0]?.value ? 'prive' : null,
      ].filter(n => n);
      dispatch(permanenceActions.updateField(prefixId + 'typeAcces', typeAcces));
    }
  };

  return (
    <>
      <div className="fr-checkbox-group">
        {checked &&
        <input type="checkbox" id={ prefixId + nameInput } name={ prefixId + nameInput } value={true} defaultChecked={true} disabled={disabled} onClick={ e => {
          onClick(e);
        }}/>
        }
        {!checked &&
        <input type="checkbox" id={ prefixId + nameInput } name={ prefixId + nameInput } value={true} disabled={disabled} onClick={ e => {
          onClick(e);
        }}/>
        }
        <label className={errorInput ? 'fr-label invalid' : 'fr-label' } htmlFor={ prefixId + nameInput }
          style={nameInput === 'checkboxSiret' ? { 'width': '350px' } : {}}>
          {textLabel}
        </label>
        {baselineInput &&
          <span className={'baseline ' + classBaseline}>
            {baselineInput}
          </span>
        }
      </div>

      { (errorInput && !types.includes(nameInput)) &&
        <p className="text-error fr-mb-n3w">{errorInput}</p>
      }
    </>
  );
}

InputCheckbox.propTypes = {
  textLabel: PropTypes.string,
  errorInput: PropTypes.string,
  prefixId: PropTypes.string,
  nameInput: PropTypes.string,
  baselineInput: PropTypes.string,
  classBaseline: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputCheckbox;
