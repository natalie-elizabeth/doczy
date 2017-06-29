import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';
import common from './common';
import rolesReducer from './rolesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ authReducer, documents, common, rolesReducer, userReducer });

export default rootReducer;
