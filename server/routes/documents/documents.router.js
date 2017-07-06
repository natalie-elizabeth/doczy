const Router = require('express').Router();
const Document = require('./documents.controller');
const { Auth, isAdmin } = require('../../middleware/index');

Router.route('/documents')
  .post(Auth, Document.create)
  .get(Auth, Document.listall);

Router.route('/documents/:id')
  .get(Auth, Document.retrieve)
  .put(Auth, Document.update)
  .delete(Auth, Document.delete);

Router.route('/search/documents/')
  .get(Auth, Document.search);

module.exports = Router;
