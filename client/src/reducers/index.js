import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';
import common from './common';

const rootReducer = combineReducers({ authReducer, documents, common });

export default rootReducer;
