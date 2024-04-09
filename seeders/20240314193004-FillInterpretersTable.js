'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Interpreters', [
      { id: 10 },
      { id: 15 },
      { id: 16 },
      { id: 19 },
      { id: 24 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all registers in the Interpreters table
    await queryInterface.bulkDelete('Interpreters', null, {});
  }
};
