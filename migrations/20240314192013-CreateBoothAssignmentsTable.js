// migrations/20240314192013-CreateBoothAssignmentsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Boothassignment',
      {
        interpreter_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Interpreters',
            key: 'id',
          },
        },
        booth_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Booths',
            key: 'id',
          },
        }
      },
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Boothassignment');
  }
};
