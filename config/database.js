// config/database.js

const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'mysql',
  define: {
    underscored: true,
  },
});

module.exports = sequelize;