import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers';
import { useSelector } from 'react-redux';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home';
import Admin from './components/admin';
import Hub from './components/hub';
import ChoosePassword from './components/anonymous/ChoosePassword';
import ChoosePasswordHub from './components/anonymous/ChoosePasswordHub';
import ValidationAccount from './components/connected/ValidationAccount';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import EnregistrerStatistiquesPdf from './components/anonymous/EnregistrerStatistiquesPdf';
import StatistiquesNationales from './components/anonymous/StatistiquesNationales';
import PrivateRoute from './components/connected/PrivateRoute';
import choosePasswordChangeMailbox from './components/anonymous/choosePasswordChangeMailbox';
import Propos from './components/anonymous/Propos';
import EmailConfirmer from './components/connected/mesInformations/ConfirmationEmail';

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
          <Route path="/inscription-hub/:token" component={ChoosePasswordHub} />
          <Route path="/conseillers/confirmation-email/:token" component={EmailConfirmer} />
          <Route path="/changer-email/:token" component={choosePasswordChangeMailbox} />
          <Route path="/validation" component={ValidationAccount} />
          <Route path="/a-propos" component={Propos}/>
          <Route path="/statistiques-nationales" component={StatistiquesNationales} />
          <Route path="/statistiques/:type/:id/:dateDebut/:dateFin/:codePostal" component={EnregistrerStatistiquesPdf} />
          <Route path="/statistiques/:type/:dateDebut/:dateFin" component={EnregistrerStatistiquesPdf} />
          {user?.role === 'conseiller' &&
            <PrivateRoute exact path="*" component={Home}/>
          }
          {(user?.role === 'admin_coop' || user?.role === 'structure_coop') &&
            <PrivateRoute exact path="*" component={Admin}/>
          }
          {(user?.role === 'hub_coop') &&
            <PrivateRoute exact path="*" component={Hub}/>
          }
          <Redirect from="/" to="/login"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
