import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem, updateCart } from '../store/cart';
import { style, selectOptions, cartTotal } from './CartDrawer/utils';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = (props) => {
  const { getCart, user, updateCart, cart, removeItemFromCart } = props;
  const [productId, setProductId] = useState(0);
  const [isShowing, setIsShowing] = useState(false);

  const changeQuantity = (evt) => {
    setProductId(evt.target.id);
    updateCart(evt.target.value, evt.target.id, user.id);
  };
  const openDrawer = () => setIsShowing(true);
  const closeDrawer = () => setIsShowing(false);
  const disabledLink = cartTotal(cart) === 0 ? "disabled-link" : "";

  return (
    <div>
      <button
        style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
        onMouseDown={async () => {
          await getCart(user.id);
        }}
        onMouseUp={openDrawer}
      >
       <ShoppingCartIcon />
      </button>
      <Drawer open={isShowing} anchor='right' onClose={closeDrawer}>
        <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
          Subtotal ${cartTotal(cart)}
        </Typography>
        {cart.cart_details === undefined || cart.cart_details.length === 0 ? (
          <Typography variant='h6' sx={{ textAlign: 'center' }}>
            Your cart is empty
          </Typography>
        ) : (
          cart.cart_details.map((item) => (
            <Container key={item.id}>
              <button
                style={style.button.closeButton}
                onClick={() => removeItemFromCart(item.product.id, user.id)}
              >
                &#10060;
              </button>
              <img src={item.product.image_url.slice(7)} style={style.image}></img>
              <p>{item.product.name}</p>
              <li>${item.product.price}</li>
              <li>Qty: {item.product_quantity}</li>
              <select
                style={style.select}
                id={String(item.product.id)}
                onChange={changeQuantity}
                name='quanity'
                defaultValue={item.product_quantity}
              >
                {selectOptions.map((ele, idx) => (
                  <option value={idx} key={idx}>
                    {idx}
                  </option>
                ))}
              </select>
              <hr></hr>
            </Container>
          ))
        )}
        <Container onClick={closeDrawer}>
          <Link className={disabledLink} to='/checkout' >
            <Button sx={{ mt: 1, mb: 3 }} variant='contained'>
              {cartTotal(cart) === 0 ? "Keep Shopping" : "Proceed to Checkout"}
            </Button>
          </Link>
        </Container>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // expanded to better see states being tracked...
  cart: state.cart,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  // modified getCart, removeItemFromCart - passing in this.props.user.id for determination if guest or logged in user
  getCart: (userId) => dispatch(fetchCart(userId)),
  removeItemFromCart: (productId, userId) =>
    dispatch(removeItem(productId, userId)),
  updateCart: (productId, productQuantity, userId) =>
    dispatch(updateCart(productId, productQuantity, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
