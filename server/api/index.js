const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/carts', require('./carts'));
router.use('/orders', require('./orders'));
// Ryan created new guest routes below (dont require token...)
router.use('/guests', require('./guests'));
// router.use('/stripe', require('./stripeCheckout'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
