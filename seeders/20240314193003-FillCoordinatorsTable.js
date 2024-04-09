'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Coordinators', [
      { id: 5 },
      { id: 9 },
      { id: 13 },
      { id: 17 },
      { id: 18 },
      { id: 22 },
      { id: 27 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coordinators', null, {});
  }
};
