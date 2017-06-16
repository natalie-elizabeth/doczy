'use strict';
const { genSaltSync, hashSync } = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, min: 8, max: 16, },
      set(password) {
        const hashPassword = hashSync(password, genSaltSync(10));
        return this.setDataValue('password', hashPassword);
      }
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
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
