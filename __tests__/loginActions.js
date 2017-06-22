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

// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//   it('create LOGIN_SUCCESS when login has been done', () => {
//     nock('/api/users/login')
//       .get('/users/login')
//       .reply(200, { body: { users: ['do something'] } });

//     const expectedActions = [
//       { type: c.LOGIN },
//       { type: c.LOGIN_SUCCESS, body: { todos: ['do something'] } }
//     ];
//     const store = mockStore({ users: [] });

//     return store.dispatch(actions.loginSuccessful()).then(() => {
//       // return of async actions
//       expect(store.loginUser()).toEqual(expectedActions);

//     });
//   });
// });
