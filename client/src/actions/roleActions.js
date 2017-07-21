import request from 'superagent';
// import * as c from '../actions/actionTypes';
import {
  ROLE_REQUEST, ROLE_SUCCESS, ROLE_FAILURE, ROLE_ADD_FAILURE, ROLE_ADD_SUCCESS, ROLE_DELETE_REQUEST,
  ROLE_ADD_REQUEST, ROLE_DELETE_FAILURE, ROLE_DELETE_SUCCESS, ROLE_UPDATE_REQUEST, ROLE_UPDATE_FAILURE, ROLE_UPDATE_SUCCESS
} from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import jwtDecode from 'jwt-decode';
import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';



export const listRoles = () => (dispatch) => {
  dispatch(rolesRequest());
  return (
    request
      .get('/api/roles')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(rolesLoadSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesLoadFailure(error));
      })
  );
};

export const rolesRequest = () => ({
  type: ROLE_REQUEST
});

export const rolesLoadSuccess = roles => ({
  type: ROLE_SUCCESS,
  roles
});

export const rolesLoadFailure = roles => ({
  type: ROLE_FAILURE,
  roles
});

export const createRole = roleData => (dispatch) => {
  dispatch(roleAddRequest(roleData));
  return (
    request
      .post('/api/roles')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(roleData)
      .then((response) => {
        dispatch(rolesAddSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesAddFailure(error.response));
      })
  );
};

export const roleAddRequest = roles => ({
  type: ROLE_ADD_REQUEST,
  roles
});

export const rolesAddSuccess = roles => ({
  type: ROLE_ADD_SUCCESS,
  roles
});

export const rolesAddFailure = roles => ({
  type: ROLE_ADD_FAILURE,
  roles
});

export const deleteRole = roleId => (dispatch) => {
  dispatch(roleDeleteRequest());
  return (
    request
      .delete(`/api/roles/${roleId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(roleDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(roleDeleteFailure(error.response));
      })
  );
};

export const roleDeleteRequest = () => ({
  type: ROLE_DELETE_REQUEST
});

export const roleDeleteSuccess = roleId => ({
  type: ROLE_DELETE_SUCCESS,
  roleId
});

export const roleDeleteFailure = roles => ({
  type: ROLE_DELETE_FAILURE,
  roles
});


export const updateRole = roleData => (dispatch) => {
  dispatch(rolesUpdateRequest(roleData.id));
  return (
    request
      .put(`/api/roles/${roleData.id}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(roleData)
      .then((response) => {
        dispatch(rolesUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesUpdateFailure(error.response));
      })
  );
};



export const rolesUpdateRequest = roles => ({
  type: ROLE_UPDATE_REQUEST,
  roles
});

export const rolesUpdateSuccess = roles => ({
  type: ROLE_UPDATE_SUCCESS,
  roles
});

export const rolesUpdateFailure = roles => ({
  type: ROLE_UPDATE_FAILURE,
  roles
});
