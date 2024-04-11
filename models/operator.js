// models/operator.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Operator extends Model { }

// Model initiation
Operator.init(
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
    modelName: 'Operator',
    timestamps: false,
  }
);

// Model export
module.exports = Operator;