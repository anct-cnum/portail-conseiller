import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';


function InputCheckbox({ textLabel, errorInput, nameInput, baselineInput, classBaseline }) {
  const dispatch = useDispatch();

  const fields = useSelector(state => state.permanence?.fields);

  const [checked, setChecked] = useState(false);

  const onClick = e => {
    const { name, checked } = e.target;
    const prefixId = name.slice(0, -13);

    dispatch(permanenceActions.updateField(name, checked));
    if (name.slice(-5) === 'Siret') {
      dispatch(permanenceActions.updateField(prefixId + 'siret', ''));
      dispatch(permanenceActions.disabledField(prefixId, false));
    }
  };

  useEffect(() => {
    if (nameInput.slice(-5) === 'Siret') {
      const prefixId = nameInput.slice(0, -13);
      const field = fields.filter(field => field.name === prefixId + 'siret')[0]?.value;
      if (field === '') {
        dispatch(permanenceActions.updateField(nameInput, true));
        setChecked(true);
      }
    }
  }, [fields]);
  return (
    <>
      <div className="rf-checkbox-group">
        {checked &&
        <input type="checkbox" id={ nameInput } name={ nameInput } value={true} defaultChecked={true} onClick={ e => {
          onClick(e);
        }}/>
        }
        {!checked &&
        <input type="checkbox" id={ nameInput } name={ nameInput } value={true} onClick={ e => {
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
};

export default InputCheckbox;
