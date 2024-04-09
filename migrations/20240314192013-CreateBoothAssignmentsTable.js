// migrations/20240314192013-CreateBoothAssignmentsTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Boothassignments', {
      interpreter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Interpreters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      booth_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Booths',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Boothassignments');
  }
};

