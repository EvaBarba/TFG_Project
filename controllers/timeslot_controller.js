// controllers/likes_controller.js

var models = require('../models');
var Sequelize = require('sequelize');

// GET /timeslots Edit
exports.editTimeslots = async function (req, res, next) {
    try {
        // Obtener el usuario desde la base de datos
        const user = await models.User.findByPk(req.params.userId, {
            include: [
                { model: models.Interpreter, as: 'interpreters', include: { model: models.Timeslot, as: 'timeslot' } }
            ]
        });

        // Obtener horarios
        const TSMonday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Monday' } });
        const TSTuesday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Tuesday' } });
        const TSWednesday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Wednesday' } });
        const TSThursday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Thursday' } });
        const TSFriday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Friday' } });
        const TSSaturday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Saturday' } });
        const TSSunday = await models.Timeslot.findOne({ where: { interpreter_id: user.id, day_of_week: 'Sunday' } });

        // Renderizar la vista del perfil con los datos del usuario
        res.render('users/manageSchedule', { user, TSMonday, TSTuesday, TSWednesday, TSThursday, TSFriday, TSSaturday, TSSunday });
    } catch (error) {
        next(error);
    }
};



// PUT /timeslots
exports.updateTimeslots = async function (req, res, next) {
    try {
        
        const userId = req.params.userId;
        // Obtener el usuario desde la base de datos
        const user = await models.User.findByPk(userId, {
            include: [
                { model: models.Interpreter, as: 'interpreters', include: { model: models.Timeslot, as: 'timeslot' } }
            ]
        });

        const { start_time_monday, end_time_monday, start_time_tuesday, end_time_tuesday, start_time_wednesday, end_time_wednesday, start_time_thursday, end_time_thursday, start_time_friday, end_time_friday, start_time_saturday, end_time_saturday, start_time_sunday, end_time_sunday } = req.body;

        // MONDAY
        if (start_time_monday && end_time_monday && (start_time_monday <= end_time_monday)) {
            const existingTSMonday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Monday' } });
            if (existingTSMonday) {
                await models.Timeslot.update({ start_time: start_time_monday, end_time: end_time_monday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Monday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Monday',
                    start_time: start_time_monday,
                    end_time: end_time_monday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Monday' } });
        }

        // TUESDAY
        if (start_time_tuesday && end_time_tuesday && (start_time_tuesday <= end_time_tuesday)) {
            const existingTSTuesday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Tuesday' } });
            if (existingTSTuesday) {
                await models.Timeslot.update({ start_time: start_time_tuesday, end_time: end_time_tuesday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Tuesday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Tuesday',
                    start_time: start_time_tuesday,
                    end_time: end_time_tuesday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Tuesday' } });
        }

         // WEDNESDAY
         if (start_time_wednesday && end_time_wednesday && (start_time_wednesday <= end_time_wednesday)) {
            const existingTSWednesday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Wednesday' } });
            if (existingTSWednesday) {
                await models.Timeslot.update({ start_time: start_time_wednesday, end_time: end_time_wednesday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Wednesday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Wednesday',
                    start_time: start_time_wednesday,
                    end_time: end_time_wednesday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Wednesday' } });
        }

         // THURSDAY
         if (start_time_thursday && end_time_thursday && (start_time_thursday <= end_time_thursday)) {
            const existingTSThursday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Thursday' } });
            if (existingTSThursday) {
                await models.Timeslot.update({ start_time: start_time_thursday, end_time: end_time_thursday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Thursday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Thursday',
                    start_time: start_time_thursday,
                    end_time: end_time_thursday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Thursday' } });
        }

         // FRIDAY
         if (start_time_friday && end_time_friday && (start_time_friday <= end_time_friday)) {
            const existingTSFriday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Friday' } });
            if (existingTSFriday) {
                await models.Timeslot.update({ start_time: start_time_friday, end_time: end_time_friday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Friday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Friday',
                    start_time: start_time_friday,
                    end_time: end_time_friday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Friday' } });
        }

         // SATURDAY
         if (start_time_saturday && end_time_saturday && (start_time_saturday <= end_time_saturday)) {
            const existingTSSaturday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Saturday' } });
            if (existingTSSaturday) {
                await models.Timeslot.update({ start_time: start_time_saturday, end_time: end_time_saturday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Saturday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Saturday',
                    start_time: start_time_saturday,
                    end_time: end_time_saturday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Saturday' } });
        }

         // SUNDAY
         if (start_time_sunday && end_time_sunday && (start_time_sunday <= end_time_sunday)) {
            const existingTSSunday = await models.Timeslot.findOne({ where: { interpreter_id: userId, day_of_week: 'Sunday' } });
            if (existingTSSunday) {
                await models.Timeslot.update({ start_time: start_time_sunday, end_time: end_time_sunday }, {
                    where: {
                        interpreter_id: userId,
                        day_of_week: 'Sunday'
                    }
                });
            } else {
                const availableId = await findAvailableTimeslotId();
                await models.Timeslot.create({
                    id: availableId,
                    interpreter_id: userId,
                    day_of_week: 'Sunday',
                    start_time: start_time_sunday,
                    end_time: end_time_sunday
                });
            }

        } else {
            await models.Timeslot.destroy({ where: { interpreter_id: userId, day_of_week: 'Sunday' } });
        }

        res.redirect('/users/' + userId + '/profile');
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Errors in the form:');
            for (let i in error.errors) {
                req.flash('error', error.errors[i].message);
            }
            res.render('users/manageSchedule', { user: req.body });
        } else {
            next(error);
        }
    }
};


// MWs varios

//Función para obtener un ID de timeslot disponible
async function findAvailableTimeslotId() {
    // Encuentra el primer ID disponible que no está en uso
    let id = 1;
    while (true) {
        const timeslot = await models.Timeslot.findOne({ where: { id: id } });
        if (!timeslot) {
            return id;
        }
        id++;
    }
}