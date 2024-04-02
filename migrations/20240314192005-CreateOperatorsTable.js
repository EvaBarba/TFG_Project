// migrations/20240314192005-CreateOperatorsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Operators',
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
    await queryInterface.dropTable('Operators');
  }
};