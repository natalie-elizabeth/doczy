const RoleRouter = require('./roles/roles.router');
const UserRouter = require('./users/users.router');
module.exports = app => {
  app.use('/api', RoleRouter);
  app.use('/api', UserRouter);
}