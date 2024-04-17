'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Timeslots', [
      {
        id: 1,
        interpreter_id: 30,
        day_of_week: 'Monday',
        start_time: '7:00:00',
        end_time: '14:00:00',
      },
      {
        id: 2,
        interpreter_id: 30,
        day_of_week: 'Tuesday',
        start_time: '8:00:00',
        end_time: '16:00:00',
      },
      {
        id: 3,
        interpreter_id: 30,
        day_of_week: 'Wednesday',
        start_time: '8:00:00',
        end_time: '16:00:00',
      },
      {
        id: 4,
        interpreter_id: 30,
        day_of_week: 'Thursday',
        start_time: '8:00:00',
        end_time: '20:00:00',
      },
      {
        id: 5,
        interpreter_id: 30,
        day_of_week: 'Friday',
        start_time: '8:00:00',
        end_time: '14:00:00',
      },
      {
        id: 6,
        interpreter_id: 32,
        day_of_week: 'Monday',
        start_time: '6:00:00',
        end_time: '20:00:00',
      },
      {
        id: 7,
        interpreter_id: 32,
        day_of_week: 'Saturday',
        start_time: '6:00:00',
        end_time: '20:00:00',
      },
      {
        id: 8,
        interpreter_id: 32,
        day_of_week: 'Sunday',
        start_time: '6:00:00',
        end_time: '20:00:00',
      },
      {
        id: 9,
        interpreter_id: 24,
        day_of_week: 'Monday',
        start_time: '7:00:00',
        end_time: '14:00:00',
      },
      {
        id: 10,
        interpreter_id: 24,
        day_of_week: 'Tuesday',
        start_time: '8:00:00',
        end_time: '18:00:00',
      },
      {
        id: 11,
        interpreter_id: 24,
        day_of_week: 'Wednesday',
        start_time: '8:00:00',
        end_time: '18:00:00',
      },
      {
        id: 12,
        interpreter_id: 24,
        day_of_week: 'Thursday',
        start_time: '8:00:00',
        end_time: '18:00:00',
      },

    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Timeslots', null, {});
  }
};
