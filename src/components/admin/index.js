import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import Header from '../Header';
import AdminHeader from './AdminHeader';
import Conseillers from './Conseillers';
import Territoires from './Territoires';
import Statistics from '../connected/statistics/Statistics';

function Admin() {
  const location = useLocation();
  console.log(location);
  const user = useSelector(state => state.authentication.user.user);
  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        { !location.pathname.startsWith('/statistiques') &&
          <AdminHeader />
        }
        <Route path={`/accueil`} component={Conseillers} />
        <Route path={`/territoires`} component={Territoires} />
        <Route path={`/statistiques`} component={Statistics} />
        <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
      </div>
    </>
  );
}

export default Admin;
