import { combineReducers } from 'redux'
import schools from './schools';
import users from './users';



export default combineReducers({ users, schools });
export * from './users';
export * from './schools';

