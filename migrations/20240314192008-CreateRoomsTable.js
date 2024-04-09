// migrations/20240314192008-CreateRoomsTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.DATE,
      },
      language: {
        type: Sequelize.STRING,
      },
      licode_room: {
        type: Sequelize.STRING,
      },
      time_start: {
        type: Sequelize.TIME,
      },
      time_finish: {
        type: Sequelize.TIME,
      },
      place: {
        type: Sequelize.STRING,
      },
      ai_enabled: {
        type: Sequelize.BOOLEAN,
      },
      on_air: {
        type: Sequelize.STRING,
      },
      educational: {
        type: Sequelize.BOOLEAN,
      },
      zoom_url: {
        type: Sequelize.STRING,
      },
      technician_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Technicians',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      operator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Operators',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      coordinator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Coordinators',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      consultant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Consultants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      assigned_vrc: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};
