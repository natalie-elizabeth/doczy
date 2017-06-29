import request from 'superagent';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import jwtDecode from 'jwt-decode';
import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';


export const listRoles = () => (dispatch) => {
    dispatch(rolesRequest());
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

export const deleteRole = roleId => (dispatch) => {
    dispatch(roleDeleteRequest());
    return (
        request
            .delete(`/api/roles/${roleId}`)
            .set('x-access-token', window.localStorage.getItem('token'))
            .then((response) => {
                dispatch(roleDeleteSuccess(response.body));
            })
            .catch((error) => {
                dispatch(roleDeleteFailure(error.response));
            })
    );
};

export const roleDeleteRequest = () => ({
    type: c.ROLE_DELETE_REQUEST
});

export const roleDeleteSuccess = roles => ({
    type: c.ROLE_DELETE_SUCCESS,
    roles
});

export const roleDeleteFailure = roles => ({
    type: c.ROLE_DELETE_FAILURE,
    roles
});

export const updateRole = roleData => (dispatch) => {
    dispatch(rolesUpdateRequest(roleData));
    return (
        request
            .put(`/api/roles/${roleData.id}`)
            .set('x-access-token', window.localStorage.getItem('token'))
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
    type: c.ROLE_UPDATE_REQUEST,
    roles
});

export const rolesUpdateSuccess = roles => ({
    type: c.ROLE_UPDATE_SUCCESS,
    roles
});

export const rolesUpdateFailure = roles => ({
    type: c.ROLE_UPDATE_FAILURE,
    roles
});
