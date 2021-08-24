import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="rf-grid-row rf-grid-row--top">
        <div className="rf-col-4 rf-mt-3w">
          <Link className="admin-btn btn-stats-territoires" to="/accueil" title="Disponible prochainement..">
            <span className="admin-texte-btn">Afficher les statistiques par territoires</span>
          </Link>
        </div>
        <div className="rf-col-4 rf-mt-3w">
          <Link className="admin-btn btn-discussion" to="/accueil" title="Disponible prochainement..">
            <span className="admin-texte-btn">Accéder à l&rsquo;espace discution</span>
          </Link>
        </div>
        <div className="rf-col-4 rf-mt-3w">
          <div className="rf-ml-9w">
            <b>{statistiques?.totalAccompagnements}</b> Total des accompagnements<br/>
            <b>{statistiques?.conseillersEnregistres}</b> Conseillers enregistrés<br/>
          </div>
        </div>
        <div className="rf-col-6 rf-mt-3w rf-mb-6w">
          <Link className="btn-creation-admin" to="/accueil" title="Disponible prochainement..">
            <span className="">Créer un compte Administrateur</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
