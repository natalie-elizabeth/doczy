'use strict';
module.exports = function (sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access: DataTypes.ENUM('private', 'public')
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
