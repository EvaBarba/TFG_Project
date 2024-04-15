// controllers/booth_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
const iso6391 = require('iso-639-1');

// Autoload :boothId
exports.load = function (req, res, next, boothId) {
    models.Booth.findByPk(boothId)
        .then(function (booth) {
            if (booth) {
                req.booth = booth;
                next();
            } else {
                req.flash('error', 'Booth with id=' + boothId + ' does not exist.');
                throw new Error('Does not exist boothId=' + boothId + '.');
            }
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /booths/new
exports.new = async function (req, res, next) {

    try {
        // Obtener el ID de la habitación de req.params.roomId
        const roomId = req.params.roomId;

        // Obtener la habitación correspondiente al ID
        const room = await models.Room.findByPk(roomId);

        // Crear un objeto booth con los campos iniciales
        var booth = {
            language_a: "",
            signs: false,
            deaf: false,
            single: false,
            speech_to_text: false,
        };

        res.render('rooms/booths/new', { room: room, booth: booth });
    } catch (error) {
        next(error);
    }
};

// POST /booths
exports.create = async function (req, res, next) {
    try {

        // Obtener el ID de la habitación de req.params.roomId
        const roomId = req.params.roomId;

        // Obtener la habitación correspondiente al ID
        const room = await models.Room.findByPk(roomId);

        // El lenguaje al que se traduce no puede ser el mismo que el original
        if (room.language === req.body.language_a) {
            const errorMessage = 'The language to be translated cannot be the same as the original language.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/booths/new', { booth: req.booth, room: room, error_msg: errorMessages });
        }

        // Obtener el siguiente ID disponible para la nueva booth
        const availableId = await findAvailableBoothId();

        const booth = await models.Booth.create({
            id: availableId,
            language: room.language,
            language_a: req.body.language_a,
            signs: req.body.signs,
            deaf: req.body.deaf,
            single: req.body.single,
            speech_to_text: req.body.speech_to_text,
            room_id: roomId
        });

        req.flash('success', 'Booth successfully created.');
        return res.redirect('/rooms/' + req.room.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('rooms/booths/new', { booth: req.body });

        } else {
            next(error);
        }
    }
};

// Función para obtener el siguiente id disponible
async function findAvailableBoothId() {
    // Obtener el último booth creado
    const lastBooth = await models.Booth.findOne({
        order: [['id', 'DESC']]
    });

    // Si no hay ningún booth en la base de datos, comenzar desde el ID 1
    if (!lastBooth) {
        return 1;
    }

    // Si hay booths en la base de datos, el siguiente ID disponible será el siguiente al último ID
    return lastBooth.id + 1;
}



// GET /booths/:boothId/edit
exports.edit = async function (req, res, next) {

    // Obtener el ID de la habitación de req.params.roomId
    const roomId = req.params.roomId;

    // Obtener la habitación correspondiente al ID
    const room = await models.Room.findByPk(roomId);

    res.render('rooms/booths/edit', { booth: req.booth, room: room });
};


// PUT /booths/:boothId
exports.update = async function (req, res, next) {

    try {

        const initialLanguage = req.booth.language_a;

        // Obtener el ID de la habitación de req.params.roomId
        const roomId = req.params.roomId;

        // Obtener la habitación correspondiente al ID
        const room = await models.Room.findByPk(roomId);

        // Actualiza los campos de la booth
        req.booth.language_a = req.body.language_a;
        req.booth.signs = req.body.signs;
        req.booth.deaf = req.body.deaf;
        req.booth.single = req.body.single;
        req.booth.speech_to_text = req.body.speech_to_text;

        // Validaciones de campos obligatorios
        const requiredFields = ['language', 'language_a'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                req.flash('error', `The ${field} field cannot be empty.`);
                return res.render('rooms/booths/edit', { booth: req.booth });
            }
        }

        if (room.language === req.body.language_a) {
            const errorMessage = 'The language to be translated cannot be the same as the original language.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('rooms/booths/edit', { booth: req.booth, room: room, error_msg: errorMessages });
        }

        // MODIFICACIONES SI SE CAMBIA EL LANGUAGE: eliminar interpretes
        if (req.body.language_a !== initialLanguage) {
            await models.Boothassignment.destroy({ where: { booth_id: req.booth.id } });
        }

        // Guarda el usuario con los nuevos datos
        await req.booth.save();

        // Redirecciona a la página de detalles del usuario
        req.flash('success', 'Booth successfully updated.');
        res.redirect('/rooms/' + req.room.id);
    } catch (error) {
        // Maneja los errores
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('rooms/booths/edit', { booth: req.booth });
        } else {
            next(error);
        }
    }
};


