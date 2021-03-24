import React from 'react';
import PropTypes from 'prop-types';

function PeriodStatistics(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">Période du {props.dateDebut} au {props.dateFin}</div>
      </div>
    </div>
  );
}

PeriodStatistics.propTypes = {
  dateDebut: PropTypes.string,
  dateFin: PropTypes.string
};

export default PeriodStatistics;
