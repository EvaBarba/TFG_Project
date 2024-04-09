'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Technicians', [
      { id: 1 },
      { id: 8 },
      { id: 11 },
      { id: 25 },
      { id: 26 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Technicians', null, {});
  }
};
