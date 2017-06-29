const Router = require('express').Router();
const Role = require('./roles.controller');
const { Auth, isAdmin } = require('../../middleware/index');

Router.route('/roles')
  .post([Auth, isAdmin], Role.create)
  .get([Auth, isAdmin], Role.list);

Router.route('/roles/:id')
  .get([Auth, isAdmin], Role.retrieve)
  .put([Auth, isAdmin], Role.update)
  .delete([Auth, isAdmin], Role.delete);

module.exports = Router;
