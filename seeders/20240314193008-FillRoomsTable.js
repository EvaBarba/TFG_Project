'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rooms', [
      {
        id: 1,
        name: 'Technology Conference',
        description: 'It will seek to share knowledge on the latest trends, advances and applications of technology in various fields. Taught by experts in the area, who will present information in a didactic and attractive way for a general or specialized audience.',
        date: new Date('2024-11-18'),
        language: 'Spanish',
        licode_room: 'room1',
        time_start: '09:00:00',
        time_finish: '10:00:00',
        place: 'Madrid',
        ai_enabled: true,
        on_air: 'Yes',
        educational: true,
        zoom_url: 'https://zoom.us/room1',
        technicial_id: 10,
        operator_id: 9,
        coordinator_id: 3,
        consultant_id: 2,
        assigned_vrc: 'VRC1'
      },
      {
        id: 2,
        name: 'Cybersecurity Conference',
        description: 'The main objective is to raise awareness of the risks and threats in the digital world, as well as to provide tools and strategies to protect oneself. It will be given by experts in computer security, who will share their knowledge and experience with a specialized audience.',
        date: new Date('2024-08-22'),
        language: 'English',
        licode_room: 'room2',
        time_start: '17:00:00',
        time_finish: '19:00:00',
        place: 'Chicago',
        ai_enabled: false,
        on_air: 'No',
        educational: false,
        zoom_url: 'https://zoom.us/room2',
        technicial_id: 10,
        assigned_vrc: 'VRC2'
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
