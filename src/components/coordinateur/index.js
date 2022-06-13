import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import CoordinateurHeader from './CoordinateurHeader';
import Conseillers from './Conseillers';
import Territoires from '../admin/Territoires';
import Statistics from '../connected/statistics/Statistics';
import Ressourcerie from '../connected/ressourcerie/Ressourcerie';
import conseillerDetails from '../admin/ConseillerDetails';

function Coordinateur() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        <CoordinateurHeader linkAccount={user?.name}/>
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

export default Coordinateur;
