'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Consultants', [
      { id: 2 },
      { id: 3 },
      { id: 7 },
      { id: 14 },
      { id: 20 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Consultants', null, {});
  }
};