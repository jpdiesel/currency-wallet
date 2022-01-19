import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import api from './api';

const rootReducer = combineReducers({ user, wallet, api });

export default rootReducer;
