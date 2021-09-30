import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import craReducer from './craReducer';
import menuReducer from './menuReducer';
import checkMotDePasseOublieReducer from './checkMotDePasseOublieReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';
import statistiqueReducer from './statistiqueReducer';
import filtersAndSortsReducer from './filtersAndSortsReducer';
import pagination from './paginationReducer';
import ressources from './ressourcesReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  conseiller: conseillerReducer,
  structure: structureReducer,
  cra: craReducer,
  menu: menuReducer,
  checkMotDePasseOublie: checkMotDePasseOublieReducer,
  motDePasseOublie: motDePasseOublieReducer,
  statistique: statistiqueReducer,
  filtersAndSorts: filtersAndSortsReducer,
  pagination: pagination,
  ressources: ressources
});

export default rootReducer;
