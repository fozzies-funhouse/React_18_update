const router = require('express').Router();
const {
  models: { User, Order, Product, CartDetail },
} = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./GateKeepingMiddleWare');
// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "first_name", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

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
