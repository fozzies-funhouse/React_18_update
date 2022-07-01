//this is the access point for all things database related!
const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const CartDetail = require('./models/CartDetail');
const Cart = require('./models/Cart');
const Tag = require('./models/Tag');

//associations could go here!
User.hasOne(Cart);
Cart.belongsTo(User);

Product.hasOne(CartDetail);
CartDetail.belongsTo(Product);

Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);

Order.hasMany(CartDetail);
CartDetail.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

const productTags = db.define('productTags');

Tag.belongsToMany(Product, { through: productTags });
Product.belongsToMany(Tag, { through: productTags });

//User is created and assigned a cart
const createAndAssignCart = async (user) => {
  const cart = await Cart.create({ cartEmpty: true });
  await user.setCart(cart);
  const orders = await Order.findAll({ where: { email: user.email } });

  user.addOrders(orders);
};

User.afterCreate(createAndAssignCart);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    CartDetail,
    Cart,
    Tag,
    productTags
  },
};
