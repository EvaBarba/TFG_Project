'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Operators', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Operators', [
      {
        id: 9
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Operators', null, {});
  }
};

