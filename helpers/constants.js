// helpers/constants.js

const models = require('../models'); // Importa los modelos de la base de datos


const RolesEnum = {
    CONSULTANT: 'consultant',
    COORDINATOR: 'coordinator',
    OPERATOR: 'operator',
    TECHNICIAN: 'technician',
    CLIENT: 'client',
    INTERPRETER: 'interpreter'
};


// Middleware para determinar el rol del usuario
exports.checkUserRole = async function(req, res, next) {
    try {
        // Obtener el ID de usuario del objeto req
        const id = req.id; // Asegúrate de tener este valor disponible en tu aplicación

        // Consultar cada tabla de roles para ver si el usuario pertenece a ese rol
        const roles = ['consultant', 'coordinator', 'operator', 'technician', 'client', 'interpreter'];
        const userRoles = {};

        for (const role of roles) {
            const roleInstance = await models[role].findOne({ where: { id: id } });
            if (roleInstance) {
                userRoles[role] = true;
            } else {
                userRoles[role] = false;
            }
        }

        // Adjuntar los roles al objeto req para que estén disponibles en otras rutas
        req.userRoles = userRoles;
        next();
    } catch (error) {
        // Manejar el error
        next(error);
    }
};




module.exports = {
    ROLES: RolesEnum
};