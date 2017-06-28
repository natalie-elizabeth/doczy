const Router = require('express').Router();
const User = require('./users.controller');
const { Auth, isAdmin } = require('../../middleware/index');

Router.route('/users')
  .post(User.create)
  .get(User.seeall);


Router.route('/users/login')
  .post(User.login);

Router.route('/users/logout')
  .post(User.logout);

Router.route('/search/users/')
  .get(User.search);

Router.route('/users/:id')
  .get(User.retrieve)
  .delete(User.delete)
  .put(User.update);

Router.route('/users/:id/documents')
  .get(User.listall);

module.exports = Router;
