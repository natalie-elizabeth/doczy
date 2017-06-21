import * as c from '../actions/actionTypes';

const DOCUMENT_LIST = {
  documents: [],
  error: null,
  loading: false,
  searchFilter: '',
};

export default function reducer(state = DOCUMENT_LIST, action) {
  switch (action.type) {
    case c.DOCUMENTS_RETRIEVAL:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.DOCUMENTS_RETRIEVAL_SUCCESS:
      return Object.assign({}, state, {
        documents: action.documents,
        error: null,
        loading: false,
      });
    case c.DOCUMENTS_RETRIEVAL_SUCCESS:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case c.DOCUMENTS_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });
    case c.SET_DOCUMENTS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: action.searchFilter,
      });
    case c.UPDATE_DOCUMENT:
      return {
        error: null,
        loading: true,
      };
    case c.UPDATE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case c.UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case c.CREATE_DOCUMENT:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.CREATION_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.documents,
        ...state.documents],
        loading: false,
      });
    case c.CREATION_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case c.GET_DOCUMENT:
      return {
        documents: null,
        error: null,
        loading: true,
      };
    case c.GET_SUCCESS:
      return {
        documents: action.response.result,
        error: null,
        loading: false,
      };
    case c.GET_FAILURE:
      return {
        documents: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
