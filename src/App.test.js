import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

jest.mock('@gouvfr/all/dist/js/all.min', () => jest.fn());

const initialState = {
  menu: {
    hiddenBurgerMenu: true
  }
};
const mockStore = configureStore();
let store;

it('App render without crashing', () => {
  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>);
});
