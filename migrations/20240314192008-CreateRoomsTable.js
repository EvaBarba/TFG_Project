// migrations/20240314192008-CreateRoomsTable.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Rooms',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.TEXT
        },
        date: {
          type: Sequelize.DATE
        },
        language: {
          type: Sequelize.STRING
        },
        licode_room: {
          type: Sequelize.STRING
        },
        time_start: {
          type: Sequelize.TIME
        },
        time_finish: {
          type: Sequelize.TIME
        },
        place: {
          type: Sequelize.STRING
        },
        ai_enabled: {
          type: Sequelize.BOOLEAN
        },
        on_air: {
          type: Sequelize.STRING
        },
        educational: {
          type: Sequelize.BOOLEAN
        },
        zoom_url: {
          type: Sequelize.STRING
        },

        technicial_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Technicians',
            key: 'id',
          },
        },
        operator_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Operators',
            key: 'id',
          },
        },
        coordinator_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Coordinators',
            key: 'id',
          },
        },
        consultant_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Consultants',
            key: 'id',
          },
        },

        assigned_vrc: {
          type: Sequelize.STRING,
        },
      },
      {
        sync: { force: true }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};