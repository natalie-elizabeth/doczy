import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/roleActions';
import * as c from '../../client/src/actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions', () => {
  it('should add role on request', () => {
    const action = {
      type: c.ROLE_ADD_REQUEST
    };
    expect(actions.roleAddRequest()).toEqual(action);
  });
  it('should return success of a successful role add', () => {
    const action = {
      type: c.ROLE_ADD_SUCCESS
    };
    expect(actions.rolesAddSuccess()).toEqual(action);
  });
  it('should fail on unsuccessful role add', () => {
    const action = {
      type: c.ROLE_ADD_FAILURE
    };
    expect(actions.rolesAddFailure()).toEqual(action);
  });
  it('should delete role of delete request', () => {
    const action = {
      type: c.ROLE_DELETE_REQUEST
    };
    expect(actions.roleDeleteRequest()).toEqual(action);
  });
  it('should delete a role on delete success', () => {
    const expectedAction = {
      type: c.ROLE_DELETE_SUCCESS
    };
    expect(actions.roleDeleteSuccess()).toEqual(expectedAction);
  });

});
