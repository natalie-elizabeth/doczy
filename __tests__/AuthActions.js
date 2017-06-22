import * as actions from '../client/src/actions/authActions';
import * as c from '../client/src/actions/actionTypes';

describe('actions', () => {
  it('should create a user', () => {
    const user = "Natalie Larhette";
    const expectedAction = {
      type: c.CREATE_USER, user
    };
    expect(actions.createUser(user)).toEqual(expectedAction);
  });
});
