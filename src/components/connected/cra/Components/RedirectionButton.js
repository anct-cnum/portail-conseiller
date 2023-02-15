import React from 'react';
import PropTypes from 'prop-types';

function RedirectionButton({ organisme, firstElement }) {
  const label = Object.keys(organisme)[0];
  const value = organisme[label];

  const onClickDelete = () => {

  };

  return (
    <div className={`redirection-btn ${firstElement ? 'first-el' : ''}`}>
      <button className="" onClick={onClickDelete} value={value}>
        <i className="ri-close-circle-fill"></i>
      </button>
      {label + ' ' + value}
    </div>
  );
}

RedirectionButton.propTypes = {
  organisme: PropTypes.object,
  firstElement: PropTypes.bool,
};

export default RedirectionButton;
