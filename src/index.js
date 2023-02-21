import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const loginUrl = process.env.REACT_APP_ESPACE_COOP_URL + '/login';
if (window.location.href.split(':').includes('file')) {
  window.location.href = loginUrl;
} else if (process.env.REACT_APP_SENTRY_ENABLED === 'true') {
  Sentry.init({
    ignoreErrors: [
      // plugins/extensions
      // SingleFile Blackbox
      `undefined is not an object (evaluating 'e.optionsAutoSave')`,
    ],
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: process.env.REACT_APP_SENTRY_TRACE_RATE,
  });
}

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
