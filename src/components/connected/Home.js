import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { history } from '../../helpers';
import Header from '../Header';
import ElementButton from './commun/ElementButton';
import Statistics from './statistics/Statistics';
import Cra from './cra/cra';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Home">
      <Header linkAccount={user?.name}/>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--end rf-mb-2w">
          <Link className="rf-btn rf-btn--sm" to="/login">Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
        </div>
      </div>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center rf-mb-4w">
          <div className="rf-col-1"></div>
          <div className="rf-col-5">
            <ElementButton titre="Accueil" onClick={() => history.push('/statistiques') }/>
          </div>
          <div className="rf-col-5">
            <ElementButton titre="Enregistrer un nouvel accompagnement" onClick={() => history.push('/compte-rendu-activite')}/>
          </div>
        </div>
      </div>
      <Route path={`/statistiques`} component={Statistics} />
      <Route path={`/compte-rendu-activite`} component={Cra} />
    </div>

  );
}

export default Home;
