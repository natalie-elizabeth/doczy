
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';

export const closeDocument = () => ({
  type: types.CLOSE_DOCUMENT
});

export const documentsRequest = () => ({
  type: types.DOCUMENT_REQUEST
});

export const documentsLoadSuccess = documents => ({
  type: types.DOCUMENT_SUCCESS,
  documents
});

export const documentsLoadFailure = documents => ({
  type: types.DOCUMENT_FAILURE,
  documents
});

export const documentsAddRequest = documents => ({
  type: types.DOCUMENT_ADD_REQUEST,
  documents
});

export const documentsAddSuccess = documents => ({
  type: types.DOCUMENT_ADD_SUCCESS,
  documents
});

export const documentsAddFailure = documents => ({
  type: types.DOCUMENT_ADD_FAILURE,
  documents
});

export const documentsGetRequest = () => ({
  type: types.DOCUMENT_GET_REQUEST
});

export const documentsGetSuccess = documents => ({
  type: types.DOCUMENT_GET_SUCCESS,
  documents
});

export const documentsGetFailure = documents => ({
  type: types.DOCUMENT_GET_FAILURE,
  documents
});

export const documentsUpdateRequest = documents => ({
  type: types.DOCUMENT_UPDATE_REQUEST,
  documents
});

export const documentsUpdateSuccess = document => ({
  type: types.DOCUMENT_UPDATE_SUCCESS,
  document
});

export const documentsUpdateFailure = documents => ({
  type: types.DOCUMENT_UPDATE_FAILURE,
  documents
});

export const documentsDeleteRequest = () => ({
  type: types.DOCUMENT_DELETE_REQUEST
});

export const documentsDeleteSuccess = documents => ({
  type: types.DOCUMENT_DELETE_SUCCESS,
  documents
});

export const documentsDeleteFailure = documents => ({
  type: types.DOCUMENT_DELETE_FAILURE,
  documents
});

export const documentsSearchFilterSuccess = searchFilter => ({
  type: types.SET_DOCUMENTS_SEARCH_FILTER_SUCCESS,
  searchFilter
});

export const documentsSearchFilterRequest = () => ({
  type: types.SET_DOCUMENTS_SEARCH_FILTER_REQUEST,
});

export const documentsSearchFilterfailure = searchFilter => ({
  type: types.SET_DOCUMENTS_SEARCH_FILTER_FAILURE,
  searchFilter
});


export const searchDocument = title => (dispatch) => {
  console.log('Search Title>>>>>', title);
  dispatch(documentsSearchFilterRequest());
  return (
    request
      .get('/api/search/documents/?q=' + title)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        console.log('response>>>>>>>>>>>>.', response);
        dispatch(documentsSearchFilterSuccess(response.body));
      })
      .catch((error) => {
        console.log('error>>>>>>>>>>>>>>>.', error);
        dispatch(documentsSearchFilterfailure(error.response));
        throw error;
      })
  );
};

export const listDocuments = (limit, offset) => (dispatch) => {
  dispatch(documentsRequest());
  return (
    request
      .get('/api/documents')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(limit, offset)
      .then((response) => {
        dispatch(documentsLoadSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsLoadFailure(error));
      })
  );
};

export const createDocument = documentData => (dispatch) => {
  dispatch(documentsAddRequest(documentData));
  console.log('token: ', tokenUtils.getAuthToken());
  return (
    request
      .post('/api/documents')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(documentData)
      .then((response) => {
        dispatch(documentsAddSuccess(response.body));
      })
      .catch((error) => {
        console.log(error);
        dispatch(documentsAddFailure(error.response));
      })
  );
};

export const updateDocument = documentData => (dispatch) => {
  dispatch(documentsUpdateRequest(documentData));
  return (
    request
      .put(`/api/documents/${documentData.id}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(documentData)
      .then((response) => {
        dispatch(documentsUpdateSuccess(response.body));
      })
      .catch((error) => {
        console.log('error>>>', error);
        dispatch(documentsUpdateFailure(error.response));
      })
  );
};

export const deleteDocument = documentId => (dispatch) => {
  dispatch(documentsDeleteRequest());
  return (
    request
      .delete(`/api/documents/${documentId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsDeleteFailure(error.response));
      })
  );
};

export const getDocument = documentId => (dispatch) => {
  dispatch(documentsGetRequest());
  return (
    request
      .get(`/api/documents/${documentId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsGetFailure(error.response));
      })
  );
};




