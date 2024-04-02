// controllers/room_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
const iso6391 = require('iso-639-1');

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



// GET /rooms/new
exports.new = async function (req, res, next) {
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

    const languages = await obtainLanguages();

    res.render('rooms/new', { room: room, languages: languages });
};

// POST /rooms
exports.create = async function (req, res, next) {
    try {

        // Encuentra el primer ID disponible que no está en uso
        const availableId = await findAvailableRoomId();

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

        // Comprobar si la fecha es posterior a la fecha actual
        const currentDate = new Date();
        const inputDate = new Date(req.body.date);

        if (inputDate < currentDate) {
            req.flash('error', 'The date must be later than the current date.');
            return res.render('rooms/new', { room: req.room, error_msg: req.flash('error') });
        }

        // Comprobar que la fecha de finalización sea posterior a la de iniciación
        if (req.body.time_finish < req.body.time_start) {
            req.flash('error', 'End date cannot be earlier than start date.');
            return res.render('rooms/new', { room: req.room, error_msg: req.flash('error') });
        }

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



// GET /rooms/:roomId/edit
exports.edit = async function (req, res, next) {
    try {
        const languages = await obtainLanguages();
        res.render('rooms/edit', { room: req.room, languages: languages });
    } catch (error) {
        next(error);
    }
};


// PUT /rooms/:roomId
exports.update = async function (req, res, next) {

    try {
        // Actualiza los campos de la room
        req.room.name = req.body.name;
        req.room.description = req.body.description;
        req.room.date = req.body.date;
        req.room.language = req.body.language;
        req.room.licode_room = req.body.licode_room;
        req.room.place = req.body.place;
        req.room.ai_enabled = req.body.ai_enabled;
        req.room.on_air = req.body.on_air;
        req.room.educational = req.body.educational;
        req.room.zoom_url = req.body.zoom_url;

        // Validaciones de campos obligatorios
        const requiredFields = ['name', 'date', 'language', 'time_start', 'time_finish'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                req.flash('error', `The ${field} field cannot be empty.`);
                return res.render('rooms/edit', { room: req.room });
            }
        }

        // Comprobar si la fecha es posterior a la fecha actual
        const currentDate = new Date();
        const inputDate = new Date(req.body.date);

        if (inputDate < currentDate) {
            req.flash('error', 'The date must be later than the current date.');
            return res.render('rooms/edit', { room: req.room, error_msg: req.flash('error') });
        }

        // Comprobar que la fecha de finalización sea posterior a la de iniciación
        if (req.body.time_finish < req.body.time_start) {
            req.flash('error', 'End date cannot be earlier than start date.');
            return res.render('rooms/edit', { room: req.room, error_msg: req.flash('error') });
        } else {
            req.room.time_start = req.body.time_start;
            req.room.time_finish = req.body.time_finish;
        }



        // Guarda el usuario con los nuevos datos
        await req.room.save();

        // Redirecciona a la página de detalles del usuario
        req.flash('success', 'Room successfully updated.');
        res.redirect('/rooms');
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
            res.status(404).send('Sala no encontrada');
            return;
        }

        res.render('rooms/delete', { room: room });
    } catch (error) {
        next(error);
    }
};


// DELETE /users/:userId
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

        req.flash('success', 'Room successfully eliminated.');
        res.redirect('/rooms');
    } catch (error) {
        next(error);
    }
};








// Obtener todos los languages
async function obtainLanguages() {

    // Obtener todos los códigos de idioma
    const languageCodes = iso6391.getAllCodes();

    // Obtener todos los nombres de idioma
    const languageNames = iso6391.getAllNames();

    // Combina los códigos y los nombres en un objeto
    const languages = languageCodes.map((code, index) => ({
        code,
        name: languageNames[index]
    }));

    const sortedLanguages = languages.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    // console.log(sortedLanguages);

    return sortedLanguages;
}
