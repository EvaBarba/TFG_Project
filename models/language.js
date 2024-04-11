// models/language.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model definition
class Language extends Model {}

// Model initiation
Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    language_from: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language_to: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Language',
    timestamps: false,
  }
);

// Add a hook to validate that language_from and language_to are not equal
Language.beforeSave(async (language, options) => {
  if (language.language_from === language.language_to) {
    throw new Error('Language_from and language_to cannot be equal.');
  }
});

// Model export
module.exports = Language;
