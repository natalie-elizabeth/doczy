const Router = require('express').Router();
const User = require('./users.controller');

Router.route('/users')
  .post(User.create);
//   .get(Role.list);

// Router.route('/roles/:id')
//   .get(Role.find)
//   .put(Role.update)
//   .delete(Role.delete);

module.exports = Router;