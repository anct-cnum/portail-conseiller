import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { browserTracingIntegration } from '@sentry/browser';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import * as Sentry from '@sentry/react';
import { BrowserRouter as Router } from 'react-router-dom';

const loginUrl = process.env.REACT_APP_ESPACE_COOP_URL + '/login';
if (window.location.href.split(':').includes('file')) {
  window.location.href = loginUrl;
} else if (process.env.REACT_APP_SENTRY_ENABLED === 'true') {
  Sentry.init({
    ignoreErrors: [
      // plugins/extensions
      // SingleFile
      /e.optionsAutoSave/i,
      // Blackbox
      /CodeMirror/i,
      //Firefox interdit aux addOns de conserver des références fortes aux objets DOM après la destruction de leur document parent.
      /access dead object/i,
      //googletag
      /googletag/i,
      //BetterJsPop erreur semblant venir d'un add block
      /BetterJsPop/i,
      //Extension Safari
      /webkit-masked-url/i,
      //can't redefine non-configurable property "metadata"
      /metadata/i,
      // Problème avec l'extension bitwarden sur firefox
      /Permission denied to access property/i,
    ],
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [browserTracingIntegration()],
    tracesSampleRate: process.env.REACT_APP_SENTRY_TRACE_RATE,
  });
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
