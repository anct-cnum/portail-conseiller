import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { statistiqueActions } from '../../actions';

function Header() {
  const dispatch = useDispatch();
  const statistiques = useSelector(state => state.statistique.statsAdmin);

  useEffect(() => {
    if (!statistiques) {
      dispatch(statistiqueActions.getStatsAdmin());
    }
  });

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--top rf-grid-row--center ">
        {/*
        <div className="rf-col-xs-10 rf-col-sm-4 rf-col-md-4 rf-col-xl-4">
          <Link className="admin-btn">
            <span className="admin-texte-btn">Afficher les statistiques par territoires</span>
          </Link>
        </div>
        <div className="rf-col-xs-10 rf-col-sm-3 rf-col-md-3 rf-col-xl-3">
          <Link className="admin-btn">
            <span className="admin-texte-btn">Accéder à l&rsquo;espace discution</span>
          </Link>
        </div>
        */}
        <div className="rf-col-xs-10 rf-col-sm-5 rf-col-md-5 rf-col-xl-5">
          <b>{statistiques?.totalAccompagnements}</b> Total des accompagnements<br/>
          <b>{statistiques?.conseillersEnregistres}</b> Conseillers enregistrés<br/>
        </div>
        <div className="rf-col-xs-10 rf-col-sm-4 rf-col-md-4 rf-col-xl-12">
          {/* <Link className="support-btn">
            <span className="">Créer un compte Administrateur</span>
          </Link>
        */}
        </div>
      </div>
    </div>
  );
}

export default Header;
