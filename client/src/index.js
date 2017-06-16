import 'babel-polyfill';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import routes from './routes';
import App from './components/App';
import Home from './components/Home/home';
import About from './components/About/about';

// import configureStore from './store/configureStore';

// const store = configureStore();

render((
  <Router>
    <div>
      <Route exact path='/' component={App}/>
      <Route path='/home' component={Home} />
      <Route path='/about' component={About} />
    </div>
  </Router>
), document.getElementById('app')
);

