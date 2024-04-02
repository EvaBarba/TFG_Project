'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Technicians', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Technicians', [
      {
        id: 10
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Technicians', null, {});
  }
};
