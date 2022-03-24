import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';


function InputRadio({ textLabel, errorInput, nameInput, idInput, valueInput }) {
  const dispatch = useDispatch();
  const fields = useSelector(state => state.permanence?.fields);
  const isChecked = fields?.filter(field => field.name === nameInput)[0]?.value === valueInput;

  const [checked, setChecked] = useState(false);

  const onClick = e => {
    const { name, value } = e.target;
    dispatch(permanenceActions.updateField(name, value));
  };
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <>
      <div className="rf-radio-group" >
        <input type="radio" id={idInput} name={nameInput} value={valueInput} required
          defaultChecked={checked} onClick={onClick}/>
        <label className={errorInput ? 'rf-label invalid' : 'rf-label' } htmlFor={idInput}>
          {textLabel}
        </label>
      </div>
    </>
  );
}

InputRadio.propTypes = {
  textLabel: PropTypes.string,
  errorInput: PropTypes.string,
  nameInput: PropTypes.string,
  idInput: PropTypes.string,
  valueInput: PropTypes.string,
};

export default InputRadio;
