import * as c from '../actions/actionTypes';

const DOC_LIST = {
  documents: [],
  error: null,
  loading: false,
  searchFilter: ''
};

export default function reducer(state = DOC_LIST, action) {
  switch (action.type) {
    case c.DOCUMENT_GET_SUCCESS:
      return Object.assign({}, state, {
        documents: [...state.documents, action.documents],
        error: null,
        loading: false,
      });
    case c.DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        documents: action.documents,
        error: null,
        loading: false,
      });
    case c.DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case c.DOCUMENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });

    case c.SET_DOCUMENTS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: action.searchFilter,
      });
    case c.DOCUMENT_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.DOCUMENT_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => doc.id === action.document.id ? action.document : doc),
        error: null,
        loading: true,
      });

    case c.DOCUMENT_UPDATE_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case c.DOCUMENT_ADD_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case c.DOCUMENT_ADD_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.documents,
        ...state.documents],
        loading: false,
      });

    case c.DOCUMENT_GET_FAILURE:
    case c.DOCUMENT_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case c.DOCUMENT_GET_REQUEST:
      return {
        documents: null,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
}
