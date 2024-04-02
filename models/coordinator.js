// models/roles/coordinator.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Coordinator extends Model { }

// Model initiation
Coordinator.init(
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
    modelName: 'Coordinator',
    timestamps: false,
  }
);

// Model export
module.exports = Coordinator;