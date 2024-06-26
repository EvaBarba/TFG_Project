'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rooms', [
      {
        id: 1,
        name: 'Technology Conference',
        description: 'It will seek to share knowledge on the latest trends, advances and applications of technology in various fields. Taught by experts in the area, who will present information in a didactic and attractive way for a general or specialized audience.',
        date: new Date('2024-01-18'),
        language: 'Spanish',
        licode_room: 'room1',
        time_start: '09:00:00',
        time_finish: '12:00:00',
        place: 'Madrid',
        ai_enabled: true,
        on_air: 'Yes',
        educational: true,
        zoom_url: 'https://zoom.us/room1',
        technician_id: 11,
        operator_id: 4,
        coordinator_id: 18,
        consultant_id: 20,
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
        coordinator_id: 17,
        operator_id: 6,
        assigned_vrc: 'VRC2'
      },
      {
        id: 3,
        name: 'The XtremePython Online Conference',
        description: 'XtremePython is an online conference that focuses on the Python programming language.',
        date: new Date('2024-10-06'),
        language: 'Japanese',
        licode_room: 'room3',
        time_start: '13:00:00',
        time_finish: '17:00:00',
        place: 'Tokyo',
        ai_enabled: true,
        on_air: 'Yes',
        educational: true,
        zoom_url: 'https://zoom.us/room3',
        technician_id: 26,
        operator_id: 21,
        coordinator_id: 13,
        assigned_vrc: 'VRC3'
      },
      {
        id: 4,
        name: 'Artificial Intelligence in the Educational and the Learning Landscape',
        description: 'This course is designed to provide understanding & insight of AI to help educators become more proficient and inspire new ways of learning.',
        date: new Date('2025-01-23'),
        language: 'Spanish',
        licode_room: 'room4',
        time_start: '16:00:00',
        time_finish: '19:00:00',
        place: 'Barcelona',
        ai_enabled: false,
        on_air: 'No',
        educational: true,
        zoom_url: 'https://zoom.us/room4',
        technician_id: 1,
        coordinator_id: 22,
        consultant_id: 7,
        assigned_vrc: 'VRC4'
      },
      {
        id: 5,
        name: 'Designing for Tomorrow - GSI Perspectives and Pathways Forward',
        description: 'Part of the GSI Perspectives and Pathways Forward collection.',
        date: new Date('2024-08-27'),
        language: 'Italian',
        licode_room: 'room5',
        time_start: '12:00:00',
        time_finish: '16:00:00',
        place: 'Milan',
        ai_enabled: false,
        on_air: 'Yes',
        educational: false,
        zoom_url: 'https://zoom.us/room5',
        technician_id: 25,
        operator_id: 23,
        consultant_id: 14,
        assigned_vrc: 'VRC5'
      },
      {
        id: 6,
        name: 'Epic AI Agents Summit',
        description: 'Practical online event for engineers who work on and with AI Agents.',
        date: new Date('2024-02-05'),
        language: 'English',
        licode_room: 'room6',
        time_start: '07:00:00',
        time_finish: '11:00:00',
        place: 'Boston',
        ai_enabled: false,
        on_air: 'No',
        educational: true,
        zoom_url: 'https://zoom.us/room6',
        technician_id: 25,
        operator_id: 12,
        coordinator_id: 9,
        consultant_id: 2,
        assigned_vrc: 'VRC6'
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
