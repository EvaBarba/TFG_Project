'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Languageknowns', [
      {
        interpreter_id: 15,
        language_id: 1
      },
      {
        interpreter_id: 16,
        language_id: 1
      },
      {
        interpreter_id: 24,
        language_id: 1
      },
      {
        interpreter_id: 29,
        language_id: 1
      },
      {
        interpreter_id: 30,
        language_id: 1
      },
      {
        interpreter_id: 31,
        language_id: 1
      },
      {
        interpreter_id: 32,
        language_id: 1
      },

      {
        interpreter_id: 30,
        language_id: 2
      },
      {
        interpreter_id: 32,
        language_id: 2
      },

      {
        interpreter_id: 19,
        language_id: 3
      },
      {
        interpreter_id: 31,
        language_id: 3
      },

      {
        interpreter_id: 15,
        language_id: 4
      },
      {
        interpreter_id: 24,
        language_id: 4
      },
      {
        interpreter_id: 29,
        language_id: 4
      },
      {
        interpreter_id: 32,
        language_id: 4
      },

      {
        interpreter_id: 10,
        language_id: 5
      },
      {
        interpreter_id: 29,
        language_id: 5
      },

      {
        interpreter_id: 10,
        language_id: 6
      },
      {
        interpreter_id: 24,
        language_id: 6
      },
      {
        interpreter_id: 33,
        language_id: 6
      },

      {
        interpreter_id: 16,
        language_id: 7
      },
      {
        interpreter_id: 29,
        language_id: 7
      },

      {
        interpreter_id: 19,
        language_id: 8
      },
      {
        interpreter_id: 31,
        language_id: 8
      },

      {
        interpreter_id: 19,
        language_id: 9
      },
      {
        interpreter_id: 31,
        language_id: 9
      },
      
      {
        interpreter_id: 30,
        language_id: 10
      },
      {
        interpreter_id: 33,
        language_id: 10
      },

      {
        interpreter_id: 10,
        language_id: 11
      },
      {
        interpreter_id: 33,
        language_id: 11
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Languageknowns', null, {});
  }
};

