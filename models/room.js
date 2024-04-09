// models/room.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Technician = require('./technician');
const Operator = require('./operator');
const Coordinator = require('./coordinator');
const Consultant = require('./consultant');

// Model definition
class Room extends Model { }

// Model initiation
Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATE
        },
        language: {
            type: DataTypes.STRING
        },
        licode_room: {
            type: DataTypes.STRING
        },
        time_start: {
            type: DataTypes.TIME
        },
        time_finish: {
            type: DataTypes.TIME
        },
        place: {
            type: DataTypes.STRING
        },
        ai_enabled: {
            type: DataTypes.BOOLEAN
        },
        on_air: {
            type: DataTypes.STRING
        },
        educational: {
            type: DataTypes.BOOLEAN
        },
        zoom_url: {
            type: DataTypes.STRING
        },

        technician_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Technician,
                key: Technician.id,
            },
        },
        operator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Operator,
                key: Operator.id,
            },
        },
        coordinator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Coordinator,
                key: Coordinator.id,
            },
        },
        consultant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Consultant,
                key: Consultant.id,
            },
        },

        assigned_vrc: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Room',
        timestamps: false,
    }
);

// Model export
module.exports = Room;