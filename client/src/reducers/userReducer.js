import * as c from '../actions/actionTypes';

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
    case c.USERS_GET_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users,
        error: null,
        loading: false,
      });
    case c.USERS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case c.USER_DELETE_SUCCESS:
      return Object.assign({}, state, {
        users: state.users.filter(id => id !== action.userId),
      });
    case c.USER_DOCUMENT_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });

    case c.USER_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });

    case c.USER_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        error: null,
        loading: false
      });

    case c.SET_USERS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: action.searchFilter,
      });
    case c.USER_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        users: state.roles.map(user => {
          if (user.id === action.user.id) {
            user.role_id = action.role_id;
          }
          console.log('Updated>>>>', user);
          return user;
        }),
        error: null,
        loading: true,
      });

    case c.USER_UPDATE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case c.USERS_GET_FAILURE:
    case c.USERS_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case c.USERS_GET_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    default:
      return state;
  }
}
