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
    default:
      return state;

    case c.CREATE_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
  }
};
export default authReducer;
