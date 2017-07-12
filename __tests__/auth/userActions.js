import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/authActions';
import * as c from '../../client/src/actions/actionTypes';
// import * as tokenUtils from '../'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should close user on close', () => {
    const expectedAction = {
      type: c.USERS_REQUEST
    };
    expect(actions.usersRequest()).toEqual(expectedAction);
  });
  it('should add user on add request', () => {
    const expectedAction = {
      type: c.CREATE_USER
    };
    expect(actions.signupRequest()).toEqual(expectedAction);
  });
  it('should show success on a succcessful add of user', () => {
    const expected = {
      type: c.SIGNUP_SUCCESS
    };
    expect(actions.signupSuccessful()).toEqual(expected);
  });
  it('should show failure on add fail', () => {
    const expectedAction = {
      type: c.SIGNUP_FAILURE
    };
    expect(actions.signupFailed()).toEqual(expectedAction);
  });
  it('should get a user on user get success', () => {
    const expectedAction = {
      type: c.USERS_SUCCESS
    };
    expect(actions.usersSuccess()).toEqual(expectedAction);
  });
  it('should not get user on get failure', () => {
    const expectedAction = {
      type: c.USERS_FAILURE
    };
    expect(actions.usersFailure()).toEqual(expectedAction);
  });
  it('should update a user on user update success', () => {
    const expectedAction = {
      type: c.USER_UPDATE_SUCCESS
    };
    expect(actions.userUpdateSuccess()).toEqual(expectedAction);
  });
  it('should not update a user on user update failure', () => {
    const expectedAction = {
      type: c.USER_UPDATE_FAILURE
    };
    expect(actions.userUpdateFailure()).toEqual(expectedAction);
  });
  it('should delete a user on user delete success', () => {
    const expectedAction = {
      type: c.USER_DELETE_SUCCESS
    };
    expect(actions.usersDeleteSuccess()).toEqual(expectedAction);
  });
  it('should not delete a user on user delete failure', () => {
    const expectedAction = {
      type: c.USER_DELETE_FAILURE
    };
    expect(actions.userDeleteFailure()).toEqual(expectedAction);
  });
  it('should list all available users', () => {
    const response = {
      body: {
        users: []
      }
    };

    nock(/^.*$/)
      .get('/api/users')
      .reply(200, response.body);

    const expectedActions = [{
      type: c.USERS_REQUEST
    }, {
      type: c.USERS_SUCCESS,
      users: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.listUsers()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
  it('should update a user', () => {
    const editFields = {
      id: '1',
      firstname: 'firstame',
      lastname: 'lastname',
      username: 'username',
      email: 'email',
      password: 'password'
    };
    const response = {
      body: {
        id: 1,
        tfirstName: 'firstname',
        lastName: 'lastname',
        userName: 'username',
        email: 'email',
        password: 'password'
      }
    };
    nock(/^.*$/)
      .put('/api/users/' + editFields.id)
      .reply(201, response.body);
    const expectedActions = [{
      type: c.USER_UPDATE_REQUEST,
      users: editFields
    }, {
      type: c.USER_UPDATE_SUCCESS,
      user: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.updateUser(editFields)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
