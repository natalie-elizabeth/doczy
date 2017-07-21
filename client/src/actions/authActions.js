import request from 'superagent';
import {
  LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE, USER_DOCUMENT_REQUEST,
  USER_DOCUMENT_SUCCESS, USER_DOCUMENT_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE, CREATE_USER, LOGIN
} from './actionTypes.js';
import * as tokenUtils from '../utils/tokenUtils';
import jwtDecode from 'jwt-decode';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';

export const createUser = user => ({
  type: CREATE_USER, user
});

export const logoutUser = () => ({ type: c.LOGOUT });
export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser());
};

export const loginSuccessful = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
  user
});

export const loginFailed = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,

});

export const loginUser = user => ({ type: LOGIN, user });

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
  type: SIGNUP_SUCCESS,
  isFetching: true,
  isAuthenticated: false
});

export const signupFailed = message => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
});

// user actions
export const usersRequest = () => ({
  type: USERS_REQUEST
});

export const usersSuccess = users => ({
  type: USERS_SUCCESS,
  users
});

export const usersFailure = users => ({
  type: USERS_FAILURE,
  users
});

export const listUsers = () => (dispatch) => {
  dispatch(usersRequest());
  return (
    request
      .get('/api/users')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(usersSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersFailure(error));
      })
  );
};

export const listUsersDocuments = () => (dispatch) => {
  dispatch(userDocumentsRequest());
  return (
    request
      .get('api/users/:id/documents')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(userDocumentsSuccess(response.body));
      })
      .catch((error) => {
        dispatch(userDocumentFailure(error));
      })

  );
};

export const userDocumentRequest = () => ({
  type: USER_DOCUMENT_REQUEST
});

export const userDocumentsSuccess = () => ({
  type: USER_DOCUMENT_SUCCESS
});

export const userDocumentsFailure = () => ({
  type: USER_DOCUMENT_FAILURE
});

export const userDeleteRequest = () => ({
  type: USER_DELETE_REQUEST
});

export const usersDeleteSuccess = users => ({
  type: USER_DELETE_SUCCESS,
  users
});

export const userDeleteFailure = users => ({
  type: USER_DELETE_FAILURE,
  users
});

export const deleteUser = userId => (dispatch) => {
  dispatch(userDeleteRequest());
  return (
    request
      .delete(`/api/users/${userId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(usersDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersDeleteFailure(error.response));
      })
  );
};

export const updateUser = userData => (dispatch) => {
  dispatch(userUpdateRequest(userData.id));
  return (
    request

      .put(`/api/users/${userData.id}`)
      .set('x-access-token', tokenUtils.getAuthToken())
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
  type: USER_UPDATE_REQUEST,
  users
});

export const userUpdateSuccess = user => ({
  type: USER_UPDATE_SUCCESS,
  user
});

export const userUpdateFailure = users => ({
  type: USER_UPDATE_FAILURE,
  users
});
