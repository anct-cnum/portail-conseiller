import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
function ElementDatePicker(props) {

  const [initDate, setDate] = useState(new Date(props.initDate));

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <span className="date-btn" onClick={onClick} ref={ref}>
        <b>{value}</b>
      </span>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <DatePicker
      id={props.idDate}
      name={props.nomDate}
      dateFormat="dd/MM/yyyy"
      locale="fr"
      selected={initDate}
      onChange={date => setDate(date)}
      customInput={<CustomDateInput />}
    />
  );
}

ElementDatePicker.propTypes = {
  idDate: PropTypes.string,
  nomDate: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.string,
  initDate: PropTypes.string,
};

export default ElementDatePicker;
