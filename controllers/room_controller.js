// controllers/room_controller.js

var models = require('../models');
var Sequelize = require('sequelize');

// Autoload :roomId
exports.load = function (req, res, next, roomId) {
    models.Room.findByPk(roomId)
        .then(function (room) {
            if (room) {
                req.room = room;
                next();
            } else {
                req.flash('error', 'Room with id=' + roomId + ' does not exist.');
                throw new Error('Does not exist roomId=' + roomId + '.');
            }
        })
        .catch(function (error) {
            next(error);
        });
};



// GET /rooms
exports.index = function (req, res, next) {

    models.Room.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } },
                    { model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } },
                    { model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } },
                    { model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } },
                    { model: models.Booth, as: 'boothsDetails', include: { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } } }
                ]
            }

            return models.Room.findAll(findOptions);

        })
        .then(function (rooms) {
            // console.log(rooms);
            res.render('rooms/index', { rooms: rooms });
        })
        .catch(function (error) {
            next(error);
        });
};

// GET /rooms/:roomId
exports.show = async function (req, res, next) {

    const room = await models.Room.findByPk(req.params.roomId, {
        include: [
            { model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } },
            { model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } },
            { model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } },
            { model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } },
            { model: models.Booth, as: 'boothsDetails', include: { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } } }
        ]
    });

    res.render('rooms/show', { room: room });
};


// GET /rooms/new
exports.new = async function (req, res, next) {
    try {
        var room = {
            name: "",
            description: "",
            date: "",
            language: "",
            licode_room: "",
            time_start: "",
            time_finish: "",
            place: "",
            ai_enabled: false,
            on_air: "",
            educational: false,
            zoom_url: "",
            assigned_vrc: ""
        };
        res.render('rooms/new', { room: room });
    } catch (error) {
        next(error);
    }
};

// POST /rooms
exports.create = async function (req, res, next) {
    try {

        // Comprobar si la fecha es posterior a la fecha actual
        const currentDate = new Date();
        const inputDate = new Date(req.body.date);

        if (inputDate < currentDate) {
            const errorMessage = 'The date must be later than the current date.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/new', { error_msg: errorMessages });
        }

        // Comprobar que la fecha de finalización sea posterior a la de iniciación
        if (req.body.time_finish < req.body.time_start) {
            const errorMessage = 'End hour cannot be earlier than start hour.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/new', { error_msg: errorMessages });
        }

        // Encuentra el primer ID disponible que no está en uso
        const availableId = await findAvailableRoomId();

        // Crear la sala
        const room = await models.Room.create({
            id: availableId,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            language: req.body.language,
            licode_room: req.body.licode_room,
            time_start: req.body.time_start,
            time_finish: req.body.time_finish,
            place: req.body.place,
            ai_enabled: req.body.ai_enabled,
            on_air: req.body.on_air,
            educational: req.body.educational,
            zoom_url: req.body.zoom_url,
            assigned_vrc: req.body.assigned_vrc
        });

        req.flash('success', 'Room successfully created.');
        return res.redirect('/rooms/');
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('rooms/new', { room: req.body });
        } else {
            next(error);
        }
    }
};


// GET /rooms/:roomId/edit
exports.edit = async function (req, res, next) {
    res.render('rooms/edit', { room: req.room });
};


// PUT /rooms/:roomId
exports.update = async function (req, res, next) {

    try {

        const initialLanguage = req.room.language;

        // Validaciones de campos obligatorios
        const requiredFields = ['name', 'date', 'language', 'time_start', 'time_finish'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                req.flash('error', `The ${field} field cannot be empty.`);
                return res.render('rooms/edit', { room: req.room });
            }
        }

        // Actualiza los campos de la room
        req.room.name = req.body.name;
        req.room.description = req.body.description;
        req.room.language = req.body.language;
        req.room.licode_room = req.body.licode_room;
        req.room.place = req.body.place;
        req.room.ai_enabled = req.body.ai_enabled;
        req.room.on_air = req.body.on_air;
        req.room.educational = req.body.educational;
        req.room.zoom_url = req.body.zoom_url;

        // Comprobar si la fecha es posterior a la fecha actual
        const currentDate = new Date();
        const inputDate = new Date(req.body.date);

        if (inputDate < currentDate) {
            const errorMessage = 'The date must be later than the current date.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/edit', { room: req.room, error_msg: errorMessages });
        } else {
            req.room.date = req.body.date;
        }

        // Comprobar que la fecha de finalización sea posterior a la de iniciación
        if (req.body.time_finish < req.body.time_start) {
            const errorMessage = 'End date cannot be earlier than start date.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/edit', { room: req.room, error_msg: errorMessages });

        } else {
            req.room.time_start = req.body.time_start;
            req.room.time_finish = req.body.time_finish;
        }

        // Guarda el usuario con los nuevos datos
        await req.room.save();

        // MODIFICACIONES SI SE CAMBIA EL LANGUAGE: actualizar languge booths y eliminar interpretes
        if (req.body.language !== initialLanguage) {
            // Busca todas las booths relacionadas con la roomId
            const booths = await models.Booth.findAll({ where: { room_id: req.room.id } });

            // Actualiza el idioma de las booths relacionadas
            for (const booth of booths) {
                await models.Boothassignment.destroy({ where: { booth_id: booth.id } });

                if (booth.language_to_translate === req.body.language) {
                    await booth.destroy();
                } else {
                    booth.language = req.body.language;
                    await booth.save();
                }
            }
        }

        // Redirecciona a la página de detalles del usuario
        req.flash('success', 'Room successfully updated.');
        res.redirect('/rooms/' + req.room.id);
    } catch (error) {
        // Maneja los errores
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('rooms/edit', { room: req.room });
        } else {
            next(error);
        }
    }
};



