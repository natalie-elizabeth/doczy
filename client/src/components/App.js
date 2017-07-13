import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import HeaderApp from './common/App';
import Home from './Home/home';
import About from './About/about';
import Login from './User/loginPage';
import SignUp from './User/signUpPage';
import DocumentViewContainer from './Documents/documentContainer';
import Roles from './roles/createRole';
import dashboard from './common/adminDashboard';
import NotFoundComponent from './common/notFound';
import SettingsPage from '../components/common/settingsPage';
import UserList from '../components/User/userList';
import Settings from '../components/common/settings';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderApp />
          <br />
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/documents' component={DocumentViewContainer} />
            <Route path='/roles' component={Roles} />
            <Route path='/dashboard' component={dashboard} />
            <Route component={NotFoundComponent} path="/not-found" />
            {/* <Route path='/settings' component={Settings} /> */}
            <Route path='/users' component={UserList} />
          </div>
        </div>
      </Router>
    );
  }
}
