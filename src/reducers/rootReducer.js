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
import paginationReducer from './paginationReducer';
import permanenceReducer from './permanenceReducer';
import supHierarchiqueReducer from './supHierarchiqueReducer';
import informationsReducer from './informationsReducer';
import historiqueCrasReducer from './historiqueCrasReducer';
import candidatReducer from './candidatReducer';
import alerteReducer from './alerteReducer';
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
  pagination: paginationReducer,
  permanence: permanenceReducer,
  formulaireSupHierarchique: supHierarchiqueReducer,
  formulaireInformations: informationsReducer,
  historiqueCras: historiqueCrasReducer,
  candidat: candidatReducer,
  alerte: alerteReducer
});

export default rootReducer;
