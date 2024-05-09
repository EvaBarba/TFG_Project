'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Booths', [
      {
        id: 1,
        language: 'Spanish',
        language_to_translate: 'English',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 1
      },
      {
        id: 2,
        language: 'Spanish',
        language_to_translate: 'Chinese',
        signs: false,
        deaf: false,
        single: false,
        speech_to_text: true,
        room_id: 1
      },
      {
        id: 3,
        language: 'Spanish',
        language_to_translate: 'Italian',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 1
      },
      {
        id: 4,
        language: 'English',
        language_to_translate: 'Spanish',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 2
      },
      {
        id: 5,
        language: 'English',
        language_to_translate: 'German',
        signs: false,
        deaf: false,
        single: false,
        speech_to_text: true,
        room_id: 2
      },
      {
        id: 6,
        language: 'Japanese',
        language_to_translate: 'English',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 3
      },
      {
        id: 7,
        language: 'Spanish',
        language_to_translate: 'English',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 4
      },
      {
        id: 8,
        language: 'Spanish',
        language_to_translate: 'German',
        signs: false,
        deaf: false,
        single: false,
        speech_to_text: true,
        room_id: 4
      },
      {
        id: 9,
        language: 'Italian',
        language_to_translate: 'English',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 5
      },
      {
        id: 10,
        language: 'Italian',
        language_to_translate: 'Spanish',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 5
      },
      {
        id: 11,
        language: 'English',
        language_to_translate: 'Spanish',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 6
      },
      {
        id: 12,
        language: 'English',
        language_to_translate: 'German',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 6
      },
      {
        id: 13,
        language: 'English',
        language_to_translate: 'Chinese',
        signs: false,
        deaf: false,
        single: false,
        speech_to_text: true,
        room_id: 6
      },
      {
        id: 14,
        language: 'English',
        language_to_translate: 'Japanese',
        signs: true,
        deaf: true,
        single: true,
        speech_to_text: false,
        room_id: 6
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};
