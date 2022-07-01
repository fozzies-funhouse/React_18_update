const {
  models: { Product, Cart, CartDetail },
} = require('../db');
const router = require('express').Router();
const { requireToken, findCartDetail } = require('./GateKeepingMiddleWare');

// GET /api/carts/getCart
router.get('/getCart', requireToken, async (req, res, next) => {
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

// POST /api/carts/:productId
router.post(
  '/:productId',
  requireToken,
  findCartDetail,
  async (req, res, next) => {
    try {
      if (req.foundDetail.length === 0) {
        const createCartDetail = await CartDetail.create({
          product_quantity: 1,
          productId: req.params.productId,
        });
        const cart = await Cart.findOne({
          where: { userId: req.user.id },
        });
        const addToCart = await cart.addCart_detail(createCartDetail);
        await cart.update(addToCart);
        await cart.update({ cartEmpty: false });
        const newCart = await Cart.findOne({
          where: { userId: req.user.id },
        });
        res.json(newCart);
      } else {
        await req.foundDetail[0].update({
          product_quantity: req.foundDetail[0].product_quantity + 1,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/carts
router.put('/', requireToken, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: { model: CartDetail, include: { model: Product } },
    });

    const cartItem = await cart.getCart_details({
      where: { productId: productId },
    });
    const singleCartItem = cartItem[0];

    //product_quantity is hardcoded. Need to update
    await singleCartItem.update({
      product_quantity: quantity,
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/carts/:productId
router.delete('/:productId', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });
    const cartItem = await cart.getCart_details({
      where: { productId: req.params.productId },
    });

    await cartItem[0].destroy();
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
