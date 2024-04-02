// migrations/20240314192000-CreateAdminsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Admins',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        superadmin: {
          type: Sequelize.BOOLEAN
        },
        educational: {
          type: Sequelize.BOOLEAN
        }
      },
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};
