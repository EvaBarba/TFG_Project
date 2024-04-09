'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [
      {
        id: 1,
        superadmin: true,
        educational: false
      },
      {
        id: 2,
        superadmin: false,
        educational: true
      },
      {
        id: 3,
        superadmin: true,
        educational: false
      },
      {
        id: 4,
        superadmin: true,
        educational: false
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};