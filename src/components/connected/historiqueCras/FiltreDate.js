import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { historiqueCrasActions } from '../../../actions';

registerLocale('fr', fr);
function FiltreDate({ idDate }) {
  const dispatch = useDispatch();

  let dateDebut = useSelector(state => state.historiqueCras?.dateCraDebut);
  let dateFin = useSelector(state => state.historiqueCras?.dateCraFin);
  
  const [active, setActive] = useState(false);

  const setDate = date => {
    if (idDate === 'dateCraDebut') {
      if (date <= dateFin) { //on ne change la date de debut que si elle est <= date de fin
        dispatch(historiqueCrasActions.changeDateCraDebut(date));
      }
    } else if (date >= dateDebut) { //on ne change la date de fin que si elle est >= date de début
      dispatch(historiqueCrasActions.changeDateCraFin(date));
    }
  };

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <span className={active ? 'date-btn date-active' : 'date-btn' } onClick={onClick} ref={ref}>
        <b>{value}</b>
        <i className={`${active ? 'ri-arrow-up-s-line chevron-stats' : 'ri-arrow-down-s-line chevron-stats'} `}></i>
      </span>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <DatePicker
      id={idDate}
      name={idDate}
      selected={idDate === 'dateCraDebut' ? dateDebut : dateFin}
      dateFormat="dd/MM/yyyy"
      customInput={<CustomDateInput />}
      onChange={date => setDate(date)}
      onCalendarOpen={() => setActive(true)}
      onCalendarClose={() => setActive(false)}
      locale="fr"
    />
  );
}

FiltreDate.propTypes = {
  idDate: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.string,
};
export default FiltreDate;
