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
import ressourcesFiltres from './ressourcesFiltresReducer';
import permanence from './permanenceReducer';
import formulaireSupHierarchique from './supHierarchiqueReducer';
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
  ressources: ressources,
  ressourcesFiltres: ressourcesFiltres,
  permanence: permanence,
  formulaireSupHierarchique: formulaireSupHierarchique

});

export default rootReducer;
