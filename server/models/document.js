'use strict';
module.exports = function (sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access: DataTypes.ENUM('private', 'public', 'role')
  }, {
      tableName: 'documents',
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Document.belongsTo(models.User, {
            foreignKey: 'user_id',
            allowNull: false
          });
        }
      }
    });
  return Document;
};
