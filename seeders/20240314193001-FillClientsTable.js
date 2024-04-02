'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Clients', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Clients', [
      {
        id: 1
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};