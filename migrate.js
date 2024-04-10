// migrate-manual.js

const { Sequelize } = require('sequelize');
const Umzug = require('umzug');
const path = require('path');
const sequelize = require('./config/database');

// Lista de nombres de archivos de migración en el orden deseado
const migrationFiles = [
    '20240314192000-CreateAdminsTable.js',
    '20240314192009-CreateUsersTable.js',
    '20240314192001-CreateClientsTable',
    '20240314192002-CreateConsultantsTable.js',
    '20240314192003-CreateCoordinatorsTable.js',
    '20240314192004-CreateInterpretersTable.js',
    '20240314192005-CreateOperatorsTable.js',
    '20240314192006-CreateTechniciansTable.js',
    '20240314192010-CreateReputationsTable.js',
    '20240314192008-CreateRoomsTable.js',
    '20240314192011-CreateBoothsTable.js',
    '20240314192013-CreateBoothAssignmentsTable.js',
    '20240314192013-CreateBoothAssignmentsTable.js',
];

const umzug = new Umzug({
    migrations: {
        path: path.join(__dirname, 'migrations'),
        params: [
            sequelize.getQueryInterface(),
            Sequelize
        ],
        pattern: /\.js$/,
    },
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },
    logger: console,
});

(async () => {
    try {
        // Ejecutar las migraciones en el orden especificado
        for (const migrationFile of migrationFiles) {
            const migration = await umzug.up({ migrations: [migrationFile] });
            console.log(`Migration ${migrationFile} executed successfully.`);
        }

        console.log('All specified migrations performed successfully.');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
})();

