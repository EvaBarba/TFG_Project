'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Timeslots', [
      {
        id: 1,
        interpreter_id: 30,
        dayOfWeek: 'Monday',
        startTime: '7:00:00',
        endTime: '14:00:00',
      },
      {
        id: 2,
        interpreter_id: 30,
        dayOfWeek: 'Tuesday',
        startTime: '8:00:00',
        endTime: '16:00:00',
      },
      {
        id: 3,
        interpreter_id: 30,
        dayOfWeek: 'Wednesday',
        startTime: '8:00:00',
        endTime: '16:00:00',
      },
      {
        id: 4,
        interpreter_id: 30,
        dayOfWeek: 'Thursday',
        startTime: '8:00:00',
        endTime: '20:00:00',
      },
      {
        id: 5,
        interpreter_id: 30,
        dayOfWeek: 'Friday',
        startTime: '8:00:00',
        endTime: '14:00:00',
      },
      {
        id: 6,
        interpreter_id: 32,
        dayOfWeek: 'Monday',
        startTime: '6:00:00',
        endTime: '20:00:00',
      },
      {
        id: 7,
        interpreter_id: 32,
        dayOfWeek: 'Saturday',
        startTime: '6:00:00',
        endTime: '20:00:00',
      },
      {
        id: 8,
        interpreter_id: 32,
        dayOfWeek: 'Sunday',
        startTime: '6:00:00',
        endTime: '20:00:00',
      },
      {
        id: 9,
        interpreter_id: 24,
        dayOfWeek: 'Monday',
        startTime: '7:00:00',
        endTime: '14:00:00',
      },
      {
        id: 10,
        interpreter_id: 24,
        dayOfWeek: 'Tuesday',
        startTime: '8:00:00',
        endTime: '18:00:00',
      },
      {
        id: 11,
        interpreter_id: 24,
        dayOfWeek: 'Wednesday',
        startTime: '8:00:00',
        endTime: '18:00:00',
      },
      {
        id: 12,
        interpreter_id: 24,
        dayOfWeek: 'Thursday',
        startTime: '8:00:00',
        endTime: '18:00:00',
      },

    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Timeslots', null, {});
  }
};
