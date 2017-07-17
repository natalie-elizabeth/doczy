import reducer from '../../client/src/reducers/userReducer';
import * as c from '../../client/src/actions/actionTypes';

describe('User reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      error: null,
      loading: true,
      searchFilter: '',
      edittingRoleId: false,
      newRoleValue: ''
    });
  });

});
