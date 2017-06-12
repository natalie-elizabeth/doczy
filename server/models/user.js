'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
      underscored: true,
      tableName: 'users',
      classMethods: {
        associate: function (models) {
          User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            allowNull: false
          });

          User.hasMany(models.Document, {
            foreignKey: 'user_id',
            as: 'documents'
          });
        }
      }
    });
  return User;
};