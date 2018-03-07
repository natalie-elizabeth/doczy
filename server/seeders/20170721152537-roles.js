'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    const roles = [
      {
        role_name: 'larry',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'king',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    return queryInterface.bulkInsert('roles', roles, {});

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('roles', null, {});

  }
};
