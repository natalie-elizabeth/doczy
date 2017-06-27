import request from 'superagent';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import jwtDecode from 'jwt-decode';
import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';


export const listRoles = () => (dispatch) => {
  dispatch(RolesRequest());
  return (
    request
      .get('/api/roles')
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(rolesLoadSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesLoadFailure(error));
      })
  );
};

export const rolesRequest = () => ({
  type: c.ROLE_REQUEST
});

export const rolesLoadSuccess = roles => ({
  type: c.ROLE_SUCCESS,
  roles
});

export const rolesLoadFailure = roles => ({
  type: c.ROLE_FAILURE,
  roles
});

export const createRole = roleData => (dispatch) => {
  dispatch(roleAddRequest(roleData));
  return (
    request
      .post('/api/roles')
      .set('x-access-token', window.localStorage.getItem('token'))
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
  type: c.ROLE_ADD_REQUEST,
  roles
});

export const rolesAddSuccess = roles => ({
  type: c.ROLE_ADD_SUCCESS,
  roles
});

export const rolesAddFailure = roles => ({
  type: c.ROLE_ADD_FAILURE,
  roles
});


