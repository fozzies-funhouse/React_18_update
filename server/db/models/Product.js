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
  description: {
    type: Sequelize.TEXT,
  },
  image_url: {
    type: Sequelize.STRING,
  },
  model_url: {
    type: Sequelize.STRING,
  },
  ratingsArray: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  rating: {
    type: Sequelize.VIRTUAL,
    get(){
      return (this.ratingsArray.reduce((a, b)=> (a+b)) / this.ratingsArray.length).toPrecision(2);
    },
    set(value){
      throw new Error("Do not set this value.  Instead manipulate ratingsArray.")
    }
  }
});

module.exports = Product;
