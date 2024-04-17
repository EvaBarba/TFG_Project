// models/timeslot.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./interpreter');

// Model definition
class Timeslot extends Model { }

// Model initiation
Timeslot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        interpreter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        dayOfWeek: {
            type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Timeslot',
        timestamps: false,
    }
);

// Model export
module.exports = Timeslot;