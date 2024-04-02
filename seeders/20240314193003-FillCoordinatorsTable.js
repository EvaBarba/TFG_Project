'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Coordinators', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Coordinators', [
      {
        id: 3
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coordinators', null, {});
  }
};
