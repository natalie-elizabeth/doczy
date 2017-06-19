import 'babel-polyfill';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';

import store from './store';

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app')
);

