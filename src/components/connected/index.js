import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Statistics from './statistics/Statistics';
import Cra from './cra';
import Welcome from './Welcome';

function Connected() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      <Header linkAccount={user?.name}/>
      {!user.pdfGenerator &&
        <>
          <Route path={`/accueil`} component={Welcome} />
          <Route path={`/compte-rendu-activite`} component={Cra} />
          <Route path={`/statistiques`} component={Statistics} />
          <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
        </>
      }
      { user.pdfGenerator &&
        <>
          <Route path={`/statistiques`} component={Statistics} />
        </>
      }
    </>
  );
}

export default Connected;
