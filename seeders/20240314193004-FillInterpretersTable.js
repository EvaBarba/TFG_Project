'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add new registers to the Interpreters table
    await queryInterface.bulkInsert('Interpreters', [
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all registers in the Interpreters table
    await queryInterface.bulkDelete('Interpreters', null, {});
  }
};
