// controllers/reputation_controller.js

var models = require('../models');
var Sequelize = require('sequelize');


// GET /reputations
exports.index = function (req, res, next) {
    
    models.Interpreter.count()
    .then(function (count) {

        var findOptions = {
            include: [
                { model: models.Reputation, as: 'reputation' },
                { model: models.User, as: 'User' }
            ],
            order: [[{ model: models.Reputation, as: 'reputation' }, 'value', 'ASC']]
        }

        return models.Interpreter.findAll(findOptions);
        // console.log(reputations); // Verifica los datos devueltos por la consulta
    })
    .then(function (reputations) {
        res.render('reputations/index', { reputations: reputations });
    })
    .catch(function (error) {
        next(error);
    });
};












// // Autoload de la reputación asociada a :reputationId
// exports.load = function (req, res, next, reputationId) {
//     Reputation.findByPk(reputationId)
//         .then(function (reputation) {
//             if (reputation) {
//                 req.reputation = reputation;
//                 next();
//             } else {
//                 req.flash('error', 'No existe la reputación con id=' + reputationId + '.');
//                 throw new Error('No existe reputationId=' + reputationId);
//             }
//         })
//         .catch(function (error) {
//             next(error);
//         });
// };

// // GET /reputations
// exports.index = function (req, res, next) {
//     Reputation.findAll()
//         .then(function (reputations) {
//             res.render('reputations/index', { reputations: reputations });
//         })
//         .catch(function (error) {
//             next(error);
//         });
// };

// // GET /reputations/:reputationId
// exports.show = function (req, res, next) {
//     res.render('reputations/show', { reputation: req.reputation });
// };

// // GET /reputations/new
// exports.new = function (req, res, next) {
//     res.render('reputations/new');
// };

// // POST /reputations
// exports.create = function (req, res, next) {
//     Reputation.create(req.body)
//         .then(function (reputation) {
//             req.flash('success', 'Reputación creada con éxito.');
//             res.redirect('/reputations/' + reputation.id);
//         })
//         .catch(function (error) {
//             next(error);
//         });
// };

// // GET /reputations/:reputationId/edit
// exports.edit = function (req, res, next) {
//     res.render('reputations/edit', { reputation: req.reputation });
// };

// // PUT /reputations/:reputationId
// exports.update = function (req, res, next) {
//     req.reputation.update(req.body)
//         .then(function (reputation) {
//             req.flash('success', 'Reputación actualizada con éxito.');
//             res.redirect('/reputations/' + reputation.id);
//         })
//         .catch(function (error) {
//             next(error);
//         });
// };

// // DELETE /reputations/:reputationId
// exports.destroy = function (req, res, next) {
//     req.reputation.destroy()
//         .then(function () {
//             req.flash('success', 'Reputación eliminada con éxito.');
//             res.redirect('/reputations');
//         })
//         .catch(function (error) {
//             next(error);
//         });
// };
