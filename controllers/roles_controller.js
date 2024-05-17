// controllers/roles_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
const { Op } = require('sequelize');

// GET /consultants
exports.getConsultants = function (req, res, next) {

    models.Consultant.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.User, as: 'User' },
                ],
                order: ['id']
            }

            return models.Consultant.findAll(findOptions);
        })
        .then(function (consultants) {
            res.render('users/consultants', { consultants });
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /coordinators
exports.getCoordinators = function (req, res, next) {

    models.Coordinator.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.User, as: 'User' },
                ],
                order: ['id']
            }
            
            return models.Coordinator.findAll(findOptions);
        })
        .then(function (coordinators) {
            res.render('users/coordinators', { coordinators });
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /interpreters
exports.getInterpreters = function (req, res, next) {

    models.Interpreter.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.User, as: 'User' },
                    { model: models.Reputation, as: 'reputation' },
                ],
                order: ['id']
            }
            
            return models.Interpreter.findAll(findOptions);
        })
        .then(function (interpreters) {
            res.render('users/interpreters', { interpreters });
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /operators
exports.getOperators = function (req, res, next) {

    models.Operator.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.User, as: 'User' },
                ],
                order: ['id']
            }
            
            return models.Operator.findAll(findOptions);
        })
        .then(function (operators) {
            res.render('users/operators', { operators });
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /technicians
exports.getTechnicians = function (req, res, next) {

    models.Technician.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.User, as: 'User' },
                ],
                order: ['id']
            }
            
            return models.Technician.findAll(findOptions);
        })
        .then(function (technicians) {
            res.render('users/technicians', { technicians });
        })
        .catch(function (error) {
            next(error);
        });
};


// PERFILES --------------------------------------------------------------------------------------------------------------

// Controlador para mostrar el perfil de un usuario
exports.profile = async function (req, res, next) {
    try {
        // Obtener el usuario desde la base de datos
        const user = await models.User.findByPk(req.params.userId, {
            include: [
                { model: models.Interpreter, as: 'interpreters', include: [{ model: models.Language, as: 'languages' }, { model: models.Reputation, as: 'reputation' }, { model: models.Timeslot, as: 'timeslot' }] },
                { model: models.Like, as: 'likes' }
            ],
        });

        // Obtener el rol del usuario
        userRole = await checkRole(user.id);

        // Obtener likes
        const likes = await models.Like.findAll({ where: { to_id: user.id  }});

        // Obtener horarios
        const TSMonday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Monday'  }});
        const TSTuesday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Tuesday'  }});
        const TSWednesday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Wednesday'  }});
        const TSThursday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Thursday'  }});
        const TSFriday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Friday'  }});
        const TSSaturday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Saturday'  }});
        const TSSunday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Sunday'  }});

        // Renderizar la vista del perfil con los datos del usuario
        res.render('users/profile', { user, userRole, likes, TSMonday, TSTuesday, TSWednesday, TSThursday, TSFriday, TSSaturday, TSSunday });
    } catch (error) {
        // Manejar los errores
        next(error);
    }
};


// GET /users/:userId/edit
exports.editProfile = async function (req, res, next) {
    userRole = await checkRole(req.user.id);
    res.render('users/editProfile', { user: req.user, userRole });
};


// PUT /users/:userId
exports.updateProfile = async function (req, res, next) {

    try {

        // Valida que el campo de password no esté vacío
        if (!req.body.password) {
            req.flash('error', "El campo Password debe rellenarse.");
            return res.render('users/editProfile', { user: req.user });
        }

        // Actualiza los campos
        req.user.username = req.body.username;
        req.user.password = req.body.password;
        req.user.password_update = new Date();
        req.user.verify_key_expire = new Date();

        // Guarda el usuario con los nuevos datos
        await req.user.save();

        // Redirecciona a la página de detalles del usuario
        req.flash('success', 'User successfully updated.');
        res.redirect('/users/' + req.user.id + '/profile');
    } catch (error) {
        // Maneja los errores
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('users/editProfile', { user: req.user });
        } else {
            next(error);
        }
    }
};


// Función para comprobar el role
async function checkRole(userId) {

    var userRole = 'Not defined';

    if (await models.Consultant.findOne({ where: { id: userId } })) {
        userRole = 'Consultant';
    }

    if (await models.Coordinator.findOne({ where: { id: userId } })) {
        userRole = 'Coordinator';
    }

    if (await models.Operator.findOne({ where: { id: userId } })) {
        userRole = 'Operator';
    }

    if (await models.Technician.findOne({ where: { id: userId } })) {
        userRole = 'Technician';
    }

    if (await models.Interpreter.findOne({ where: { id: userId } })) {
        userRole = 'Interpreter';
    }
    
    return userRole;
}