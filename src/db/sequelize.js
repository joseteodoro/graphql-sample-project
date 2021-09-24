const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.join(__dirname, '../../', 'database.sqlite3');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
});
