import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function CountRadioButton({ type, label }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  const onClickMore = () => {
    switch (type) {
      case 'participants':
        if (cra?.nbParticipants < 100) {
          dispatch(craActions.updateNbParticipants(cra?.nbParticipants + 1));
        }
        break;
      default:
        break;
    }
  };

  const onClickLess = () => {
    switch (type) {
      case 'participants':
        if (cra?.nbParticipants > 2) {
          dispatch(craActions.updateNbParticipants(cra?.nbParticipants - 1));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton">
      <button id="radioRattachement"
        className="radioRattachement radioRattachement-selected"
        style={{ height: '144px', padding: 0 }}>
        <div className="countRadioLabel">
          <span className="rf-label" style={{ padding: '10px', color: 'black' }}>
            <span style={{ fontSize: '1.5rem' }}>
              {cra?.nbParticipants}
            </span>
            <br/>
            {label}
          </span>
        </div>
        <div onClick={onClickLess} className="countRadioCalcul" style={{ borderRight: '1.5px solid black' }}>
          <span className="rf-label labelCalculCustom">-</span>
        </div>
        <div onClick={onClickMore} className="countRadioCalcul">
          <span className="rf-label labelCalculCustom">+</span>
        </div>
      </button>
    </div>
  );
}

CountRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
};

export default CountRadioButton;
