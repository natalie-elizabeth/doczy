import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../client/src/actions/authActions';
import * as c from '../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should login a user', () => {
    const user = "Natalie Larhette";
    const expectedAction = {
      type: c.LOGIN, user
    };
    expect(actions.loginUser(user)).toEqual(expectedAction);
  });
});