// GET /rooms/:roomId/delete
exports.showDeleteConfirmation = async function (req, res, next) {
    try {
        const room = await models.Room.findByPk(req.params.roomId, {
            include: [
                { model: models.Booth, as: 'boothsDetails', include: { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } } }
            ]
        });

        if (!room) {
            res.status(404).send('Room not found');
            return;
        }

        res.render('rooms/delete', { room: room });
    } catch (error) {
        next(error);
    }
};


// DELETE /rooms/:roomId
exports.destroy = async function (req, res, next) {
    try {
        const room = await models.Room.findByPk(req.params.roomId, {
            include: [
                { model: models.Booth, as: 'boothsDetails' }
            ]
        });

        if (!room) {
            res.status(404).send('Room not found');
            return;
        }

        // Elimina las asignaciones de cabinas asociadas a la sala
        await models.Boothassignment.destroy({
            where: {
                booth_id: room.boothsDetails.map(booth => booth.id)
            }
        });

        // Elimina las cabinas asociadas a la sala
        await Promise.all(room.boothsDetails.map(booth => booth.destroy()));

        // Elimina la sala
        await room.destroy();

        req.flash('success', 'Room successfully eliminated');
        res.redirect('/rooms');
    } catch (error) {
        next(error);
    }
};


// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// GET /consultants
exports.selectConsultant = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } }]
        });

        const currentConsultant = room ? room.consultantOfRoom : null;

        // Obtener todos los consultores
        const allConsultants = await models.Consultant.findAll({
            include: [{ model: models.User, as: 'User' }],
            order: ['id']
        });

        // Renderizar la vista con ambos conjuntos de datos
        res.render('rooms/selectConsultant', { currentConsultant: currentConsultant, allConsultants: allConsultants, room: room });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el consultor de la habitación
exports.updateConsultant = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } }]
        });

        // Asignar el nuevo consultor a la habitación
        req.room.consultant_id = req.body.consultantId;

        // Guarda los cambios
        await req.room.save();

        // Redirecciona a la página de detalles de la habitación u otra página según sea necesario
        res.redirect('/rooms/' + roomId + '/selectConsultant');
    } catch (error) {
        next(error);
    }
};




// GET /coordinator
exports.selectCoordinator = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } }]
        });

        const currentCoordinator = room ? room.coordinatorOfRoom : null;

        // Obtener todos los consultores
        const allCoordinators = await models.Coordinator.findAll({
            include: [{ model: models.User, as: 'User' }],
            order: ['id']
        });

        // Renderizar la vista con ambos conjuntos de datos
        res.render('rooms/selectCoordinator', { currentCoordinator: currentCoordinator, allCoordinators: allCoordinators, room: room });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el consultor de la habitación
exports.updateCoordinator = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } }]
        });

        // Asignar el nuevo consultor a la habitación
        req.room.coordinator_id = req.body.coordinatorId;

        // Guarda los cambios
        await req.room.save();

        // Redirecciona a la página de detalles de la habitación u otra página según sea necesario
        res.redirect('/rooms/' + roomId + '/selectCoordinator');
    } catch (error) {
        next(error);
    }
};




// GET /operators
exports.selectOperator = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } }]
        });

        const currentOperator = room ? room.operatorOfRoom : null;

        // Obtener todos los consultores
        const allOperators = await models.Operator.findAll({
            include: [{ model: models.User, as: 'User' }],
            order: ['id']
        });

        // Renderizar la vista con ambos conjuntos de datos
        res.render('rooms/selectOperator', { currentOperator: currentOperator, allOperators: allOperators, room: room });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el consultor de la habitación
exports.updateOperator = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } }]
        });

        // Asignar el nuevo consultor a la habitación
        req.room.operator_id = req.body.operatorId;

        // Guarda los cambios
        await req.room.save();

        // Redirecciona a la página de detalles de la habitación u otra página según sea necesario
        res.redirect('/rooms/' + roomId + '/selectOperator');
    } catch (error) {
        next(error);
    }
};




// GET /technicians
exports.selectTechnician = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } }]
        });

        const currentTechnician = room ? room.technicianOfRoom : null;

        // Obtener todos los consultores
        const allTechnicians = await models.Technician.findAll({
            include: [{ model: models.User, as: 'User' }],
            order: ['id']
        });

        // Renderizar la vista con ambos conjuntos de datos
        res.render('rooms/selectTechnician', { currentTechnician: currentTechnician, allTechnicians: allTechnicians, room: room });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el consultor de la habitación
exports.updateTechnician = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [{ model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } }]
        });

        // Asignar el nuevo consultor a la habitación
        req.room.technician_id = req.body.technicianId;

        // Guarda los cambios
        await req.room.save();

        // Redirecciona a la página de detalles de la habitación u otra página según sea necesario
        res.redirect('/rooms/' + roomId + '/selectTechnician');
    } catch (error) {
        next(error);
    }
};



// MWs varios

//Función para obtener un ID de evento disponible
async function findAvailableRoomId() {
    // Encuentra el primer ID disponible que no está en uso
    let id = 1;
    while (true) {
        const room = await models.Room.findOne({ where: { id: id } });
        if (!room) {
            return id;
        }
        id++;
    }
}