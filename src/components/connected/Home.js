import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { history } from '../../helpers';
import Header from '../Header';
import ElementButton from './commun/ElementButton';
import Statistics from './statistics/Statistics';
import Cra from './cra';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Home">
      <Header linkAccount={user?.name}/>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center rf-my-2w">
          <ElementButton
            titre="Accueil"
            onClick={() => history.push('/')}
            classButton="menu-btn"
            pathname="/" />
          <ElementButton
            titre="Statistiques"
            onClick={() => history.push('/statistiques')}
            classButton="menu-btn"
            pathname="/statistiques"/>
          <ElementButton
            titre="Enregistrer un nouvel accompagnement"
            onClick={() => history.push('/compte-rendu-activite')}
            classButton="menu-btn"
            pathname="/compte-rendu-activite"/>
        </div>
      </div>
      <Route path={`/statistiques`} component={Statistics} />
      <Route path={`/compte-rendu-activite`} component={Cra} />
    </div>

  );
}

export default Home;
