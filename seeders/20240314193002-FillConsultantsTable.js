'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Consultants', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Consultants', [
      {
        id: 2
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Consultants', null, {});
  }
};