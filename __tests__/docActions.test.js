import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/documentsAction';
import * as c from '../../client/src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middlewares);


