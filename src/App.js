import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home';
import ChoosePassword from './components/anonymous/ChoosePassword';
import ValidationAccount from './components/connected/ValidationAccount';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import PrivateRoute from './components/connected/PrivateRoute';

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mot-de-passe-oublie" component={ForgottenPassword} />
          <Route path="/renouveler-mot-de-passe/:token" component={ForgottenPassword} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <Route path="/validation" component={ValidationAccount} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
