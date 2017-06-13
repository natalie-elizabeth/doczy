const Router = require('express').Router();
const Document = require('./documents.controller');

Router.route('/documents')
  .post(Document.create)
  .get(Document.listall);

Router.route('/documents/:id')
  .get(Document.retrieve);
//   .put(Role.update)
//   .delete(Role.delete);

module.exports = Router;
