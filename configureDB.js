// configureDB.js

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
    '20240314192014-CreateLikesTable.js',
    '20240314192015-CreateLanguagesTable.js',
    '20240314192016-CreateLanguagesknownsTable.js'
];

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
    '20240314193016-FillLanguageknownsTable.js'
];



async function clearTables() {
    try {
        // Obtener el nombre de todas las tablas del esquema de la base de datos
        const [results] = await sequelize.query("SHOW TABLES");
        const tables = results.map(result => result[Object.keys(result)[0]]);

        // Deshabilitar las restricciones de clave externa para poder eliminar las tablas en el orden adecuado
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Eliminar todos los datos de todas las tablas una por una
        for (const table of tables) {
            await sequelize.query(`DELETE FROM ${table}`);
            console.log(`Cleared data from table ${table}.`);
        }

        // Habilitar las restricciones de clave externa nuevamente después de limpiar todas las tablas
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log('All tables cleared successfully.');
    } catch (error) {
        throw new Error(`Error clearing tables: ${error}`);
    }
}

async function runMigrations() {
    try {

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

        // Ejecutar las migraciones en el orden especificado
        for (const migrationFile of migrationFiles) {
            await umzug.up({ migrations: [migrationFile] });
            console.log(`Migration ${migrationFile} executed successfully.`);
        }

        console.log('All specified migrations performed successfully.');
    } catch (error) {
        throw new Error(`Error during migration: ${error}`);
    }
}

async function runSeeders() {
    try {

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
        throw new Error(`Error during seeding: ${error}`);
    }
}

// Ejecutar la limpieza de las tablas, las migraciones y luego los seeders
async function main() {
    try {
        await clearTables();
        await runMigrations();
        await runSeeders();
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

// Llamar a la función `main` asincrónica
main();
