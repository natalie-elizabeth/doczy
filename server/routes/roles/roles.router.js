const Router = require('express').Router();
const Role = require('./roles.controller');

Router.route('/roles')
  .post(Role.create)
  .get(Role.list);

Router.route('/roles/:id')
  .get(Role.retrieve)
  .put(Role.update)
  .delete(Role.delete);

module.exports = Router;
