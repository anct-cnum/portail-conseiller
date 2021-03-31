import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
function PeriodStatistics(props) {

  const dateDebut = props.dateDebut;
  const dateFin = props.dateFin;

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">
          Période du &nbsp;
          <label>
            <span id="dateDebut" className="date-btn">{new Date(dateDebut).toLocaleDateString()}</span>
            <DatePicker
              id="datePickerDebut"
              name="datePickerDebut"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateDebut ? new Date(dateDebut) : new Date()}
            />
          </label>
          &nbsp;au&nbsp;
          <label>
            <span id="dateFin" className="date-btn">{new Date(dateFin).toLocaleDateString()}</span>
            <DatePicker
              id="datePickerFin"
              name="datePickerFin"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateFin ? new Date(dateFin) : new Date()}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

PeriodStatistics.propTypes = {
  dateDebut: PropTypes.string,
  dateFin: PropTypes.string,
};


export default PeriodStatistics;
