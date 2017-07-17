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

});
