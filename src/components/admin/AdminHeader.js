import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiqueActions } from '../../actions';

function AdminHeader() {
  const dispatch = useDispatch();
  const statistiques = useSelector(state => state.statistique.statsAdmin);

  useEffect(() => {
    if (!statistiques) {
      dispatch(statistiqueActions.getStatsAdmin());
    }
  });

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--top">
        <div className="rf-col-4 rf-mt-3w">
        </div>
        <div className="rf-col-4 rf-mt-3w">
        </div>
        <div className="rf-col-4 rf-mt-3w">
          <div className="rf-ml-9w">
            <b>{statistiques?.totalAccompagnements}</b> Total des accompagnements<br/>
            <b>{statistiques?.conseillersEnregistres}</b> Conseillers enregistrés<br/>
          </div>
        </div>
        <div className="rf-col-6 rf-mt-3w rf-mb-6w">
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
