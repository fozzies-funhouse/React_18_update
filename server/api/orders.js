const {
  models: { Cart, Order, CartDetail },
} = require('../db');
const router = require('express').Router();
const { requireToken } = require('./GateKeepingMiddleWare');
//POST /api/orders

//the order_status needs a front-end timer (7 days = 1000 * 60 * 60 * 24 * 7) this timer will change it to true (delivered)
router.post('/', requireToken, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      order_total: req.body.orderTotal,
      order_status: false,
      email: req.body.email,
    });

    const cart = await Cart.findOne({ where: { userId: req.user.id }, include: CartDetail });

    //create the association between cart_details and order
    const cartDetails = await cart.getCart_details();
    await order.addCart_details(cartDetails);

    //removes the association between cart and cart_details
    await cart.removeCart_details(cartDetails);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/orders/:productId
router.delete('/:productId', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, order_status: false },
    });
    const orderItem = await order.getCart_details({
      where: { productId: req.params.productId },
    });

    await orderItem[0].destroy();
    res.send(orderItem);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
