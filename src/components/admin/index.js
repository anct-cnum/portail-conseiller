import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import Header from '../Header';
import AdminHeader from './AdminHeader';
import Conseillers from './Conseillers';
import Territoires from './Territoires';
import Statistics from '../connected/statistics/Statistics';
import Ressourcerie from '../connected/ressourcerie/Ressourcerie';
import conseillerDetails from './ConseillerDetails';

function Admin() {
  const location = useLocation();

  const user = useSelector(state => state.authentication.user.user);
  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        { !location.pathname.startsWith('/statistiques') && !location.pathname.startsWith('/conseiller') &&
          <AdminHeader />
        }
        <Route path={`/accueil`} component={Conseillers} />
        <Route path={`/territoires`} component={Territoires} />
        <Route path={`/statistiques`} component={Statistics} />
        <Route path={`/ressourcerie`} component={Ressourcerie} />
        <Route path={`/conseiller/:id`} component={conseillerDetails} />
        <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
      </div>
    </>
  );
}

export default Admin;
