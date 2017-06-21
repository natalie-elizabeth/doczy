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
            .get('/api/document')
            .set('x-access-token', window.localStorage.getItem('token'))
            .then((response) => {
                dispatch(documentsSuccess(response.body));
            })
            .catch((error) => {
                dispatch(documentsFailure(error));
            })
    );
};

export const documentsRetrievalSuccess = documents => ({
    type: types.DOCUMENTS_RETRIEVAL_SUCCESS,
    documents
});

export const documentsRetrievalFailure = documents => ({
    type: types.DOCUMENTS_RETRIEVAL_FAILURE,
    documents
});







export const documentsGetRequest = () => ({
    type: types.DOCUMENTS_GET_REQUEST
});

export const documentsGetSuccess = documents => ({
    type: types.DOCUMENTS_GET_SUCCESS,
    documents
});

export const documentsGetFailure = documents => ({
    type: types.DOCUMENTS_GET_FAILURE,
    documents
});

export const documentsUpdateRequest = documents => ({
    type: types.DOCUMENTS_UPDATE_REQUEST,
    documents
});

export const documentsUpdateSuccess = documents => ({
    type: types.DOCUMENTS_UPDATE_SUCCESS,
    documents
});

export const documentsUpdateFailure = documents => ({
    type: types.DOCUMENTS_UPDATE_FAILURE,
    documents
});

export const documentsDeleteRequest = () => ({
    type: types.DOCUMENTS_DELETE_REQUEST
});

export const documentsDeleteSuccess = documents => ({
    type: types.DOCUMENTS_DELETE_SUCCESS,
    documents
});

export const documentsDeleteFailure = documents => ({
    type: types.DOCUMENTS_DELETE_FAILURE,
    documents
});

export const documentsSearchFilter = searchFilter => ({
    type: types.SET_DOCUMENTS_SEARCH_FILTER,
    searchFilter
});

/* eslint no-undef: "off"*/





export const updateDocument = documentData => (dispatch) => {
    dispatch(documentsUpdateRequest(documentData));
    return (
        request
            .put(`/api/document/${documentData.id}`)
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

export const deleteDocument = documentId => (dispatch) => {
    dispatch(documentsDeleteRequest());
    return (
        request
            .delete(`/api/document/${documentId}`)
            .set('x-access-token', window.localStorage.getItem('token'))
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
            .get(`/api/document/${documentId}`)
            .set('x-access-token', window.localStorage.getItem('token'))
            .then((response) => {
                dispatch(documentsGetSuccess(response.body));
            })
            .catch((error) => {
                dispatch(documentsGetFailure(error.response));
            })
    );
};
