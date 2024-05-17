// migrations/20240314192010-CreateUsersTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
      },
      password_update: {
        type: Sequelize.DATE
      },
      verify_key_email: {
        type: Sequelize.STRING
      },
      verify_key_expire: {
        type: Sequelize.DATE
      },
      enabled: {
        type: Sequelize.BOOLEAN,
      },
      extra: {
        type: Sequelize.STRING,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
