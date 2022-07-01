const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_total: {
    type: Sequelize.FLOAT,
  },
  order_status: {
    type: Sequelize.BOOLEAN,
  },
  email: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
