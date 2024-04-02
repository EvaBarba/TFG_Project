// models/boothassignment.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./interpreter');
const Booth = require('./booth');

// Model definition
class Boothassignment extends Model { }

// Model initiation
Boothassignment.init(
    {
        interpreter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        booth_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Booth,
                key: Booth.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'Boothassignment',       
        timestamps: false,
    }
);

// Model export
module.exports = Boothassignment;