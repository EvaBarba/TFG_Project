// undoSeeders.js

const sequelize = require('./config/database');

async function clearAllTables() {
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
        console.error('Error clearing tables:', error);
        process.exit(1);
    }
}

// Ejecutar la función para limpiar todas las tablas
clearAllTables().then(() => {
    // Cerrar la conexión de la base de datos
    sequelize.close();
}).catch(error => {
    console.error('Error clearing tables:', error);
    process.exit(1);
});
