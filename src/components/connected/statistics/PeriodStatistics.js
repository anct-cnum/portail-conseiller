import React from 'react';
import PropTypes from 'prop-types';

import ElementDatePicker from './ElementDatePicker';


function PeriodStatistics(props) {

  return (
    <>
      <span>Période du &nbsp;</span><br className="periode-xs"/>
      <span id="span-datePickerDebut" >
        <ElementDatePicker initDate={props.dateDebut} idDate="datePickerDebut" nomDate="datePickerDebut"/>
      </span>
      <span id="span-datePickerFin" >
        &nbsp;au&nbsp;
        <ElementDatePicker initDate={props.dateFin} idDate="datePickerFin" nomDate="datePickerFin"/>
      </span>
    </>
  );
}

PeriodStatistics.propTypes = {
  dateDebut: PropTypes.string,
  dateFin: PropTypes.string
};


export default PeriodStatistics;
