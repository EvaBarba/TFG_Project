'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      {
        id: 1,
        details: "Excelent",
        from_id: 20,
        to_id: 18,
        from_type: 'Consultant',
        to_type: 'Coordinator',
        value: 4,
        room_id: 1
      },
      {
        id: 2,
        details: "Very good",
        from_id: 20,
        to_id: 4,
        from_type: 'Consultant',
        to_type: 'Operator',
        value: 3,
        room_id: 1
      },
      {
        id: 3,
        details: "It could be better",
        from_id: 20,
        to_id: 11,
        from_type: 'Consultant',
        to_type: 'Technician',
        value: 2,
        room_id: 1
      },
      {
        id: 4,
        details: "",
        from_id: 20,
        to_id: 15,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 5,
        room_id: 1
      },
      {
        id: 5,
        details: "Very good work",
        from_id: 20,
        to_id: 30,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 4,
        room_id: 1
      },
      {
        id: 6,
        details: "",
        from_id: 20,
        to_id: 24,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 3,
        room_id: 1
      },
      {
        id: 7,
        details: "",
        from_id: 2,
        to_id: 9,
        from_type: 'Consultant',
        to_type: 'Coordinator',
        value: 5,
        room_id: 6
      },
      {
        id: 8,
        details: "",
        from_id: 2,
        to_id: 12,
        from_type: 'Consultant',
        to_type: 'Operator',
        value: 5,
        room_id: 6
      },
      {
        id: 9,
        details: "Good",
        from_id: 2,
        to_id: 25,
        from_type: 'Consultant',
        to_type: 'Technician',
        value: 4,
        room_id: 6
      },
      {
        id: 10,
        details: "It could be better",
        from_id: 2,
        to_id: 24,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 3,
        room_id: 6
      },
      {
        id: 11,
        details: "",
        from_id: 2,
        to_id: 32,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 3,
        room_id: 6
      },
      {
        id: 12,
        details: "Excelent",
        from_id: 2,
        to_id: 30,
        from_type: 'Consultant',
        to_type: 'Interpreter',
        value: 4,
        room_id: 6
      },
      
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
