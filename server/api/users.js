const router = require('express').Router();
const e = require('express');
const { EqualDepth } = require('three');
const {
  models: { User, Order, Product, CartDetail },
} = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./GateKeepingMiddleWare');
// GET /api/users

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (req.auth) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'first_name', 'email'],
      });
    } else {
      const users = req.user;
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/newProduct', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (req.auth) {
      const { name, type, price, inventory, image_url, model_url } = req.body;

      const product = await Product.create({
        name,
        type,
        price,
        inventory,
        image_url,
        model_url,
      });

      res.send({ product });
    } else {
      res.send('sorry lizard people');
    }
  } catch (err) {
    next(err);
  }
});

router.put('/editProduct', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (req.auth) {
      const { name, type, price, inventory, image_url, model_url, productId } =
        req.body;

      const productToUpdate = Product.findByPk(productId);

      const editedProduct = await productToUpdate.update({
        name,
        type,
        price,
        inventory,
        image_url,
        model_url,
      });

      res.send(editedProduct);
    } else {
      res.send('is that you Luke?');
    }
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/deleteProduct',
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      if (req.auth) {
        const { productId } = req.body;
        const productToDelete = Product.findByPk(productId);
        deletedProduct = await Product;
      }
    } catch (err) {
      next(err);
    }
  }
);

//pull all single user orders
// /api/users/userOrders

router.get('/userOrders', requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { email: req.user.email },
      include: {
        model: CartDetail,
        include: { model: Product },
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