// GET /booths/:boothId/delete
exports.showDeleteConfirmation = async function (req, res, next) {
    try {

        // Obtener el ID de la habitación de req.params.roomId
        const roomId = req.params.roomId;

        // Obtener la habitación correspondiente al ID
        const room = await models.Room.findByPk(roomId);

        const booth = await models.Booth.findByPk(req.params.boothId, {
            include: [
                { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } }
            ]
        });

        if (!booth) {
            res.status(404).send('Booth not found');
            return;
        }

        res.render('rooms/booths/delete', { booth: booth, room: room });
    } catch (error) {
        next(error);
    }
};


// DELETE /booths/:boothId
exports.destroy = async function (req, res, next) {
    try {
        const booth = await models.Booth.findByPk(req.params.boothId);
        if (!booth) {
            res.status(404).send('Booth not found');
            return;
        }
        await booth.destroy();
        req.flash('success', 'Booth successfully eliminated');
        res.redirect('/rooms/' + req.room.id);
    } catch (error) {
        next(error);
    }
};



// INTERPRETERS OF THE BOOTHS --------------------------------------------------------------------------------------------

// GET /interpreters
exports.selectBoothInterpreter = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId);

        const boothId = req.params.boothId;
        const booth = await models.Booth.findByPk(boothId);

        const boothLanguage = booth.language;
        const boothLanguage_a = booth.language_a;

        const assignments = await models.Boothassignment.findAll({ where: { booth_id: boothId } });

        // Array para almacenar los intérpretes
        let currentInterpreters = [];

        for (const assignment of assignments) {
            const interpreter = await models.Interpreter.findOne({
                where: { id: assignment.interpreter_id },
                include: [{ model: models.User, as: 'User' }, { model: models.Reputation, as: 'reputation' }]
            });

            if (interpreter) {
                currentInterpreters.push(interpreter);
            }
        }

        let possibleInterpretersSet = new Set();

        // Obtener todos los intérpretes con ese lenguaje
        const allInterpreters = await models.Interpreter.findAll({
            include: [{ model: models.User, as: 'User' }, { model: models.Reputation, as: 'reputation' }],
            order: [[{ model: models.Reputation, as: 'reputation' }, 'value', 'DESC']]
        });

        for (const candidateInterpreter of allInterpreters) {
            const languagesOfInterpreter = await models.Languageknown.findAll({ where: { interpreter_id: candidateInterpreter.id } });
            for (const language of languagesOfInterpreter) {
                const languageOfInterpreter = await models.Language.findOne({ where: { id: language.language_id } });
                if ((languageOfInterpreter.language_from === boothLanguage) && (languageOfInterpreter.language_to === boothLanguage_a)) {
                    possibleInterpretersSet.add(candidateInterpreter); // Agregar el intérprete al conjunto
                }
            }
        }

        // Convertir el conjunto a un array
        let possibleInterpreters = Array.from(possibleInterpretersSet);

        // Renderizar la vista con ambos conjuntos de datos
        res.render('rooms/booths/selectInterpreter', { currentInterpreters, possibleInterpreters, booth, room });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el consultor de la habitación
exports.updateBoothInterpreter = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId);

        const boothId = req.params.boothId;
        const booth = await models.Booth.findByPk(boothId);

        // Asignar el nuevo interprete a la habitación
        const newInterpreterId = req.body.interpreterId;

        const assignation = models.Boothassignment.build({
            interpreter_id: newInterpreterId,
            booth_id: boothId,
        });

        await assignation.save();

        res.redirect('/rooms/' + roomId + '/booths/' + boothId + '/selectInterpreter');
    } catch (error) {
        next(error);
    }
};

exports.deleteBoothInterpreter = async function (req, res, next) {
    try {
        // Obtener el consultor actual asociado a la habitación
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId);

        const boothId = req.params.boothId;
        const booth = await models.Booth.findByPk(boothId);

        const interpreterId = req.body.interpreterDeleteId;

        console.log("Ejecutando eliminación ----------------------------------------------------");
        console.log("boothId = " + boothId);
        console.log("interpreterId = " + interpreterId);

        await models.Boothassignment.destroy({ where: { interpreter_id: interpreterId, booth_id: boothId } });



        res.redirect('/rooms/' + roomId + '/booths/' + boothId + '/selectInterpreter');
    } catch (error) {
        next(error);
    }
};