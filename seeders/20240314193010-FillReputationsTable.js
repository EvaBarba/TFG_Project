'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add new registers
    await queryInterface.bulkInsert('Reputations', [
      {
        id: 1,
        interpreter_id: 4,
        value: 5
      },
      {
        id: 2,
        interpreter_id: 5,
        value: 1
      },
      {
        id: 3,
        interpreter_id: 6,
        value: 2
      },
      {
        id: 4,
        interpreter_id: 7,
        value: 4
      },
      {
        id: 5,
        interpreter_id: 8,
        value: 3
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reputations', null, {});
  }
};
