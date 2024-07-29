import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home';
import Hub from './components/hub';
import Coordinateur from './components/coordinateur';
import ChoosePassword from './components/anonymous/ChoosePassword';
import ChoosePasswordHub from './components/anonymous/ChoosePasswordHub';
import ValidationAccount from './components/connected/ValidationAccount';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import EnregistrerStatistiquesPdf from './components/anonymous/EnregistrerStatistiquesPdf';
import StatistiquesNationales from './components/anonymous/StatistiquesNationales';
import PrivateRoute from './components/connected/PrivateRoute';
import ChoosePasswordChangeMailbox from './components/anonymous/choosePasswordChangeMailbox';
import Propos from './components/anonymous/Propos';
import EmailConfirmer from './components/anonymous/ConfirmationEmail';
import { permanenceActions } from './actions';

import './assets/js/app.js';
import './assets/css/app.scss';
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'remixicon/fonts/remixicon.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const pdfLoading = useSelector(state => state.conseiller?.loadingPDF);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const loadingExcel = useSelector(state => state.conseiller?.loadingExcel);
  const loadingSendEmail = useSelector(state => state.motDePasseOublie?.loading);
  const downloadingExportCnfs = useSelector(state => state.conseiller?.downloadingExportCnfs);
  const loadingHistorique = useSelector(state => state.historiqueCras?.loading);
  const loadingPermanence = useSelector(state => state.permanence?.loading);
  const uploadingCV = useSelector(state => state.candidat?.uploading);
  const user = useSelector(state => state?.authentication?.user?.user);
  const reloadList = useSelector(state => state.permanence?.reloadList);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loadingDeleteCv = useSelector(state => state.candidat?.loadingDeleteCv);
  const loadingDownloadCv = useSelector(state => state.candidat?.downloading);

  const dispatch = useDispatch();
  useEffect(() => {
    if (reloadList && conseiller?._id) {
      dispatch(permanenceActions.reloadList(false));
      dispatch(permanenceActions.getMesPermanences(conseiller?._id));
    }
  }, [reloadList]);

  return (
    <div className="App">
      {(statsDataLoading === true || pdfLoading === true || loadingCSV === true || loadingExcel === true ||
        downloadingExportCnfs === true || loadingHistorique === true || loadingPermanence === true || uploadingCV === true || loadingSendEmail === true ||
        loadingDeleteCv === true || loadingDownloadCv === true) &&
        <div className="wrapperModal"></div>
      }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mot-de-passe-oublie" element={<ForgottenPassword />} />
        <Route path="/renouveler-mot-de-passe/:token" element={<ForgottenPassword />} />
        <Route path="/inscription/:token" element={<ChoosePassword />} />
        <Route path="/inscription-hub/:token" element={<ChoosePasswordHub />} />
        <Route path="/conseillers/confirmation-email/:token" element={<EmailConfirmer />} />
        <Route path="/changer-email/:token" element={<ChoosePasswordChangeMailbox />} />
        <Route path="/validation" element={<ValidationAccount />} />
        <Route path="/a-propos" element={<Propos />} />
        <Route path="/statistiques-nationales" element={<StatistiquesNationales />} />
        <Route path="/statistiques/:type/:id/:dateDebut/:dateFin/:codePostal/:ville" element={<EnregistrerStatistiquesPdf />} />
        <Route path="/statistiques/:type/:id/:dateDebut/:dateFin/:codePostal" element={<EnregistrerStatistiquesPdf />} />
        <Route path="/statistiques/:type/:dateDebut/:dateFin" element={<EnregistrerStatistiquesPdf />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/accueil" />} />
          {user?.role === 'conseiller' &&
            <Route path="*" element={<Home />} />
          }
          {(user?.role === 'hub_coop') &&
            <Route path="*" element={<Hub />} />
          }
          {user?.role === 'coordinateur_coop' &&
            <Route path="*" element={<Coordinateur />} />
          }
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
