const { requireToken } = require('./GateKeepingMiddleWare');
const router = require('express').Router();
const {
  models: { Product, Cart, Order, CartDetail },
} = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/snowboard
router.get('/snowboard', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: 'snowboard',
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/ski
router.get('/ski', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        type: 'ski',
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/getcart/
router.get('/getcart', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: { model: CartDetail, include: { model: Product } },
    });

    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singlProduct = await Product.findByPk(req.params.id);
    res.json(singlProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
