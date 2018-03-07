import {
  USERS_SUCCESS, USERS_FAILURE, USERS_GET_SUCCESS, USER_DELETE_SUCCESS, USER_DOCUMENT_REQUEST, USER_DOCUMENT_SUCCESS,
  USER_DOCUMENT_FAILURE, SET_USERS_SEARCH_FILTER, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE,
  USERS_GET_FAILURE, USERS_ADD_FAILURE, USERS_GET_REQUEST
} from '../actions/actionTypes';

const USER_LIST = {
  users: [],
  error: null,
  loading: false,
  searchFilter: '',
  edittingRoleId: false,
  newRoleValue: ''
};

export default function userReducer(state = USER_LIST, action) {
  switch (action.type) {
    case USERS_GET_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users,
        error: null,
        loading: false,
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case USER_DELETE_SUCCESS:
      return Object.assign({}, state, {
        users: state.users.filter(id => id !== action.userId),
      });
    case USER_DOCUMENT_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });

    case USER_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });

    case USER_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        error: null,
        loading: false
      });

    case SET_USERS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: action.searchFilter,
      });
    case USER_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        users: state.roles.map(user => {
          if (user.id === action.user.id) {
            user.role_id = action.role_id;
          }
          return user;
        }),
        error: null,
        loading: true,
      });

    case USER_UPDATE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case USERS_GET_FAILURE:
    case USERS_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case USERS_GET_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    default:
      return state;
  }
}
