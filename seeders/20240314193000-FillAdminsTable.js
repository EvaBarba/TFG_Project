'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete all references in the Users table
    await queryInterface.bulkUpdate('Users', { admin_id: null }, {});

    // Delete old registers
    await queryInterface.bulkDelete('Admins', null, {});
    
    // Add new registers
    await queryInterface.bulkInsert('Admins', [
      {
        id: 1,
        superadmin: true,
        educational: false
      },
      {
        id: 2,
        superadmin: false,
        educational: true
      },
      {
        id: 3,
        superadmin: true,
        educational: false
      },
      {
        id: 4,
        superadmin: true,
        educational: false
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};