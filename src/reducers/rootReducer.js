import authenticationReducer from './authenticationReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication: authenticationReducer
})

export default rootReducer;
