import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers';
import { useSelector } from 'react-redux';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home';
import Admin from './components/admin';
import ChoosePassword from './components/anonymous/ChoosePassword';
import ValidationAccount from './components/connected/ValidationAccount';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import EnregistrerStatistiquesPdf from './components/anonymous/EnregistrerStatistiquesPdf';
import StatistiquesNationales from './components/anonymous/StatistiquesNationales';
import PrivateRoute from './components/connected/PrivateRoute';

require('dotenv').config();

function App() {

  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  let pdfLoading = useSelector(state => state.conseiller?.loadingPDF);
  const user = useSelector(state => state?.authentication?.user?.user);

  return (
    <div className="App">
      { (statsDataLoading === true || pdfLoading === true) &&
        <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mot-de-passe-oublie" component={ForgottenPassword} />
          <Route path="/renouveler-mot-de-passe/:token" component={ForgottenPassword} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <Route path="/validation" component={ValidationAccount} />
          <Route path="/statistiques-nationales" component={StatistiquesNationales} />
          <Route path="/statistiques/:type/:id/:dateDebut/:dateFin" component={EnregistrerStatistiquesPdf} />
          {user?.role === 'conseiller' &&
            <PrivateRoute exact path="*" component={Home}/>
          }
          {user?.role === 'admin_coop' &&
            <PrivateRoute exact path="*" component={Admin}/>
          }
          <Redirect from="/" to="/login"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
