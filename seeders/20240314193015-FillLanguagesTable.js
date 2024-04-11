'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Languages', [
      {
        id: 1,
        language_from: 'Spanish',
        language_to: 'English',
      },
      {
        id: 2,
        language_from: 'Spanish',
        language_to: 'Chinese',
      },
      {
        id: 3,
        language_from: 'Spanish',
        language_to: 'Italian',
      },
      {
        id: 4,
        language_from: 'English',
        language_to: 'Spanish',
      },
      {
        id: 5,
        language_from: 'English',
        language_to: 'German',
      },
      {
        id: 6,
        language_from: 'Japanese',
        language_to: 'English',
      },
      {
        id: 7,
        language_from: 'Spanish',
        language_to: 'German',
      },
      {
        id: 8,
        language_from: 'Italian',
        language_to: 'English',
      },
      {
        id: 9,
        language_from: 'Italian',
        language_to: 'Spanish',
      },
      {
        id: 10,
        language_from: 'English',
        language_to: 'Chinese',
      },
      {
        id: 11,
        language_from: 'English',
        language_to: 'Japanese',
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Languages', null, {});
  }
};
