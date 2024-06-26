// controllers/user_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
const { Op } = require('sequelize');

// Autoload :userId
exports.load = function (req, res, next, userId) {
    models.User.findByPk(userId)
        .then(function (user) {
            if (user) {
                req.user = user;
                next();
            } else {
                req.flash('error', 'User with id=' + userId + ' does not exist.');
                throw new Error('Does not exist userId=' + userId + '.');
            }
        })
        .catch(function (error) {
            next(error);
        });
};



// GET /users
exports.index = function (req, res, next) {

    models.User.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.Admin, as: 'Admins' },
                    { model: models.Consultant, as: 'consultants' },
                    { model: models.Coordinator, as: 'coordinators' },
                    { model: models.Operator, as: 'operators' },
                    { model: models.Technician, as: 'technicians' },
                    { model: models.Interpreter, as: 'interpreters' }
                ],
                order: ['email']
            }

            return models.User.findAll(findOptions);
        })
        .then(function (users) {
            res.render('users/index', { users });
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /users/:userId
exports.show = async function (req, res, next) {

    userRole = await checkRole(req.user.id);
    res.render('users/show', { user: req.user, userRole });
};


// GET /users/new
exports.new = function (req, res, next) {
    var user = {
        email: "",
        username: "",
        password: ""
    };
    res.render('users/new', { user });
};


// POST /users
exports.create = async function (req, res, next) {
    try {
        // Comprueba si ya existe un usuario con el mismo correo electrónico
        const existingUser = await models.User.findOne({ where: { email: req.body.email } });

        // Crea un nuevo usuario si no existe
        if (!existingUser) {
            // Encuentra el primer ID disponible que no está en uso
            const availableId = await findAvailableUserId();

            // Crea el nuevo usuario con el ID disponible
            const user = await models.User.create({
                id: availableId,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                password_update: new Date(),
                verify_key_expire: new Date(),
                enabled: true,
                verify_key_email: "clave" + availableId
            });

            // Insertar el usuario en la tabla de roles correspondiente según la selección del usuario
            switch (req.body.role) {
                case 'consultant':
                    await models.Consultant.create({ id: user.id });
                    break;
                case 'coordinator':
                    await models.Coordinator.create({ id: user.id });
                    break;
                case 'operator':
                    await models.Operator.create({ id: user.id });
                    break;
                case 'technician':
                    await models.Technician.create({ id: user.id });
                    break;
                case 'interpreter':
                    await models.Interpreter.create({ id: user.id });
                    break;
                default:
                    // Manejar caso por defecto si no se selecciona un rol válido
                    break;
            }

            req.flash('success', 'User successfully created.');
            return res.redirect('/users/');
        }

        const emsg = "The user with email \"" + req.body.username + "\" already exists.";
        req.flash('error', emsg);
        res.render('users/new', { user: req.body });

    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].value);
            }
            res.render('users/new', { user: req.body });
        } else {
            next(error);
        }
    }
};


// GET /users/:userId/edit
exports.edit = async function (req, res, next) {

    userRole = await checkRole(req.user.id);

    res.render('users/edit', { user: req.user, userRole });
};


// PUT /users/:userId
exports.update = async function (req, res, next) {

    try {

        // Valida que el campo de username no esté vacío
        if (!req.body.username) {
            req.flash('error', "The Username field cannot be empty.");
            return res.render('users/edit', { user: req.user });
        }

        // Valida que el campo de password no esté vacío
        if (!req.body.password) {
            req.flash('error', "The Password field cannot be empty.");
            return res.render('users/edit', { user: req.user });
        }

        // Actualiza los campos
        req.user.username = req.body.username;
        req.user.password = req.body.password;
        req.user.salt = req.body.salt;
        req.user.password_update = new Date();
        req.user.verify_key_email = req.body.verify_key_email;
        req.user.verify_key_expire = new Date();
        if (req.body.enabled === 'yes') {
            req.user.enabled = true;
        } else {
            req.user.enabled = false;
        }
        req.user.extra = req.body.extra;

        // Verifica si se marcó "yes" en el campo de administrador
        if (req.body.admin === 'yes') {
            if (!req.user.admin_id) {
                // Busca un admin disponible que no esté asociado a ningún usuario
                const admin = await models.Admin.findOne({
                    where: {
                        id: {
                            [Op.notIn]: Sequelize.literal(
                                '(SELECT admin_id FROM users WHERE admin_id IS NOT NULL)'
                            )
                        }
                    }
                });

                if (admin) {
                    // Asigna el id del admin disponible al usuario
                    req.user.admin_id = admin.id;
                } else {
                    // Si no hay admins disponibles, crea uno nuevo con el próximo id disponible
                    const maxAdminId = await models.Admin.max('id');
                    const nextAdminId = maxAdminId ? maxAdminId + 1 : 1;
                    const newAdmin = await models.Admin.create({ id: nextAdminId });
                    req.user.admin_id = newAdmin.id;
                }
            }
        } else {
            // Si el usuario selecciona "no" para admin, elimina el admin_id del usuario
            req.user.admin_id = null;
        }

        // Guarda el usuario con los nuevos datos
        await req.user.save();

        // Redirecciona a la página de detalles del usuario
        req.flash('success', 'User successfully updated.');
        res.redirect('/users/' + req.user.id);
    } catch (error) {
        // Maneja los errores
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('users/edit', { user: req.user });
        } else {
            next(error);
        }
    }
};


// DELETE CONFIRMATION /users/:userId/delete
exports.showDeleteConfirmation = async function (req, res, next) {
    try {
        const user = await models.User.findByPk(req.params.userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        userRole = await checkRole(req.user.id);
        res.render('users/delete', { user: user, userRole });
    } catch (error) {
        next(error);
    }
};


// DELETE /users/:userId
exports.destroy = async function (req, res, next) {
    try {
        const user = await models.User.findByPk(req.params.userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        // Buscar roles relacionados con el usuario y eliminarlos
        await models.Consultant.destroy({ where: { id: user.id } });
        await models.Coordinator.destroy({ where: { id: user.id } });
        await models.Operator.destroy({ where: { id: user.id } });
        await models.Technician.destroy({ where: { id: user.id } });
        await models.Interpreter.destroy({ where: { id: user.id } });

        await user.destroy();
        req.flash('success', 'User successfully deleted.');
        res.redirect('/users');
    } catch (error) {
        next(error);
    }
};


// MWs varios

//Función para obtener un ID de usuario disponible
async function findAvailableUserId() {
    // Encuentra el primer ID disponible que no está en uso
    let id = 1;
    while (true) {
        const user = await models.User.findOne({ where: { id: id } });
        if (!user) {
            return id;
        }
        id++;
    }
}


// Función para eliminar al usuario de la tabla del antiguo role
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