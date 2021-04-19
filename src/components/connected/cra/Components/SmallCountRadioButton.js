import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function SmallCountRadioButton({ type }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  const onClickMore = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree < 480) {
          dispatch(craActions.updateDuree(Number(cra?.duree) + 30));
        }
        break;
      default:
        break;
    }
  };

  const onClickLess = () => {
    switch (type) {
      case 'duree':
        if (cra?.duree > 90) {
          dispatch(craActions.updateDuree(Number(cra?.duree) - 30));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="SmallCountRadioButton">
      <button id="radioRattachement"
        className="radioRattachement radioRattachement-selected"
        style={{ height: '104px', padding: 0 }}>
        <div className="countSmallRadioLabel">
          <span className="rf-label labelSmallCount">
            {Math.floor(cra?.duree / 60)}h{(cra?.duree % 60).toLocaleString('fr-FR', { minimumIntegerDigits: 2 })}
          </span>
        </div>
        <div onClick={onClickLess} className="countSmallRadioCalcul" style={{ borderRight: '1.5px solid black' }}>
          <span className="rf-label labelCalculCustom">-</span>
        </div>
        <div onClick={onClickMore} className="countSmallRadioCalcul">
          <span className="rf-label labelCalculCustom">+</span>
        </div>
      </button>
    </div>
  );
}

SmallCountRadioButton.propTypes = {
  type: PropTypes.string,
};

export default SmallCountRadioButton;
