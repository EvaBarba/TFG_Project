// models/languageknown.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./interpreter');
const Language = require('./language');

// Model definition
class Languageknown extends Model { }

// Model initiation
Languageknown.init(
    {
        interpreter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        language_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Language,
                key: Language.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'Languageknown',       
        timestamps: false,
    }
);

// Model export
module.exports = Languageknown;