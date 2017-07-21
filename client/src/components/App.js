import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderApp from './common/headerApp';
import Home from './Home/home';
import Login from './User/loginPage';
import SignUp from './User/signUpPage';
import DocumentViewContainer from './Documents/documentContainer';
import Roles from './roles/createRole';
import dashboard from './common/adminDashboard';
import NotFoundComponent from './common/notFound';
import UserList from '../components/User/userList';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderApp />
          <br />
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/documents' component={DocumentViewContainer} />
            <Route path='/roles' component={Roles} />
            <Route path='/dashboard' component={dashboard} />
            <Route component={NotFoundComponent} path="/not-found" />
            <Route path='/users' component={UserList} />
          </div>
        </div>
      </Router>
    );
  }
}
