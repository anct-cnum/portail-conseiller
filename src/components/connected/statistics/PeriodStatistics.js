import React from 'react';
import PropTypes from 'prop-types';

import ElementDatePicker from './ElementDatePicker';


function PeriodStatistics(props) {

  return (
    <>
      Période du &nbsp;
      <ElementDatePicker initDate={props.dateDebut} idDate="datePickerDebut" nomDate="datePickerDebut"/>
      &nbsp;au&nbsp;
      <ElementDatePicker initDate={props.dateFin} idDate="datePickerFin" nomDate="datePickerFin"/>
    </>
  );
}

PeriodStatistics.propTypes = {
  dateDebut: PropTypes.string,
  dateFin: PropTypes.string
};


export default PeriodStatistics;
