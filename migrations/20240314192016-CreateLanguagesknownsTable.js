// migrations/20240314192016-CreateLanguageknownsTable.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Languageknowns', {
      interpreter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Interpreters',
          key: 'id',
        }
      },
      language_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Languages',
          key: 'id',
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Languageknowns');
  }
};

