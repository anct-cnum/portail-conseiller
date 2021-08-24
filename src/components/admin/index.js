import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import AdminHeader from './Header';
import Conseillers from './Conseillers';

function Admin() {

  const user = useSelector(state => state.authentication.user.user);
  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        <AdminHeader />
        <Route path={`/accueil`} component={Conseillers} />
        <Redirect from="/" to="/accueil" />
      </div>
    </>
  );
}

export default Admin;
