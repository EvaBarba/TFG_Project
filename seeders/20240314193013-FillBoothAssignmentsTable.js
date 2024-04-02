'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Boothassignments', [
      {
        interpreter_id: 7,
        booth_id: 1
      },
      {
        interpreter_id: 5,
        booth_id: 2
      },
      {
        interpreter_id: 8,
        booth_id: 1
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Boothassignments', null, {});
  }
};

