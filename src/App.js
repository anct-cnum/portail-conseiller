import React from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';

import PrivateRoute from './components/connected/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
