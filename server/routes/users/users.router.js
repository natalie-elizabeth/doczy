const Router = require('express').Router();
const User = require('./users.controller');

Router.route('/users')
  .post(User.create)
  .get(User.listall);

Router.route('/users/login')
  .post(User.login);

Router.route('/users/:id')
  .get(User.retrieve)
  .delete(User.delete);
//   .put(Role.update)

module.exports = Router;
