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
      passwordUpdate: {
        type: Sequelize.DATE,
        field: 'password_update',
      },
      verifyKeyEmail: {
        type: Sequelize.STRING,
        field: 'verify_key_email',
      },
      verifyKeyExpire: {
        type: Sequelize.DATE,
        field: 'verify_key_expire',
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
