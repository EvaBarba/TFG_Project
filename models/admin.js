// models/roles/admin.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model definition
class Admin extends Model {}

// Model initiation
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    superadmin: {
        type: DataTypes.BOOLEAN
    },
    educational: {
        type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'Admin',
    timestamps: false,
  }
);

// Model export
module.exports = Admin;