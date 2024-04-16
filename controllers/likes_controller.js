// controllers/likes_controller.js

var models = require('../models');
var Sequelize = require('sequelize');


// GET likes
// GET likes
exports.getLikes = async function (req, res, next) {
    try {
        const roomId = req.params.roomId;
        const room = await models.Room.findByPk(roomId, {
            include: [
                { model: models.Consultant, as: 'consultantOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Coordinator, as: 'coordinatorOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Operator, as: 'operatorOfRoom', include: { model: models.User, as: 'User' } },
                { model: models.Technician, as: 'technicianOfRoom', include: { model: models.User, as: 'User' } },
                {
                    model: models.Booth, as: 'boothsDetails', include: {
                        model: models.Interpreter,
                        as: 'interpreters',
                        include: { model: models.User, as: 'User' }
                    }
                },
            ]
        });

        const likeOfCoordinator = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.coordinator_id } });
        const likeOfOperator = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.operator_id } });
        const likeOfTechnician = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.technician_id } });

        // Recopilar los likes de los intérpretes para la sala actual
        const interpreterLikes = [];
        for (const booth of room.boothsDetails) {
            for (const interpreter of booth.interpreters) {
                const like = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: interpreter.id } });
                interpreterLikes.push({ interpreter, like });
            }
        }

        res.render('rooms/votes/index', { room, likeOfCoordinator, likeOfOperator, likeOfTechnician, interpreterLikes });
    } catch (error) {
        next(error);
    }
};




// GET /likes Edit
exports.editLikes = async function (req, res, next) {
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

        const likeOfCoordinator = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.coordinator_id } });
        const likeOfOperator = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.operator_id } });
        const likeOfTechnician = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: room.technician_id } });

        // Recopilar los likes de los intérpretes para la sala actual
        const interpreterLikes = [];
        for (const booth of room.boothsDetails) {
            for (const interpreter of booth.interpreters) {
                const like = await models.Like.findOne({ where: { room_id: roomId, from_id: room.consultant_id, to_id: interpreter.id } });
                interpreterLikes.push({ interpreter, like });
            }
        }

        res.render('rooms/votes/edit', { room, likeOfCoordinator, likeOfOperator, likeOfTechnician, interpreterLikes });
    } catch (error) {
        next(error);
    }
};



// PUT /likes
exports.updateLikes = async function (req, res, next) {
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


async function findAvailableLikeId() {
    // Encuentra el primer ID disponible que no está en uso
    let id = 1;
    while (true) {
        const like = await models.Like.findOne({ where: { id: id } });
        if (!like) {
            return id;
        }
        id++;
    }
}