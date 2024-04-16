'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reputations', [
      {
        id: 1,
        interpreter_id: 10,
        value: 5
      },
      {
        id: 2,
        interpreter_id: 15,
        value: 5
      },
      {
        id: 3,
        interpreter_id: 16,
        value: 2
      },
      {
        id: 4,
        interpreter_id: 19,
        value: 1
      },
      {
        id: 5,
        interpreter_id: 24,
        value: 4
      },
      {
        id: 6,
        interpreter_id: 29,
        value: 3
      },
      {
        id: 7,
        interpreter_id: 30,
        value: 4
      },
      {
        id: 8,
        interpreter_id: 31,
        value: 4
      },
      {
        id: 9,
        interpreter_id: 32,
        value: 5
      },
      {
        id: 10,
        interpreter_id: 33,
        value: 5
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reputations', null, {});
  }
};
