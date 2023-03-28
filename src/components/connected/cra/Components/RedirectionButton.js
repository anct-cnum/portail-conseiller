import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';

function RedirectionButton({ organisme, firstElement, deletable }) {
  const dispatch = useDispatch();
  const label = Object.keys(organisme)[0];
  const value = organisme[label];

  const onClickDelete = () => {
    dispatch(craActions.deleteOrganisme(organisme));
  };

  return (
    <div className={`redirection-btn ${firstElement ? 'first-el' : ''}`}>
      {deletable &&
        <button className="" onClick={onClickDelete}>
          <i className="ri-close-circle-fill"></i>
        </button>
      }
      {label + ' ' + value}
    </div>
  );
}

RedirectionButton.propTypes = {
  organisme: PropTypes.object,
  firstElement: PropTypes.bool,
  deletable: PropTypes.bool,
};

export default RedirectionButton;
