import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/docActions';
import * as c from '../../client/src/actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions', () => {
  it('should add document on request', () => {
    const action = {
      type: c.DOCUMENT_ADD_REQUEST
    };
    expect(actions.documentsAddRequest()).toEqual(action);
  });
  it('should return success of a successful document add', () => {
    const action = {
      type: c.DOCUMENT_ADD_SUCCESS
    };
    expect(actions.documentsAddSuccess()).toEqual(action);
  });
  it('should fail on unsuccessful document addition', () => {
    const action = {
      type: c.DOCUMENT_ADD_FAILURE
    };
    expect(actions.documentsAddFailure()).toEqual(action);
  });
  it('should close document on close', () => {
    const action = {
      type: c.CLOSE_DOCUMENT
    };
    expect(actions.closeDocument()).toEqual(action);
  });

  // delete
  it('should delete document on delete request', () => {
    const action = {
      type: c.DOCUMENT_DELETE_REQUEST
    };
    expect(actions.documentsDeleteRequest()).toEqual(action);
  });
  it('should delete a document on delete success', () => {
    const expectedAction = {
      type: c.DOCUMENT_DELETE_SUCCESS
    };
    expect(actions.documentsDeleteSuccess()).toEqual(expectedAction);
  });
  it('should fail to delete on delete failure', () => {
    const action = {
      type: c.DOCUMENT_DELETE_FAILURE
    };
    expect(actions.documentsDeleteFailure()).toEqual(action);
  });

  // update
  it('should update a document on document update request', () => {
    const expectedAction = {
      type: c.DOCUMENT_UPDATE_REQUEST
    };
    expect(actions.documentsUpdateRequest()).toEqual(expectedAction);
  });
  it('should delete a document on update success', () => {
    const expectedAction = {
      type: c.DOCUMENT_UPDATE_SUCCESS
    };
    expect(actions.documentsUpdateSuccess()).toEqual(expectedAction);
  });
  it('should delete a document on updatee failure', () => {
    const expectedAction = {
      type: c.DOCUMENT_UPDATE_FAILURE
    };
    expect(actions.documentsUpdateFailure()).toEqual(expectedAction);
  });


  // create
  it('should create a new Document on create document', () => {
    const response = {
      body: {
        title: 'title',
        content: 'content',
        access: 'access',
      }
    };

    nock(/^.*$/)
      .post('/api/documents')
      .reply(201, response.body);

    const expectedActions = [{
      type: c.DOCUMENT_ADD_REQUEST,
      documents: response.body
    }, {
      type: c.DOCUMENT_ADD_SUCCESS,
      documents: response.body,
    }];

    const store = mockStore({ document: [] });

    return store.dispatch(actions.createDocument(response.body)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
