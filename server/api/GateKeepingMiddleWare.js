const {
  models: { User, Cart, CartDetail },
} = require('../db');
const { Op } = require('sequelize');

const requireToken = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const findCartDetail = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });
    const searchedCartDetail = await CartDetail.findAll({
      where: {
        productId: req.params.productId,
        cartId: { [Op.eq]: cart.id },
      },
    });
    req.foundDetail = searchedCartDetail;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if(req.user.user_type === 'admin'){
      req.auth = true;
      next();
    }
    if(req.user.user_type !== 'admin'){
      req.auth = false;
      return res.status(403).send('You shall not pass!')
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  requireToken,
  findCartDetail,
  isAdmin,
};
