import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './Home/home';
import About from './About/about';
import Login from './User/loginPage';
import SignUp from './User/signUpPage';
import DocumentContainer from './Documents/documentContainer';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/documents' component={DocumentContainer} />

        </div>
      </Router>
    );
  }
}
