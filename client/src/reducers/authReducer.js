import isEmpty from 'lodash/isEmpty';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, CREATE_USER, SIGNUP_USER, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

const authReducer = (state = { isFetching: false, isAuthenticated: !!tokenUtils.getAuthToken() }, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message.message
      });
    default:
      return state;

    case CREATE_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
    case SIGNUP_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: true,
        errorMessage: '',
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: false,
        errorMessage: 'Server Error.'
      });
  }
};
export default authReducer;
