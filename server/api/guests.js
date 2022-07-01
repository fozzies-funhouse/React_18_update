const router = require("express").Router();

const {
  models: { Product, Cart, CartDetail, Order },
} = require("../db");

// POST /api/guests/checkout - route for guest cart checkout
router.post("/checkout", async (req, res, next) => {
  try {
    const { orderTotal, cartDetailsArr, email } = req.body;

    const order = await Order.create({
      order_total: orderTotal,
      order_status: true,
      email: email,
    });

    const dbCartDetailsArr = cartDetailsArr.map(async (item) => {
      let cartDetRow = await CartDetail.findOne({
        where: { id: item.id },
      });
      await order.addCart_detail(cartDetRow);
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// POST /api/guests/cart/:productId - route for guests to add item to localStorage cart
router.post("/cart/:productId", async (req, res, next) => {
  try {
    if (req.body.cartDetailExists) {
      console.log('***THIS IS REQ BODY', req.body.cartDetailExists['0'].id);
      console.log('***THIS IS TYPE OF REQ BODY', typeof req.body.cartDetailExists['0'].id);

      const cartId = req.body.cartDetailExists['0'].id

      const cartDetailIncrement = await CartDetail.findByPk(cartId);
      
      console.log("GETTING PAST CARTDETAILS INCREMENT");
      if (cartDetailIncrement) {
        cartDetailIncrement.update({
          product_quantity: cartDetailIncrement.product_quantity + 1,
        });
        res.json(cartDetailIncrement);
      }
    } else {
      const createCartDetail = await CartDetail.create({
        product_quantity: 1,
        productId: req.params.productId,
      });

      const cartDetailwithProd = await CartDetail.findOne({
        where: { id: createCartDetail.id },
        include: { model: Product },
      });
      res.json(cartDetailwithProd);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/guests/cart - route to delete cart detail from guest cart
router.put("/cart", async (req, res, next) => {
  try {
    const { cartDetailsArr, productId, quantity } = req.body;
    let cartDetailToUpd;
    cartDetailsArr.map(async (item) => {
      if (item.product.id === parseInt(productId)) {
        cartDetailToUpd = await CartDetail.findByPk(item.id);
        await cartDetailToUpd.update({
          product_quantity: parseInt(quantity),
        });
      }
    });
    res.json(cartDetailToUpd);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/guests/cart/:productId - route to delete cart detail from guest cart
router.delete("/cart/:productId", async (req, res, next) => {
  try {
    const cartDetailsArr = req.body;
    let cartDetailToDestr;
    cartDetailsArr.map(async (item) => {
      if (item.product.id === parseInt(req.params.productId)) {
        cartDetailToDestr = await CartDetail.findByPk(item.id);
        await cartDetailToDestr.destroy();
      }
    });
    res.json(cartDetailToDestr);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
