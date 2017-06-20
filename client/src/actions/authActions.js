import request from 'superagent';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

export const createUser = user => ({
  type: c.CREATE_USER, user
});

export const logoutUser = () => ({ type: c.LOGOUT });
export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser());
};

export const loginSuccessful = user => ({
  type: c.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
  user
});

export const loginFailed = message => ({
  type: c.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,

});

export const loginUser = user => ({ type: c.LOGIN, user });

export const login = userData => (dispatch) => {
  dispatch(loginUser(userData));
  return (
    request
      .post('/api/users/login')
      .send(userData)
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
  );
};
export const signupRequest = userData => (dispatch) => {
  dispatch(createUser(userData));
  return (
    request
      .post('/api/users')
      .send(userData)
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
  );
};
