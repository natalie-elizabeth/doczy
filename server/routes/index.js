const RoleRouter = require('./roles/roles.router');
const UserRouter = require('./users/users.router');
const DocumentRouter = require('./documents/documents.router');


module.exports = app => {
  app.use('/api', RoleRouter);
  app.use('/api', UserRouter);
  app.use('/api', DocumentRouter);
};
