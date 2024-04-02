'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Booths', [
      {
        id: 1,
        language: 'Spanish',
        language_a: 'English',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 1
      },
      {
        id: 2,
        language: 'English',
        language_a: 'Spanish',
        signs: false,
        deaf: false,
        single: false,
        speech_to_text: true,
        room_id: 2
      },
      {
        id: 3,
        language: 'English',
        language_a: 'Italian',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 2
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};
