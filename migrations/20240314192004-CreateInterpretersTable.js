// migrations/20240314192004-CreateInterpretersTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Interpreters',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          references: {
            model: User,
            key: User.id,
          },
        },
      },
      // (PENDIENTE) Languages
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Interpreters');
  }
};
