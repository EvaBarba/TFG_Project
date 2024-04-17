// controllers/likes_controller.js

var models = require('../models');
var Sequelize = require('sequelize');

// GET /timeslots Edit
exports.editTimeslots = async function (req, res, next) {
    try {
        // Obtener el usuario desde la base de datos
        const user = await models.User.findByPk(req.params.userId, {
            include: [
                { model: models.Interpreter, as: 'interpreters', include: [{ model: models.Language, as: 'languages' }, { model: models.Reputation, as: 'reputation' }, { model: models.Timeslot, as: 'timeslot' }] },
                { model: models.Like, as: 'likes' }
            ],
        });

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
        res.render('users/manageSchedule', { user, TSMonday, TSTuesday, TSWednesday, TSThursday, TSFriday, TSSaturday, TSSunday });
    } catch (error) {
        next(error);
    }
};



// PUT /timeslots
exports.updateTimeslots = async function (req, res, next) {
    try {
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [
                { model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Booth, as: 'boothsDetails', include: { model: models.Interpreter, as: 'interpreters', include: { model: models.User, as: 'User' } } },
            ]
        });
        const { coordinatorLike, operatorLike, technicianLike } = req.body;

        // Actualizar la puntuación del coordinador si se proporciona
        if (coordinatorLike) {
            if (coordinatorLike === "0") {
                await models.Like.destroy({
                    where: {
                        room_id: roomId,
                        from_id: room.consultant_id,
                        to_id: room.coordinator_id
                    }
                });
            } else {
                const existingCoordinatorVote = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.coordinator_id } });
                if (existingCoordinatorVote) {
                    await models.Like.update({ value: coordinatorLike }, {
                        where: {
                            room_id: roomId,
                            from_id: room.consultant_id,
                            to_id: room.coordinator_id
                        }
                    });
                } else {
                    const availableId = await findAvailableLikeId();
                    await models.Like.create({
                        id: availableId,
                        room_id: roomId,
                        from_type: 'Consultant',
                        to_type: 'Coordinator',
                        from_id: room.consultant_id,
                        to_id: room.coordinator_id,
                        value: coordinatorLike
                    });
                }
            }
        }

        // Actualizar la puntuación del operador si se proporciona
        if (operatorLike) {
            if (operatorLike === "0") {
                await models.Like.destroy({
                    where: {
                        room_id: roomId,
                        from_id: room.consultant_id,
                        to_id: room.operator_id
                    }
                });
            } else {
                const existingOperatorVote = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.operator_id } });
                if (existingOperatorVote) {
                    await models.Like.update({ value: operatorLike }, {
                        where: {
                            room_id: roomId,
                            from_id: room.consultant_id,
                            to_id: room.operator_id
                        }
                    });
                } else {
                    const availableId = await findAvailableLikeId();
                    await models.Like.create({
                        id: availableId,
                        room_id: roomId,
                        from_type: 'Consultant',
                        to_type: 'Operator',
                        from_id: room.consultant_id,
                        to_id: room.operator_id,
                        value: operatorLike
                    });
                }
            }
        }

        // Actualizar la puntuación del técnico si se proporciona
        if (technicianLike) {
            if (technicianLike === "0") {
                await models.Like.destroy({
                    where: {
                        room_id: roomId,
                        from_id: room.consultant_id,
                        to_id: room.technician_id
                    }
                });
            } else {
                const existingTechnicianVote = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.technician_id } });
                if (existingTechnicianVote) {
                    await models.Like.update({ value: technicianLike }, {
                        where: {
                            room_id: roomId,
                            from_id: room.consultant_id,
                            to_id: room.technician_id
                        }
                    });
                } else {
                    const availableId = await findAvailableLikeId();
                    await models.Like.create({
                        id: availableId,
                        room_id: roomId,
                        from_type: 'Consultant',
                        to_type: 'Technician',
                        from_id: room.consultant_id,
                        to_id: room.technician_id,
                        value: technicianLike
                    });
                }
            }
        }

        // Iterar sobre los intérpretes y actualizar o eliminar los likes según corresponda
        for (const booth of room.boothsDetails) {
            for (const interpreter of booth.interpreters) {
                const interpreterLike = req.body[`interpreterLike_${interpreter.id}`];
                if (interpreterLike) {
                    if (interpreterLike === "0") {
                        await models.Like.destroy({
                            where: {
                                room_id: roomId,
                                from_id: room.consultant_id,
                                to_id: interpreter.id
                            }
                        });
                    } else {
                        const existingInterpreterVote = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: interpreter.id } });
                        if (existingInterpreterVote) {
                            await models.Like.update({ value: interpreterLike }, {
                                where: {
                                    room_id: roomId,
                                    from_id: room.consultant_id,
                                    to_id: interpreter.id
                                }
                            });
                        } else {
                            const availableId = await findAvailableLikeId();
                            await models.Like.create({
                                id: availableId,
                                room_id: roomId,
                                from_type: 'Consultant',
                                to_type: 'Interpreter',
                                from_id: room.consultant_id,
                                to_id: interpreter.id,
                                value: interpreterLike
                            });
                        }
                    }
                }
            }
        }


        // Redirigir de vuelta a la página de detalles de la sala
        res.redirect('/rooms/' + roomId + '/votes');
    } catch (error) {
        next(error);
    }
};

// DELETE /timeslot
exports.destroyTimeslot = async function (req, res, next) {
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