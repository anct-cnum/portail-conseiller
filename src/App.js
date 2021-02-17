import React from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';
import CreatePassword from './components/anonymous/CreatePassword';

import PrivateRoute from './components/connected/PrivateRoute';

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/createPassword" component={CreatePassword} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
