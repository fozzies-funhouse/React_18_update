const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('carts', {
  cartEmpty: {
    type: Sequelize.BOOLEAN,
  }
})

module.exports = Cart;
