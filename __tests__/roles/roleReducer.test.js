import reducer from '../../client/src/reducers/rolesReducer';
import * as c from '../../client/src/actions/actionTypes';

describe('rolesReducer', () => {
  it('should handle successful document add', () => {
    const action = {
      type: c.ROLE_ADD_SUCCESS
    };
    const expected = {
      error: null,
      loading: true
    };
  });
  it('should handle create role request', () => {
    const action = {
      type: c.ROLE_ADD_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
  });
  it('should handle get document request', () => {
    const action = {
      type: c.ROLE_REQUEST
    };
    const expected = {
      roles: null,
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });
  it('should return initial state', () => {

  })
});
