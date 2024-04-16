// controllers/language_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
const { Op } = require('sequelize');

// GET /languages
exports.index = function (req, res, next) {

    models.Language.count()
        .then(function (count) {

            var findOptions = {
                include: [
                    { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } }
                ],
                order: ['language_from']
            }

            return models.Language.findAll(findOptions);
        })
        .then(function (languages) {
            res.render('languages/index', { languages: languages });
        })
        .catch(function (error) {
            next(error);
        });
};



// GET /languages/new
exports.newLanguage = async function (req, res, next) {
    try {
        var language = {
            language_from: "",
            language_to: "",
        };
        res.render('languages/new', { language: language });
    } catch (error) {
        next(error);
    }
};

// POST /languages
exports.createLanguage = async function (req, res, next) {
    try {

        // Check that language_from is different from language_to
        if (req.body.language_from === req.body.language_to) {
            const errorMessage = 'The source language cannot be the same as the destination language.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('languages/new', { error_msg: errorMessages });
        }

        // Encuentra el primer ID disponible que no está en uso
        const availableId = await findAvailableLanguageId();

        // Crear el language
        const language = await models.Language.create({
            id: availableId,
            language_from: req.body.language_from,
            language_to: req.body.language_to,
        });

        req.flash('success', 'Language successfully created.');
        return res.redirect('/languages/');
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('languages/new', { language: req.body });
        } else {
            next(error);
        }
    }
};


// GET /interpreterProfile/newInterpreterLanguage
exports.newInterpreterLanguage = async function (req, res, next) {
    try {
        var user = await models.User.findByPk(req.params.userId);
        var language = {
            language_from: "",
            language_to: "",
        };
        res.render('languages/newInterpreterLanguage', { language: language, user: user });
    } catch (error) {
        next(error);
    }
};

// POST /interpreterProfile
exports.createInterpreterLanguage = async function (req, res, next) {
    try {

        // Check that language_from is different from language_to
        if (req.body.language_from === req.body.language_to) {
            const errorMessage = 'The source language cannot be the same as the destination language.';
            req.flash('error', errorMessage);
            const errorMessages = req.flash('error');
            console.log("errorMessages: " + errorMessages);
            return res.render('languages/new', { error_msg: errorMessages });
        }

        // Verificar si el idioma ya existe en la tabla Language
        const existingLanguage = await models.Language.findOne({
            where: {
                language_from: req.body.language_from,
                language_to: req.body.language_to
            }
        });

        let languageId;

        // Si el idioma ya existe, usa su ID
        if (existingLanguage) {
            languageId = existingLanguage.id;
        } else {
            // Encuentra el primer ID disponible que no está en uso
            const availableId = await findAvailableLanguageId();

            // Crear el language
            const language = await models.Language.create({
                id: availableId,
                language_from: req.body.language_from,
                language_to: req.body.language_to,
            });

            languageId = language.id;
        }

        const userId = req.params.userId;

        // Crear la relación en la tabla Languageknown
        const languageKnown = models.Languageknown.build({
            interpreter_id: userId,
            language_id: languageId,
        })

        await languageKnown.save();

        req.flash('success', 'Language successfully created.');
        res.redirect('/users/' + req.user.id + '/profile');
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('languages/newInterpreterLanguage', { language: req.body });
        } else {
            next(error);
        }
    }
};



async function findAvailableLanguageId() {
    // Encuentra el primer ID disponible que no está en uso
    let id = 1;
    while (true) {
        const language = await models.Language.findOne({ where: { id: id } });
        if (!language) {
            return id;
        }
        id++;
    }
}


exports.destroyLanguageKnown = async function (req, res, next) {
    try {
        // Obtener el ID del intérprete y el ID del idioma desde la solicitud
        const interpreterId = req.params.userId;
        const languageId = req.params.languageId;

        // Eliminar las booth con el language que se ha eliminado
        const languageknownLanguage = await models.Language.findOne({ where: { id: languageId } });
        const boothAssignmentInterpreter = await models.Boothassignment.findAll({ where: { interpreter_id: interpreterId } });
        // const boothsOfInterpreter = await models.Booth.findAll({ where: { id: boothAssignmentInterpreter.booth_id } });

        for (const assignment of boothAssignmentInterpreter) {
            const booths = await models.Booth.findAll({ where: { id: assignment.booth_id } });
            for (const booth of booths) {
                // Verificar si la fecha de la habitación es posterior a la actual
                const room = await models.Room.findOne({ where: { id: booth.room_id } });

                if (room.date > new Date()) {
                    // Verificar si el idioma conocido coincide con el idioma de la cabina
                    if (languageknownLanguage.language_from === booth.language && languageknownLanguage.language_to === booth.language_a) {
                        // Eliminar la asignación de la cabina
                        await models.Boothassignment.destroy({ where: { interpreter_id: interpreterId, booth_id: booth.id } });
                    }
                }
            }
        }

        // Eliminar la relación Languageknown
        await models.Languageknown.destroy({
            where: {
                interpreter_id: interpreterId,
                language_id: languageId
            }
        });

        req.flash('success', 'Language relation successfully deleted.');
        res.redirect('/users/' + req.user.id + '/profile');
    } catch (error) {
        next(error);
    }
};
