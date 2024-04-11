// migrations/20240314192015-CreateLanguagesTable.js

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Languages', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            language_from: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            language_to: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        // Eliminar restricción de unicidad si existe
        await queryInterface.sequelize.query('ALTER TABLE Languages DROP INDEX IF EXISTS unique_language_combination;');

        // Agregar restricción de unicidad
        await queryInterface.addConstraint('Languages', {
            fields: ['language_from', 'language_to'],
            type: 'unique',
            name: 'unique_language_combination'
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Eliminar restricción de unicidad
        await queryInterface.removeConstraint('Languages', 'unique_language_combination');

        await queryInterface.dropTable('Languages');
    }
};

