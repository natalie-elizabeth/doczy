import {
  DOCUMENT_GET_SUCCESS, DOCUMENT_SUCCESS, DOCUMENT_FAILURE, DOCUMENT_DELETE_SUCCESS, SET_DOCUMENTS_SEARCH_FILTER_SUCCESS,
  DOCUMENT_UPDATE_REQUEST, DOCUMENT_UPDATE_SUCCESS, DOCUMENT_UPDATE_FAILURE, DOCUMENT_ADD_REQUEST, DOCUMENT_ADD_SUCCESS,
  DOCUMENT_GET_FAILURE, DOCUMENT_ADD_FAILURE, DOCUMENT_GET_REQUEST, SET_DOCUMENTS_SEARCH_FILTER_FAILURE, SET_DOCUMENTS_SEARCH_FILTER_REQUEST
} from '../actions/actionTypes';

const DOC_LIST = {
  documents: [],
  error: null,
  loading: false,
  searchFilter: ''
};

export default function reducer(state = DOC_LIST, action) {
  switch (action.type) {
    case DOCUMENT_GET_SUCCESS:
      return Object.assign({}, state, {
        documents: [...state.documents, action.documents],
        error: null,
        loading: false,
      });
    case DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        documents: action.documents,
        error: null,
        loading: false,
      });
    case DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case DOCUMENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });

    case SET_DOCUMENTS_SEARCH_FILTER_SUCCESS:
      return Object.assign({}, state, {
        documents: action.searchFilter,
      });


    case DOCUMENT_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case DOCUMENT_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => doc.id === action.document.id ? action.document : doc),
        error: null,
        loading: true,
      });

    case DOCUMENT_UPDATE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case DOCUMENT_ADD_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case DOCUMENT_ADD_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.documents,
        ...state.documents],
        loading: false,
      });

    case SET_DOCUMENTS_SEARCH_FILTER_FAILURE:
    case DOCUMENT_GET_FAILURE:
    case DOCUMENT_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case SET_DOCUMENTS_SEARCH_FILTER_REQUEST:
    case DOCUMENT_GET_REQUEST:
      return {
        documents: null,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
}
