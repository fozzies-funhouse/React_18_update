const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  type: {
    type: Sequelize.ENUM('snowboard', 'ski', 'shoe'),
    defaultValue: 'shoe',
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 },
  },
  image_url: {
    type: Sequelize.TEXT,
  },
  model_url: {
    type: Sequelize.TEXT,
  }
});

module.exports = Product;
