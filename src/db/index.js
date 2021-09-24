const sequelize = require('./sequelize');
const models = require('./models');

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = { sequelize, models };
