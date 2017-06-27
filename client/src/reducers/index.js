import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';
import common from './common';
import rolesReducer from './rolesReducer';

const rootReducer = combineReducers({ authReducer, documents, common, rolesReducer });

export default rootReducer;
