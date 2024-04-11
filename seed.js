// seed.js

const { Sequelize } = require('sequelize');
const Umzug = require('umzug');
const path = require('path');
const sequelize = require('./config/database');

// Lista de nombres de archivos de seeders en el orden deseado
const seederFiles = [
    '20240314193000-FillAdminsTable.js',
    '20240314193009-FillUsersTable.js',
    '20240314193001-FillClientsTable.js',
    '20240314193002-FillConsultantsTable.js',
    '20240314193003-FillCoordinatorsTable.js',
    '20240314193004-FillInterpretersTable.js',
    '20240314193005-FillOperatorsTable.js',
    '20240314193005-FillOperatorsTable.js',
    '20240314193006-FillTechniciansTable.js',
    '20240314193010-FillReputationsTable.js',
    '20240314193008-FillRoomsTable.js',
    '20240314193011-FillBoothsTable.js',
    '20240314193013-FillBoothAssignmentsTable.js',
    '20240314193014-FillLikesTable.js',
    '20240314193015-FillLanguagesTable.js',
];

console.log('Start seeding...');

async function seed() {
    const umzug = new Umzug({
        migrations: {
            path: path.join(__dirname, 'seeders'),
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

    try {
        // Ejecutar las seeders en el orden especificado
        for (const seederFile of seederFiles) {
            await umzug.execute({
                migrations: [seederFile],
                method: 'up'
            });

            console.log(`Seeder ${seederFile} executed successfully.`);
        }

        console.log('All specified seeders performed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

// Llamar a la función `seed` asincrónica
seed();
