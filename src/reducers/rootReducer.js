import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
});

export default rootReducer;
