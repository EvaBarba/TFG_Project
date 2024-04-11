// models/interpreter.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Interpreter extends Model { }

// Model initiation
Interpreter.init(
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

    // Languages (PENIENTE)

  },
  {
    sequelize,
    modelName: 'Interpreter',
    timestamps: false,
  }
);

// Model export
module.exports = Interpreter;