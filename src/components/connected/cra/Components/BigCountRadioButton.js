import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

import SelectAccompagnement from './SelectAccompagnement';

function BigCountRadioButton({ type, value, label }) {

  const dispatch = useDispatch();

  const showSelect = useSelector(state => state.cra.showSelectRedirection);
  const cra = useSelector(state => state.cra);

  const toggleSelect = () => {
    if (value === 'redirection') {
      dispatch(craActions.showSelectRedirection(!showSelect));
    }
  };

  const onClickMore = () => {
    switch (type) {
      case 'participants':
        if (cra?.nbParticipants < 100) {
          dispatch(craActions.updateNbParticipants(Number(cra?.nbParticipants) + 1));
        }
        break;
      case 'accompagnement':
        if (cra?.nbParticipants && cra?.nbParticipants > cra?.nbParticipantsAccompagnement) {
          const accompagnement = cra?.accompagnement;
          for (let key in cra?.accompagnement) {
            if (key === value) {
              accompagnement[key] += 1;
            }
          }
          dispatch(craActions.updateAccompagnement(accompagnement, cra?.nbParticipantsAccompagnement + 1));
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
          dispatch(craActions.updateNbParticipants(Number(cra?.nbParticipants) - 1));
        }
        break;
      case 'accompagnement':
        if (cra?.nbParticipants && cra?.nbParticipants >= cra?.nbParticipantsAccompagnement) {
          const accompagnement = cra?.accompagnement;
          for (let key in cra?.accompagnement) {
            if (key === value) {
              accompagnement[key] -= 1;
            }
          }
          dispatch(craActions.updateAccompagnement(accompagnement, cra?.nbParticipantsAccompagnement - 1));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={value === 'redirection' && showSelect ? 'radioButton radioButtonRedirection' : 'radioButton'}>
      {(type === 'accompagnement' && value === 'redirection') &&
        <SelectAccompagnement />
      }
      <button className="radioRattachement radioRattachement-selected"
        style={{ height: '144px', padding: 0 }}>
        <div className="countRadioLabel" onClick={toggleSelect}>
          <span className="rf-label" style={{ padding: '10px', color: 'black', fontFamily: 'MarianneMedium' }}>
            <span style={{ fontSize: '1.5rem' }}>
              {type === 'participants' ? cra?.nbParticipants : cra?.accompagnement[value] }
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

BigCountRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default BigCountRadioButton;
