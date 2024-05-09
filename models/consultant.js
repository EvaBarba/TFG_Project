// models/consultant.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Consultant extends Model { }

// Model initiation
Consultant.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    modelName: 'Consultant',
    timestamps: false,
  }
);

// Model export
module.exports = Consultant;