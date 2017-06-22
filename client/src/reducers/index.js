import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({ authReducer, documents });

export default rootReducer;
