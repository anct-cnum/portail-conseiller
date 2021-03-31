import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import craReducer from './craReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  conseiller: conseillerReducer,
  structure: structureReducer,
  cra: craReducer,
});

export default rootReducer;
