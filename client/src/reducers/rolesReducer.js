import * as c from '../actions/actionTypes';

const ROLES_LIST = {
  roles: [],
  error: null,
  loading: false,
  searchFilter: ''
};

export default function rolesReducer(state = ROLES_LIST, action) {

  switch (action.type) {
    default:
      return state;

    case c.ROLE_ADD_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.ROLE_ADD_SUCCESS:
      return Object.assign({}, state, {
        roles: [action.roles,
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
        roles: action.roles,
        error: null,
        loading: false,
      });

    case c.ROLE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case c.ROLE_REQUEST:
      return Object.assign({}, state, {
        error: action.error,
        loading: true,
      });
    case c.ROLE_DELETE_SUCCESS:
      return Object.assign({}, state, {
        roles: state.roles.filter(id => id !== action.roleId),
      });
    case c.ROLE_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.ROLE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        roles: state.roles.map(doc => doc.id === action.role.id ? action.role : doc),
        error: null,
        loading: true,
      });

    case c.ROLE_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

  }
};
