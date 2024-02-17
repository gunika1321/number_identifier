const Sequelize = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(
  config.MYSQL.database,
  config.MYSQL.username,
  config.MYSQL.password,
  {
    host: config.MYSQL.host,
    dialect: config.MYSQL.dialect,
  }
);

module.exports = sequelize;