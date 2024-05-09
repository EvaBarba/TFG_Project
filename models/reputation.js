// models/reputation.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./interpreter');

// Model definition
class Reputation extends Model { }

// Model initiation
Reputation.init(
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
    value: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    modelName: 'Reputation',
    timestamps: false,
  }
);

// Model export
module.exports = Reputation;