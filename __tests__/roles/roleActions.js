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
  it('should fail to delete on delete failure', () => {
    const action = {
      type: c.ROLE_DELETE_FAILURE
    };
    expect(actions.roleDeleteFailure()).toEqual(action);
  });
  it('should update on update request', () => {
    const expectedAction = {
      type: c.ROLE_UPDATE_REQUEST
    };
    expect(actions.rolesUpdateRequest()).toEqual(expectedAction);
  });
  it('should fail to update on update success', () => {
    const expectedAction = {
      type: c.ROLE_UPDATE_SUCCESS
    };
    expect(actions.rolesUpdateSuccess()).toEqual(expectedAction);
  });

  it('should update on update failure', () => {
    const expectedAction = {
      type: c.ROLE_UPDATE_FAILURE
    };
    expect(actions.rolesUpdateFailure()).toEqual(expectedAction);
  });
  it('should create a new role on create role', () => {
    const response = {
      body: {
        role_name: 'role_name'
      }
    };

    nock(/^.*$/)
      .post('/api/roles')
      .reply(201, response.body);

    const expectedActions = [{
      type: c.ROLE_ADD_REQUEST,
      roles: response.body
    }, {
      type: c.ROLE_ADD_SUCCESS,
      roles: response.body,
    }];

    const store = mockStore({ role: [] });

    return store.dispatch(actions.createRole(response.body)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
  it('should update a role', () => {
    const response = {
      body: {
        role_name: 'role_name'
      }
    };
    nock(/^.*$/)
      .put('/api/roles')
      .reply();

  });
  it('should update a role', () => {
    const editFields = {
      id: '1',
      role_name: 'role_name'
    };
    const response = {
      body: {
        id: 1,
        role_name: 'role_name'
      }
    };
    nock(/^.*$/)
      .put('/api/roles/' + editFields.id)
      .reply(201, response.body);
    const expectedActions = [{
      type: c.ROLE_UPDATE_REQUEST,
      roles: editFields
    }, {
      type: c.ROLE_UPDATE_SUCCESS,
      role: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.updateRole(re)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
  it('should list all available roles', () => {
    const response = {
      body: {
        roles: []
      }
    };

    nock(/^.*$/)
      .get('/api/roles')
      .reply(200, response.body);

    const expectedActions = [{
      type: c.ROLE_REQUEST
    }, {
      type: c.ROLE_SUCCESS,
      roles: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.listRoles()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
  it('should delete a role', () => {
    const response = {
      body: {}
    };
    const roleId = 1;
    nock(/^.*$/)
      .delete(`/api/roles/${roleId}`)
      .reply(204, response.body);

    const expectedActions = [{
      type: c.ROLE_DELETE_REQUEST
    }, {
      type: c.ROLE_DELETE_SUCCESS,
      roles: response.body,
    }];

    const store = mockStore({});
    return store.dispatch(actions.deleteRole(response)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
