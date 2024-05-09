// migrations/20240314192011-CreateBoothsTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booths', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      language: {
        type: Sequelize.STRING
      },
      language_to_translate: {
        type: Sequelize.STRING
      },
      signs: {
        type: Sequelize.BOOLEAN
      },
      deaf: {
        type: Sequelize.BOOLEAN
      },
      single: {
        type: Sequelize.BOOLEAN
      },
      speech_to_text: {
        type: Sequelize.BOOLEAN
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booths');
  }
};
