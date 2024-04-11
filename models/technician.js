// models/technician.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Technician extends Model { }

// Model initiation
Technician.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: User.id,
      },
    },
  },
  {
    sequelize,
    modelName: 'Technician',
    timestamps: false,
  }
);

// Model export
module.exports = Technician;