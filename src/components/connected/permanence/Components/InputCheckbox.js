import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';


function InputCheckbox({ textLabel, errorInput, nameInput, baselineInput, classBaseline, disabled }) {
  const dispatch = useDispatch();
  const prefixId = nameInput.slice(0, -13);
  const fields = useSelector(state => state.permanence?.fields);
  const checked = fields.filter(field => field.name === nameInput)[0]?.value;
  const siret = fields.filter(field => field.name === prefixId + 'siret')[0]?.value;

  const onClick = e => {
    const { checked } = e.target;
    dispatch(permanenceActions.updateField(nameInput, checked));
    if (nameInput.slice(-5) === 'Siret') {
      dispatch(permanenceActions.updateField(prefixId + 'siret', ''));
      dispatch(permanenceActions.disabledField(prefixId, false));
    }
  };

  useEffect(() => {
    if (nameInput.slice(-5) === 'Siret' && siret === '') {
      dispatch(permanenceActions.updateField(nameInput, true));
    }
  }, [siret]);

  return (
    <>
      <div className="rf-checkbox-group">
        {checked &&
        <input type="checkbox" id={ nameInput } name={ nameInput } value={true} defaultChecked={true} disabled={disabled} onClick={ e => {
          onClick(e);
        }}/>
        }
        {!checked &&
        <input type="checkbox" id={ nameInput } name={ nameInput } value={true} disabled={disabled} onClick={ e => {
          onClick(e);
        }}/>
        }

        <label className={errorInput ? 'rf-label invalid' : 'rf-label' } htmlFor={ nameInput }>
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
  disabled: PropTypes.bool,
};

export default InputCheckbox;
