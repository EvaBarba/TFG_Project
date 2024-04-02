// migrations/20240314192009-CreateReputationsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Reputations',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        interpreter_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Interpreters',
            key: 'id',
            onUpdate: 'CASCADE', // Opciones de actualización y eliminación si es necesario
            onDelete: 'CASCADE',
          },
        },
        value: {
          type: Sequelize.DOUBLE,
        },
      },
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reputations');
  }
};