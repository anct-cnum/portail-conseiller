import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers';
import { useDispatch, useSelector } from 'react-redux';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home';
import Admin from './components/admin';
import Hub from './components/hub';
import Coordinateur from './components/coordinateur';
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
import { permanenceActions } from './actions';

function App() {
  let statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  let pdfLoading = useSelector(state => state.conseiller?.loadingPDF);
  let loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  let loadingExcel = useSelector(state => state.conseiller?.loadingExcel);
  const loadingSendEmail = useSelector(state => state.motDePasseOublie?.loading);
  let downloadingExportCnfs = useSelector(state => state.conseiller?.downloadingExportCnfs);
  const loadingHistorique = useSelector(state => state.historiqueCras?.loading);
  const loadingPermanence = useSelector(state => state.permanence?.loading);
  const uploadingCV = useSelector(state => state.candidat?.uploading);
  const user = useSelector(state => state?.authentication?.user?.user);
  const reloadList = useSelector(state => state.permanence?.reloadList);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const dispatch = useDispatch();
  useEffect(() => {
    if (reloadList && conseiller?._id) {
      dispatch(permanenceActions.reloadList(false));
      dispatch(permanenceActions.getMesPermanences(conseiller?._id));
    }
  }, [reloadList]);

  return (
    <div className="App">
      { (statsDataLoading === true || pdfLoading === true || loadingCSV === true || loadingExcel === true ||
        downloadingExportCnfs === true || loadingHistorique === true || loadingPermanence === true || uploadingCV === true || loadingSendEmail === true) &&
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
          <Route path="/statistiques/:type/:id/:dateDebut/:dateFin/:codePostal/:ville" component={EnregistrerStatistiquesPdf} />
          <Route path="/statistiques/:type/:id/:dateDebut/:dateFin/:codePostal" component={EnregistrerStatistiquesPdf} />
          <Route path="/statistiques/:type/:dateDebut/:dateFin" component={EnregistrerStatistiquesPdf} />
          {user?.role === 'conseiller' &&
            <PrivateRoute exact path="*" component={Home}/>
          }
          {(user?.role === 'admin_coop') &&
            <PrivateRoute exact path="*" component={Admin}/>
          }
          {(user?.role === 'hub_coop') &&
            <PrivateRoute exact path="*" component={Hub}/>
          }
          {user?.role === 'coordinateur_coop' &&
          <PrivateRoute exact path="*" component={Coordinateur}/>
          }
          <Redirect from="/" to="/login"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
