
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import {
  CLOSE_DOCUMENT, DOCUMENT_REQUEST, DOCUMENT_SUCCESS, DOCUMENT_FAILURE, DOCUMENT_ADD_REQUEST,
  DOCUMENT_ADD_SUCCESS, DOCUMENT_ADD_FAILURE, DOCUMENT_GET_REQUEST, DOCUMENT_GET_SUCCESS, DOCUMENT_GET_FAILURE,
  DOCUMENT_UPDATE_REQUEST, DOCUMENT_UPDATE_SUCCESS, DOCUMENT_UPDATE_FAILURE, DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS, DOCUMENT_DELETE_FAILURE, SET_DOCUMENTS_SEARCH_FILTER_SUCCESS,
  SET_DOCUMENTS_SEARCH_FILTER_REQUEST, SET_DOCUMENTS_SEARCH_FILTER_FAILURE
} from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../api/api';

export const closeDocument = () => ({
  type: CLOSE_DOCUMENT
});

export const documentsRequest = () => ({
  type: DOCUMENT_REQUEST
});

export const documentsLoadSuccess = documents => ({
  type: DOCUMENT_SUCCESS,
  documents
});

export const documentsLoadFailure = documents => ({
  type: DOCUMENT_FAILURE,
  documents
});

export const documentsAddRequest = documents => ({
  type: DOCUMENT_ADD_REQUEST,
  documents
});

export const documentsAddSuccess = documents => ({
  type: DOCUMENT_ADD_SUCCESS,
  documents
});

export const documentsAddFailure = documents => ({
  type: DOCUMENT_ADD_FAILURE,
  documents
});

export const documentsGetRequest = () => ({
  type: DOCUMENT_GET_REQUEST
});

export const documentsGetSuccess = documents => ({
  type: DOCUMENT_GET_SUCCESS,
  documents
});

export const documentsGetFailure = documents => ({
  type: DOCUMENT_GET_FAILURE,
  documents
});

export const documentsUpdateRequest = documents => ({
  type: DOCUMENT_UPDATE_REQUEST,
  documents
});

export const documentsUpdateSuccess = document => ({
  type: DOCUMENT_UPDATE_SUCCESS,
  document
});

export const documentsUpdateFailure = documents => ({
  type: DOCUMENT_UPDATE_FAILURE,
  documents
});

export const documentsDeleteRequest = () => ({
  type: DOCUMENT_DELETE_REQUEST
});

export const documentsDeleteSuccess = documents => ({
  type: DOCUMENT_DELETE_SUCCESS,
  documents
});

export const documentsDeleteFailure = documents => ({
  type: DOCUMENT_DELETE_FAILURE,
  documents
});

export const documentsSearchFilterSuccess = searchFilter => ({
  type: SET_DOCUMENTS_SEARCH_FILTER_SUCCESS,
  searchFilter
});

export const documentsSearchFilterRequest = () => ({
  type: SET_DOCUMENTS_SEARCH_FILTER_REQUEST,
});

export const documentsSearchFilterfailure = searchFilter => ({
  type: SET_DOCUMENTS_SEARCH_FILTER_FAILURE,
  searchFilter
});


export const searchDocument = title => (dispatch) => {
  dispatch(documentsSearchFilterRequest());
  return (
    request
      .get('/api/search/documents/?q=' + title)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsSearchFilterSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsSearchFilterfailure(error.response));
        throw error;
      })
  );
};

export const listDocuments = (limit, offset) => (dispatch) => {
  dispatch(documentsRequest());
  return (
    request
      .get(`/api/documents?limit=${limit}&offset=${offset}`)
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
  return (
    request
      .post('/api/documents')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(documentData)
      .then((response) => {
        dispatch(documentsAddSuccess(response.body));
      })
      .catch((error) => {
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
        location.reload();
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




