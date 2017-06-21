import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as c from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtils';


// document creation
export const createDocument = documents => ({
  type: c.CREATE_DOCUMENT,
  documents
});

export const creationSuccess = documents => ({
  type: C.CREATION_SUCCESS,
  documents
});

export const creationFailure = documents => ({
  type: C.CREATION_FAILURE,
  documents
});

export const newDocument = documentData => (dispatch) => {
  dispatch(createDocument(documentData));
  console.log('token: ', window.localStorage.getItem('token'));
  return (
    request
      .post('/api/documents')
      .set('x-access-token', window.localStorage.getItem('token'))
      .send(documentData)
      .then((response) => {
        dispatch(creationSuccess(response.body));
      })
      .catch((error) => {
        dispatch(creationFailure(error.response));
      })
  );
};




// document closing
export const closeDocument = () => ({
  type: c.CLOSE_DOCUMENT
});


// document listing
export const documentsRequest = () => ({
  type: c.DOCUMENTS_RETRIEVAL
});

export const listDocuments = () => (dispatch) => {
  dispatch(documentsRequest());
  return (
    request
      .get('/api/documents')
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsRetrievalSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsRetrievalFailure(error));
      })
  );
};

export const documentsRetrievalSuccess = documents => ({
  type: c.DOCUMENTS_RETRIEVAL_SUCCESS,
  documents
});

export const documentsRetrievalFailure = documents => ({
  type: c.DOCUMENTS_RETRIEVAL_FAILURE,
  documents
});


// get a document
export const documentsGetRequest = () => ({
  type: c.GET_DOCUMENT,
});

export const documentsGetSuccess = documents => ({
  type: c.GET_SUCCESS,
  documents
});

export const documentsGetFailure = documents => ({
  type: c.GET_FAILURE,
  documents
});

export const getDocument = documentId => (dispatch) => {
  dispatch(documentsGetRequest());
  return (
    request
      .get(`/api/documents/${documentId}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsGetFailure(error.response));
      })
  );
};


// delete document
export const documentsDeleteRequest = () => ({
  type: c.DELETE_DOCUMENT
});
export const documentsDeleteSuccess = documents => ({
  type: c.DELETE_SUCCESS,
  documents
});
export const documentsDeleteFailure = documents => ({
  type: c.DELETE_FAILURE,
  documents
});
export const deleteDocument = documentId => (dispatch) => {
  dispatch(documentsDeleteRequest());
  return (
    request
      .delete(`/api/documents/${documentId}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsDeleteFailure(error.response));
      })
  );
};


// update documents

export const documentsUpdateRequest = documents => ({
  type: c.UPDATE_DOCUMENT,
  documents
});

export const documentsUpdateSuccess = documents => ({
  type: c.UPDATE_SUCCESS,
  documents
});

export const documentsUpdateFailure = documents => ({
  type: c.UPDATE_FAILURE,
  documents
});

export const updateDocument = documentData => (dispatch) => {
  dispatch(documentsUpdateRequest(documentData));
  return (
    request
      .put(`/api/documents/${documentData.id}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .send(documentData)
      .then((response) => {
        dispatch(documentsUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsUpdateFailure(error.response));
      })
  );
};






export const documentsSearchFilter = searchFilter => ({
  type: c.SET_DOCUMENTS_SEARCH_FILTER,
  searchFilter
});

/* eslint no-undef: "off"*/

// delete Document






