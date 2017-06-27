import * as c from '../actions/actionTypes';

const defaultState = {
  appName: 'Doczy',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.APP_LOAD:
      return [
        ...state, {
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        }
      ];
    case c.REDIRECT:
      return [...state, { redirectTo: null }];
    case c.LOGOUT:
      return [...state, { redirectTo: '/', token: null, currentUser: null }];
    default:
      return state;
  }
};
