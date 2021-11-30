import React from 'react';
import PropTypes from 'prop-types';

import ElementDatePicker from './Components/ElementDatePicker';

function StatisticsPeriod(props) {

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

StatisticsPeriod.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
};


export default StatisticsPeriod;
