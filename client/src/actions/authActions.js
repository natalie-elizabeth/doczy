import request from 'superagent';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';
import jwtDecode from 'jwt-decode';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';

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
        dispatch(signupSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(signupFailed(error.response));
      })
  );
};

export const signupSuccessful = () => ({
  type: c.SIGNUP_SUCCESS,
  isFetching: true,
  isAuthenticated: false
});

export const signupFailed = message => ({
  type: c.SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
});

// user actions
export const usersRequest = () => ({
  type: c.USERS_REQUEST
});

export const usersSuccess = users => ({
  type: c.USERS_SUCCESS,
  users
});

export const usersFailure = users => ({
  type: c.USERS_FAILURE,
  users
});

export const listUsers = () => (dispatch) => {
  dispatch(usersRequest());
  return (
    request
      .get('/api/users')
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(usersSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersFailure(error));
      })
  );
};


export const userDeleteRequest = () => ({
  type: c.USER_DELETE_REQUEST
});

export const usersDeleteSuccess = users => ({
  type: c.USER_DELETE_SUCCESS,
  users
});

export const userDeleteFailure = users => ({
  type: c.USER_DELETE_FAILURE,
  users
});
export const deleteUser = userId => (dispatch) => {
  dispatch(userDeleteRequest());
  return (
    request
      .delete(`/api/users/${userId}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(usersDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersDeleteFailure(error.response));
      })
  );
};

export const updateUser = userData => (dispatch) => {
  dispatch(userUpdateRequest(userData));
  return (
    request
      .put(`/api/users/${userData.id}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .send(userData)
      .then((response) => {
        dispatch(userUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(userUpdateFailure(error.response));
      })
  );
};

export const userUpdateRequest = users => ({
  type: c.USER_UPDATE_REQUEST,
  users
});

export const userUpdateSuccess = user => ({
  type: c.USER_UPDATE_SUCCESS,
  user
});

export const userUpdateFailure = users => ({
  type: c.USER_UPDATE_FAILURE,
  users
});
