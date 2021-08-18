import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import AdminHeader from './Header';
import Welcome from './Welcome';

function Admin() {

  const user = useSelector(state => state.authentication.user.user);
  return (
    <>
      <Header linkAccount={user?.name}/>
      <AdminHeader />
      <Route path={`/accueil`} component={Welcome} />
      <Redirect from="/" to="/accueil" />
    </>
  );
}

export default Admin;
