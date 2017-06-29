import isEmpty from 'lodash/isEmpty';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

const authReducer = (state = { isFetching: false, isAuthenticated: !!tokenUtils.getAuthToken() }, action) => {
  switch (action.type) {
    case c.LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });

    case c.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user.user
      });
    case c.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message.message
      });
    default:
      return state;

    case c.CREATE_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
    case c.SIGNUP_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
    case c.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: true,
        errorMessage: '',
      });
    case c.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: false,
        errorMessage: 'Server Error.'
      });
  }
};
export default authReducer;
