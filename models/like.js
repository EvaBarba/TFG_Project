// models/like.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Room = require('./room');

// Model definition
class Like extends Model { }

// Model initiation
Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        details: {
            type: DataTypes.TEXT,
        },
        from_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        from_type: {
            type: DataTypes.ENUM('Consultant', 'Coordinator', 'Operator', 'Technician'),
            allowNull: false
        },
        to_type: {
            type: DataTypes.ENUM('Consultant', 'Coordinator', 'Operator', 'Technician'),
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Room,
                key: 'id',
            },
        }
    },
    {
        sequelize,
        modelName: 'Like',
        timestamps: false,
    }
);

// Model export
module.exports = Like;