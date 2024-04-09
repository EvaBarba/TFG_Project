'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'Antonio Ezequiel',
        email: 'antonioezequiel@example.com',
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
        username: 'Andrés Guerra',
        email: 'andresguerra@example.com',
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
        username: 'Beatriz Villarejo',
        email: 'beatrizvillarejo@example.com',
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
        username: 'Belén López',
        email: 'belenlopez@example.com',
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
        username: 'Concepción de la Fuente',
        email: 'concepciondelafuente@example.com',
        password: 'contraseña5',
        salt: 'sal5',
        password_update: new Date(),
        verify_key_email: 'clave5',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 6,
        username: 'Emilio Delgado',
        email: 'emiliodelgado@example.com',
        password: 'contraseña6',
        salt: 'sal6',
        password_update: new Date(),
        verify_key_email: 'clave6',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 7,
        username: 'Fernando Navarro',
        email: 'fernandonavarro@example.com',
        password: 'contraseña7',
        salt: 'sal7',
        password_update: new Date(),
        verify_key_email: 'clave7',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 8,
        username: 'Isabel Ruiz',
        email: 'isabelgarcia@example.com',
        password: 'contraseña8',
        salt: 'sal8',
        password_update: new Date(),
        verify_key_email: 'clave8',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 9,
        username: 'Juan Cuesta',
        email: 'juancuesta@example.com',
        password: 'contraseña9',
        salt: 'sal9',
        password_update: new Date(),
        verify_key_email: 'clave9',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 10,
        username: 'José Miguel Cuesta',
        email: 'josemiguelcuesta@example.com',
        password: 'contraseña10',
        salt: 'sal10',
        password_update: new Date(),
        verify_key_email: 'clave10',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 11,
        username: 'María Jesús Vázquez',
        email: 'mariajesusvazquez@example.com',
        password: 'contraseña11',
        salt: 'sal11',
        password_update: new Date(),
        verify_key_email: 'clave11',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 12,
        username: 'Mariano Delgado',
        email: 'marianodelgado@example.com',
        password: 'contraseña12',
        salt: 'sal12',
        password_update: new Date(),
        verify_key_email: 'clave12',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 13,
        username: 'María Luisa Benito',
        email: 'marialuisabenito@example.com',
        password: 'contraseña13',
        salt: 'sal13',
        password_update: new Date(),
        verify_key_email: 'clave13',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 14,
        username: 'Mauricio Hidalgo',
        email: 'mauriciohidalgo@example.com',
        password: 'contraseña14',
        salt: 'sal14',
        password_update: new Date(),
        verify_key_email: 'clave14',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 15,
        username: 'Natalia Cuesta',
        email: 'nataliacuesta@example.com',
        password: 'contraseña15',
        salt: 'sal15',
        password_update: new Date(),
        verify_key_email: 'clave15',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 16,
        username: 'Pablo Guerra',
        email: 'pabloguerra@example.com',
        password: 'contraseña16',
        salt: 'sal16',
        password_update: new Date(),
        verify_key_email: 'clave16',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 17,
        username: 'Rafael Álvarez',
        email: 'rafaelalvarez@example.com',
        password: 'contraseña17',
        salt: 'sal17',
        password_update: new Date(),
        verify_key_email: 'clave17',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 18,
        username: 'Vicenta Benito',
        email: 'vicentabenito@example.com',
        password: 'contraseña18',
        salt: 'sal18',
        password_update: new Date(),
        verify_key_email: 'clave18',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 19,
        username: 'Álex Guerra',
        email: 'alexguerra@example.com',
        password: 'contraseña19',
        salt: 'sal19',
        password_update: new Date(),
        verify_key_email: 'clave19',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 20,
        username: 'Alicia Sanz',
        email: 'aliciasanz@example.com',
        password: 'contraseña20',
        salt: 'sal20',
        password_update: new Date(),
        verify_key_email: 'clave20',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 21,
        username: 'Armando Cortés',
        email: 'armandocortes@example.com',
        password: 'contraseña21',
        salt: 'sal21',
        password_update: new Date(),
        verify_key_email: 'clave21',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 22,
        username: 'Carlos de Haro',
        email: 'carlosdeharo@example.com',
        password: 'contraseña22',
        salt: 'sal22',
        password_update: new Date(),
        verify_key_email: 'clave22',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 23,
        username: 'Carmen Villanueva',
        email: 'carmenvillanueva@example.com',
        password: 'contraseña23',
        salt: 'sal23',
        password_update: new Date(),
        verify_key_email: 'clave23',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 24,
        username: 'Diego Álvarez',
        email: 'diegoalvarez@example.com',
        password: 'contraseña24',
        salt: 'sal24',
        password_update: new Date(),
        verify_key_email: 'clave24',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 25,
        username: 'Lucía Álvarez',
        email: 'luciaalvarez@example.com',
        password: 'contraseña25',
        salt: 'sal25',
        password_update: new Date(),
        verify_key_email: 'clave25',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 26,
        username: 'Nieves Cuesta',
        email: 'nievescuesta@example.com',
        password: 'contraseña26',
        salt: 'sal26',
        password_update: new Date(),
        verify_key_email: 'clave26',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 27,
        username: 'Paloma Hurtado',
        email: 'palomahurtado@example.com',
        password: 'contraseña27',
        salt: 'sal27',
        password_update: new Date(),
        verify_key_email: 'clave27',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 28,
        username: 'Roberto Alonso',
        email: 'robertoalonso@example.com',
        password: 'contraseña28',
        salt: 'sal28',
        password_update: new Date(),
        verify_key_email: 'clave28',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 29,
        username: 'José Antonio Bellesteros',
        email: 'joseantoniobellesteros@example.com',
        password: 'contraseña29',
        salt: 'sal29',
        password_update: new Date(),
        verify_key_email: 'clave29',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 30,
        username: 'Amador Carrión',
        email: 'amadorcarrion@example.com',
        password: 'contraseña30',
        salt: 'sal30',
        password_update: new Date(),
        verify_key_email: 'clave30',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 31,
        username: 'Bartolomé Méndez',
        email: 'bartolomemendez@example.com',
        password: 'contraseña31',
        salt: 'sal31',
        password_update: new Date(),
        verify_key_email: 'clave31',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 32,
        username: 'Carmen de la Torre',
        email: 'carmendelatorre@example.com',
        password: 'contraseña32',
        salt: 'sal32',
        password_update: new Date(),
        verify_key_email: 'clave32',
        verify_key_expire: new Date(),
        enabled: true
      },
      {
        id: 33,
        username: 'Pedro Peñafiel',
        email: 'pedropeñafiel@example.com',
        password: 'contraseña33',
        salt: 'sal33',
        password_update: new Date(),
        verify_key_email: 'clave33',
        verify_key_expire: new Date(),
        enabled: true
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};