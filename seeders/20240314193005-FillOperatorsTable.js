'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Operators', [
      { id: 4 },
      { id: 6 },
      { id: 12 },
      { id: 21 },
      { id: 23 },
      { id: 28 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Operators', null, {});
  }
};

