'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Delete old registers
    await queryInterface.bulkDelete('Users', null, {});

    // Add new registers
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'Belén López',
        email: 'belenlopez@example.com',
        password: 'contraseña1',
        salt: 'sal1',
        password_update: new Date(),
        verify_key_email: 'clave1',
        verify_key_expire: new Date(),
        enabled: true,
        admin_id: 1
      },
      {
        id: 2,
        username: 'Juan Cuesta',
        email: 'juancuesta@example.com',
        password: 'contraseña2',
        salt: 'sal2',
        password_update: new Date(),
        verify_key_email: 'clave2',
        verify_key_expire: new Date(),
        enabled: true,
        admin_id: 2
      },
      {
        id: 3,
        username: 'Mariano Delgado',
        email: 'marianodelgado@example.com',
        password: 'contraseña3',
        salt: 'sal3',
        password_update: new Date(),
        verify_key_email: 'clave3',
        verify_key_expire: new Date(),
        enabled: true,
        admin_id: 3
      },
      {
        id: 4,
        username: 'Fernando Navarro',
        email: 'fernandonavarro@example.com',
        password: 'contraseña4',
        salt: 'sal4',
        password_update: new Date(),
        verify_key_email: 'clave4',
        verify_key_expire: new Date(),
        enabled: true,
        admin_id: 4
      },
      {
        id: 5,
        username: 'Emilio Delgado',
        email: 'emiliodelgado@example.com',
        password: 'contraseña5',
        salt: 'sal5',
        password_update: new Date(),
        verify_key_email: 'clave5',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 6,
        username: 'Mauricio Hidalgo',
        email: 'mauriciohidalgo@example.com',
        password: 'contraseña6',
        salt: 'sal6',
        password_update: new Date(),
        verify_key_email: 'clave6',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 7,
        username: 'Lucía Álvarez',
        email: 'luciaalvarez@example.com',
        password: 'contraseña7',
        salt: 'sal7',
        password_update: new Date(),
        verify_key_email: 'clave7',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 8,
        username: 'Andrés Guerra',
        email: 'andresguerra@example.com',
        password: 'contraseña8',
        salt: 'sal8',
        password_update: new Date(),
        verify_key_email: 'clave8',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 9,
        username: 'Marisa Benito',
        email: 'marisabenito@example.com',
        password: 'contraseña9',
        salt: 'sal9',
        password_update: new Date(),
        verify_key_email: 'clave9',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 10,
        username: 'Roberto Alonso',
        email: 'robertoalonso@example.com',
        password: 'contraseña10',
        salt: 'sal10',
        password_update: new Date(),
        verify_key_email: 'clave10',
        verify_key_expire: new Date(),
        enabled: true
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};