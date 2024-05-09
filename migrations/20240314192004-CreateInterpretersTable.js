// migrations/20240314192004-CreateInterpretersTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Interpreters', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Interpreters');
  }
};
