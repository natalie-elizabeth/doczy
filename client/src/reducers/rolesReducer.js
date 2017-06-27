import isEmpty from 'lodash/isEmpty';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

const ROLES_LIST = {
    roles: [],
    error: null,
    loading: false,
    searchFilter: ''
};

const rolesReducer = (state = { ROLES_LIST, isAuthenticated: !!tokenUtils.getAuthToken() }, action) => {
    switch (action.type) {
        case c.LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });
        default:
            return state;

        case c.ROLE_ADD_REQUEST:
            return Object.assign({}, state, {
                error: null,
                loading: true,
            });
        case c.ROLE_ADD_SUCCESS:
            return Object.assign({}, state, {
                documents: [action.roles,
                ...state.roles],
                loading: false,
            });
        case c.ROLE_GET_FAILURE:
        case c.ROLE_ADD_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
            });
        case c.ROLE_SUCCESS:
            return Object.assign({}, state, {
                documents: action.documents,
                error: null,
                loading: false,
            });
        case c.ROLE_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
            });
    }
};
export default rolesReducer;
