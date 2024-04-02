// migrations/20240314192010-CreateUsersTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'username must not be empty.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: 'Email must not be empty.',
            },
            // unique: {
            //   args: true,
            //   msg: 'Email must be unique.',
            // },
            isEmail: {
              msg: 'Invalid email format.',
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Password must not be empty.',
            },
          },
        },
        salt: {
          type: Sequelize.STRING,
          // allowNull: false,
        },
        passwordUpdate: {
          type: Sequelize.DATE,
          field: 'password_update'
        },
        verifyKeyEmail: {
          type: Sequelize.STRING,
          field: 'verify_key_email'
        },
        verifyKeyExpire: {
          type: Sequelize.DATE,
          field: 'verify_key_expire'
        },
        enabled: {
          type: Sequelize.BOOLEAN
        },
        extra: {
          type: Sequelize.JSON
        },
        admin_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Admins',
            key: 'id', // La clave primaria de la tabla Admin
          },
          onUpdate: 'CASCADE', // Opciones de actualización y eliminación si es necesario
          onDelete: 'CASCADE',
        }
      },
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
