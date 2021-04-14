import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';

function ValidationButton() {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  const submitCra = () => {
    dispatch(craActions.submitCra(cra));
  };

  return (
    <div className="rf-grid-row rf-grid-row--center rf-pb-12w rf-mb-3w">
      <div className="rf-col-sm-8 rf-col-md-6 submitResponsive">
        <button className="rf-btn rf-text--bold big-btn submitCra" onClick={submitCra}>Valider</button>
      </div>
    </div>
  );
}

export default ValidationButton;
