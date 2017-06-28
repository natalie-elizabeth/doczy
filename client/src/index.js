import 'babel-polyfill';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import storeConfig from './store/index';

const store = storeConfig();
render((
  <Provider store={store}>
    <MuiThemeProvider >
      <App />
    </MuiThemeProvider>
  </Provider>
), document.getElementById('app')
);

