import { APP_LOAD, REDIRECT } from '../actions/actionTypes';

const defaultState = {
  appName: 'Doczy',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return [
        ...state, {
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.username : null
        }
      ];
    case REDIRECT:
      return [...state, { redirectTo: null }];

    default:
      return state;
  }
};
