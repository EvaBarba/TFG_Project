// models/client.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class Client extends Model { }

// Model initiation
Client.init(
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
    modelName: 'Client',
    timestamps: false,
  }
);

// Model export
module.exports = Client;