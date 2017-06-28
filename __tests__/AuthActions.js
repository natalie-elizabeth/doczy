import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../client/src/actions/authActions';
import * as c from '../client/src/actions/actionTypes';
import * as endpoint from '../client/src/api/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create a user', () => {
    const user = "Natalie Larhette";
    const expectedAction = {
      type: c.CREATE_USER, user
    };
    expect(actions.createUser(user)).toEqual(expectedAction);
  });
  it('should create an action on user log out', () => {
    const expectedAction = {
      type: c.LOGOUT,
    };
    expect(actions.logoutUser()).toEqual(expectedAction);
  });
  it('should create an action to signup a user', () => {
    const user = {
      username: 'username',
      firstname: 'firstname',
      lastname: "lastname",
      email: "email",
      password: "password"
    };
    const expectedAction = {
      type: c.CREATE_USER,
      user
    };
    expect(actions.createUser(user)).toEqual(expectedAction);
  });
  it('should create an action to Login a user', () => {
    const user = {
      email: 'email',
      password: 'password'
    };
    const expectedAction = {
      type: c.LOGIN,
      user
    };
    expect(actions.loginUser(user)).toEqual(expectedAction);
  });
  it('should create an action to log a user succesfully', () => {
    const user = {
      email: 'email',
      password: 'password',
    };
    const expectedAction = {
      type: c.LOGIN_SUCCESS,
      user,
      isFetching: false,
      isAuthenticated: true,
    };
    expect(actions.loginSuccessful(user)).toEqual(expectedAction);
  });
  it('should craete an action on log in failure', () => {
    const message = '';
    const expectedAction = {
      type: c.LOGIN_FAILURE,
      message,
      isFetching: false,
      isAuthenticated: false,
    };
    expect(actions.loginFailed(message)).toEqual(expectedAction);
  });
});

