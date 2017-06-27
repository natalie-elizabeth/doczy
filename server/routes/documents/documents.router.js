const Router = require('express').Router();
const Document = require('./documents.controller');
const { Auth, isAdmin } = require('../../middleware/index');

Router.route('/documents')
  .post(Auth, Document.create)
  .get([Auth, isAdmin], Document.listall);

Router.route('/documents/:id')
  .get(Auth, Document.retrieve)
  .put(Document.update)
  .delete(Auth, Document.delete);

module.exports = Router;
