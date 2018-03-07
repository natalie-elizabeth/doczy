import reducer from '../../client/src/reducers/authReducer';
import * as c from '../../client/src/actions/actionTypes';

describe('authReducers', () => {
  it('should handle create user request', () => {
    const action = {
      type: c.CREATE_USER
    };
    const expected = {
      isFetching: true,
      isSignedUp: false,
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle successful user add', () => {
    const action = {
      type: c.SIGNUP_SUCCESS
    };
    const expected = {
      isFetching: true,
      isSignedUp: false,
    };
  });
  it('should handle create user success', () => {
    const state = {
      users: []
    };

    const user = {
      userame: 'username',
      firstname: 'firstname',
      lastame: 'lastname',
      email: 'email',
      password: 'password'
    };

    const action = {
      type: c.SIGNUP_SUCCESS,
      users: user
    };

    const expected = Object.assign({}, state, {
      users: [user],
      loading: false,
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });
});
