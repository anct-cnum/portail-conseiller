import React, { forwardRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import { craActions } from '../../../../actions';
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr);

function BigDatePickerButton({ initDate }) {
  const dispatch = useDispatch();

  const setDate = dateAccompagnement => {
    dispatch(craActions.changeDate(dateAccompagnement));
  };
  const [active, setActive] = useState(false);

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <button onClick={onClick} ref={ref} className={`${active ? 'selectedDate' : 'selected'}`}>
        <span className="logoCalendrier"></span>&nbsp;
        <b className="texteDatePicker">Le {value}</b>
        <i className={active ? 'ri-arrow-up-s-line chevron-stats' : 'ri-arrow-down-s-line chevron-stats' }></i>
      </button>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  useEffect(() => {
    dispatch(craActions.datePickerStatus(active));
  }, [active]);

  return (
    <DatePicker
      id="buttonDate"
      name="dateCra"
      dateFormat="dd/MM/yyyy"
      locale="fr"
      popperPlacement="bottom-start"
      popperModifiers={{
        flip: { behavior: ['bottom-start'] },
        preventOverflow: { enabled: false },
        hide: { enabled: false }
      }}
      selected={initDate}
      onChange={dateAccompagnement => setDate(dateAccompagnement)}
      onCalendarOpen={() => setActive(true)}
      onCalendarClose={() => setActive(false)}
      customInput={<CustomDateInput />}
      disabledKeyboardNavigation
      maxDate={new Date()}
      minDate={new Date('2020-01-01')}
      formatWeekDay={nameOfDay => nameOfDay?.toUpperCase()?.substr(0, 1)}
    />
  );
}

BigDatePickerButton.propTypes = {
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.string,
  initDate: PropTypes.instanceOf(Date),
};

export default BigDatePickerButton;
