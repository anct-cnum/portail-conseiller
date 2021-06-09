import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import craReducer from './craReducer';
import menuReducer from './menuReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';
import statistiqueReducer from './statistiqueReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  conseiller: conseillerReducer,
  structure: structureReducer,
  cra: craReducer,
  menu: menuReducer,
  motDePasseOublie: motDePasseOublieReducer,
  statistique: statistiqueReducer,
});

export default rootReducer;
