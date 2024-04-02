// migrations/20240314192001-CreateClientsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Clients',
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
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};
