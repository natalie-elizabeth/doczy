import React, { Component } from 'react';
import App from './components/App';
import Home from './components/Home/home';
import About from './components/About/about';
import { Route } from 'react-router-dom';


export default (
  <div>
    <Route exact path='/' component={App} />
    <Route path='/home' component={Home} />
    <Route path='/about' component={About} />
  </div>
);
