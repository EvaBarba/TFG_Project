// models/booth.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Room = require('./room');

// Model definition
class Booth extends Model { }

// Model initiation
Booth.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        language: {
            type: DataTypes.STRING
        },
        language_a: {
            type: DataTypes.STRING
        },
        signs: {
            type: DataTypes.BOOLEAN
        },
        deaf: {
            type: DataTypes.BOOLEAN
        },
        single: {
            type: DataTypes.BOOLEAN
        },
        speech_to_text: {
            type: DataTypes.BOOLEAN
        },
        
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Room,
                key: Room.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'Booth',
        timestamps: false,
    }
);

// Model export
module.exports = Booth;