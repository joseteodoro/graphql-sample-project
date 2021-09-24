const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const Ticket = require('./Ticket');

module.exports = {
  Ticket: Ticket.init(sequelize, Sequelize),
};
