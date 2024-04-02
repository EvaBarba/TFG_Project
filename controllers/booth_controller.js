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

        const languages = await obtainLanguages();

        res.render('rooms/booths/new', { room: room, booth: booth, languages: languages });
    } catch (error) {
        next(error);
    }
};

// POST /booths
exports.create = async function (req, res, next) {
    try {

        // Obtener el siguiente ID disponible para la nueva booth
        const availableId = await findAvailableBoothId();

        // Obtener el ID de la habitación de req.params.roomId
        const roomId = req.params.roomId;

        // Obtener la habitación correspondiente al ID
        const room = await models.Room.findByPk(roomId);


        const booth = await models.Booth.create({
            id: availableId,
            language: req.body.language,
            language_a: req.body.language_a,
            signs: req.body.signs,
            deaf: req.body.deaf,
            single: req.body.single,
            speech_to_text: req.body.speech_to_text,
            room_id: roomId
        });

        req.flash('success', 'Booth successfully created.');
        return res.redirect('/rooms/');
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



// // GET /booths/:boothId/edit
// exports.edit = async function (req, res, next) {
//     try {
//         const languages = await obtainLanguages();
//         res.render('booths/edit', { booth: req.booth, languages: languages });
//     } catch (error) {
//         next(error);
//     }
// };


// // PUT /booths/:boothId
// exports.update = async function (req, res, next) {

//     try {
//         // Actualiza los campos de la booth
//         req.booth.name = req.body.name;
//         req.booth.description = req.body.description;
//         req.booth.date = req.body.date;
//         req.booth.language = req.body.language;
//         req.booth.licode_booth = req.body.licode_booth;
//         req.booth.place = req.body.place;
//         req.booth.ai_enabled = req.body.ai_enabled;
//         req.booth.on_air = req.body.on_air;
//         req.booth.educational = req.body.educational;
//         req.booth.zoom_url = req.body.zoom_url;

//         // Validaciones de campos obligatorios
//         const requiredFields = ['name', 'date', 'language', 'time_start', 'time_finish'];
//         for (const field of requiredFields) {
//             if (!req.body[field]) {
//                 req.flash('error', `The ${field} field cannot be empty.`);
//                 return res.render('booths/edit', { booth: req.booth });
//             }
//         }

//         // Comprobar si la fecha es posterior a la fecha actual
//         const currentDate = new Date();
//         const inputDate = new Date(req.body.date);

//         if (inputDate < currentDate) {
//             req.flash('error', 'The date must be later than the current date.');
//             return res.render('booths/edit', { booth: req.booth, error_msg: req.flash('error') });
//         }

//         // Comprobar que la fecha de finalización sea posterior a la de iniciación
//         if (req.body.time_finish < req.body.time_start) {
//             req.flash('error', 'End date cannot be earlier than start date.');
//             return res.render('booths/edit', { booth: req.booth, error_msg: req.flash('error') });
//         } else {
//             req.booth.time_start = req.body.time_start;
//             req.booth.time_finish = req.body.time_finish;
//         }



//         // Guarda el usuario con los nuevos datos
//         await req.booth.save();

//         // Redirecciona a la página de detalles del usuario
//         req.flash('success', 'booth successfully updated.');
//         res.redirect('/booths');
//     } catch (error) {
//         // Maneja los errores
//         if (error instanceof Sequelize.ValidationError) {
//             req.flash('error', 'Errors in the form:');
//             for (var i in error.errors) {
//                 req.flash('error', error.errors[i].message);
//             }
//             res.render('booths/edit', { booth: req.booth });
//         } else {
//             next(error);
//         }
//     }
// };



// // GET /booths/:boothId/delete
// exports.showDeleteConfirmation = async function (req, res, next) {
//     try {
//         const booth = await models.Booth.findByPk(req.params.boothId, {
//             include: [
//                 { model: models.Booth, as: 'boothsDetails', include: { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } } }
//             ]
//         });

//         if (!booth) {
//             res.status(404).send('Sala no encontrada');
//             return;
//         }

//         res.render('booths/delete', { booth: booth });
//     } catch (error) {
//         next(error);
//     }
// };


// // DELETE /users/:userId
// exports.destroy = async function (req, res, next) {
//     try {
//         const booth = await models.Booth.findByPk(req.params.boothId, {
//             include: [
//                 { model: models.Booth, as: 'boothsDetails' }
//             ]
//         });

//         if (!booth) {
//             res.status(404).send('Booth not found');
//             return;
//         }

//         // Elimina las asignaciones de cabinas asociadas a la sala
//         await models.Boothassignment.destroy({
//             where: {
//                 booth_id: booth.boothsDetails.map(booth => booth.id)
//             }
//         });

//         // Elimina las cabinas asociadas a la sala
//         await Promise.all(booth.boothsDetails.map(booth => booth.destroy()));

//         // Elimina la sala
//         await booth.destroy();

//         req.flash('success', 'Booth successfully eliminated.');
//         res.redirect('/booths');
//     } catch (error) {
//         next(error);
//     }
// };








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
