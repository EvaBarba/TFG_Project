'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Boothassignments', [
      {
        interpreter_id: 15,
        booth_id: 1
      },
      {
        interpreter_id: 24,
        booth_id: 1
      },
      {
        interpreter_id: 30,
        booth_id: 2
      },
      {
        interpreter_id: 19,
        booth_id: 3
      },
      {
        interpreter_id: 15,
        booth_id: 4
      },
      {
        interpreter_id: 29,
        booth_id: 4
      },
      {
        interpreter_id: 10,
        booth_id: 5
      },
      {
        interpreter_id: 16,
        booth_id: 7
      },
      {
        interpreter_id: 30,
        booth_id: 7
      },
      {
        interpreter_id: 31,
        booth_id: 9
      },
      {
        interpreter_id: 19,
        booth_id: 10
      },
      {
        interpreter_id: 24,
        booth_id: 11
      },
      {
        interpreter_id: 32,
        booth_id: 11
      },
      {
        interpreter_id: 10,
        booth_id: 12
      },
      {
        interpreter_id: 30,
        booth_id: 13
      },
      {
        interpreter_id: 33,
        booth_id: 14
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Boothassignments', null, {});
  }
};

