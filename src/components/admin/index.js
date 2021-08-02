import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Welcome from './Welcome';

function Connected() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <Route path={`/accueil`} component={Welcome} />
      <Redirect from="/" to="/accueil" />
    </>
  );
}

export default Connected;
