import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import HeaderHub from './HeaderHub';
import BannerHub from './BannerHub';
import Territoires from '../admin/Territoires';
import Ressourcerie from '../connected/ressourcerie/Ressourcerie';
import Statistiques from '../connected/statistics/Statistics';

function Admin() {
  const location = useLocation();

  const user = useSelector(state => state.authentication.user.user);
  return (
    <>
      <HeaderHub linkAccount={user?.name}/>
      <div className="admin">
        { !location.pathname.startsWith('/statistiques') &&
          <BannerHub />
        }
        <Route path={`/statistiques`} component={Statistiques} />
        <Route path={`/territoires`} component={Territoires} />
        <Route path={`/ressourcerie`} component={Ressourcerie} />
        <Route exact path="*" render={() => (<Redirect to="/territoires" />)} />
      </div>
    </>
  );
}

export default Admin;
