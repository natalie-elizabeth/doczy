import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../client/src/actions/docActions';
import * as c from '../client/src/actions/actionTypes';

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


});
