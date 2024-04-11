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

        // Crear la sala
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