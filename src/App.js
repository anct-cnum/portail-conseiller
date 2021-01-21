import './App.css';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from './components/anonymous/Login.js'
import Home from './components/connected/Home.js'

function App() {
  return (
    <div className="App">
      <h1>Portail conseiller</h1>
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/portail' component={Home}/>
          <Route render={() => <Redirect to="/login"/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
