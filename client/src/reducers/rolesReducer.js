import {
  ROLE_ADD_REQUEST, ROLE_ADD_SUCCESS, ROLE_ADD_FAILURE, ROLE_REQUEST, ROLE_SUCCESS, ROLE_FAILURE,
  ROLE_GET_FAILURE, ROLE_DELETE_SUCCESS, ROLE_UPDATE_REQUEST, ROLE_UPDATE_SUCCESS, ROLE_UPDATE_FAILURE
} from '../actions/actionTypes';

const ROLES_LIST = {
  roles: [],
  error: null,
  loading: false,
  searchFilter: '',
  edittingRoleId: false,
  newRoleValue: ''
};

export default function rolesReducer(state = ROLES_LIST, action) {

  switch (action.type) {
    default:
      return state;

    case ROLE_ADD_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });

    case ROLE_ADD_SUCCESS:
      return Object.assign({}, state, {
        roles: [action.roles,
        ...state.roles],
        loading: false,
      });

    case ROLE_GET_FAILURE:
    case ROLE_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case ROLE_SUCCESS:
      return Object.assign({}, state, {
        roles: action.roles,
        error: null,
        loading: false,
      });

    case ROLE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case ROLE_REQUEST:
      return Object.assign({}, state, {
        error: action.error,
        loading: true,
      });

    case ROLE_DELETE_SUCCESS:
      let newState = state.roles.filter(role => role.id !== action.roleId);
      return Object.assign({}, state, {
        roles: newState,
      });

    case ROLE_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });

    case ROLE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        roles: state.roles.map(role => {
          if (role.id === action.roleId) {
            role.role_name = action.role_name;
          }
          return role;
        }),
        error: null,
        loading: true,
      });

    case ROLE_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

  }
};
