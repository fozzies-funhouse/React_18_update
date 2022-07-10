import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, checkoutCart } from '../store/cart';

import {
  Container,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  InputLabel,
  FormHelperText,
  Input,
} from '@mui/material';

import { stripeCheckout } from '../store/stripeCheckout';

import StripeContainer from './Stripe/StripeContainer';

export let exportTotal = 0;

function Checkout(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { getCart, cart, checkout, user } = props;
  const { cart_details } = cart;

  useEffect(() => {
    getCart(user.id);
  }, []);

  console.log('cart', cart);

  const [localState, setLocalState] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    address: user.address || '',
    zipCode: user.zipCode || '',
    city: user.city || '',
    state: user.state || '',
    phoneNumber: user.phoneNumber || '',
  });

  function handleChange(event) {
    setLocalState({
      [event.target.name]: event.target.value,
    });
  }

  const cartTotal =
    cart_details === undefined
      ? 0
      : cart_details.reduce((acc, item) => {
          const total = Math.round(
            parseFloat(item.product_quantity) * parseFloat(item.product.price)
          );
          acc += total;
          return acc;
        }, 0);

  exportTotal = cartTotal;

  return (
    <Container>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#808080',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        Secure Checkout
      </h1>
      <hr></hr>

      <Container>
        <Grid className="d-flex">
          <Card
            className="flex-fill"
            style={{
              width: '40rem',
              height: '50rem',
              color: '#4e4c4b',
              border: 'none',
            }}
          >
            <CardHeader className="text-center">Contact Information</CardHeader>
            <Grid>
              <FormGroup>
                <Grid>
                  <FormControl
                    type="text"
                    defaultValue={firstName}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="first-name">First Name</InputLabel>
                    <Input id="first-name" aria-describedby="first-name" />
                  </FormControl>
                  <FormControl
                    type="text"
                    defaultValue={lastName}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="last-name">Last Name</InputLabel>
                    <Input id="last-name" aria-describedby="last-name" />
                  </FormControl>

                  <FormControl
                    name="email"
                    type="text"
                    defaultValue={email}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" aria-describedby="email" />
                  </FormControl>
                  <FormControl
                    type="text"
                    defaultValue={phoneNumber}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <Input id="phoneNumber" aria-describedby="Phone Number" />
                  </FormControl>
                  <FormControl
                    type="text"
                    defaultValue={address}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" aria-describedby="address" />
                  </FormControl>
                  <FormControl
                    type="text"
                    defaultValue={city}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input id="city" aria-describedby="city" />
                  </FormControl>

                  <FormControl
                    type="text"
                    defaultValue={state}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Input id="state" aria-describedby="state" />
                  </FormControl>
                  <FormControl
                    type="text"
                    defaultValue={zipCode}
                    onChange={handleChange}
                  >
                    <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
                    <Input id="zipcode" aria-describedby="zipcode" />
                  </FormControl>
                </Grid>
              </FormGroup>
              <Link to="/confirmation">
                <Button
                  variant="primary"
                  className="mt-auto"
                  style={{
                    width: '100%',
                    bottom: 0,
                  }}
                  onClick={() => checkout(cartTotal, user.id, localState.email)}
                >
                  Submit Purchase Order
                </Button>
              </Link>
            </Grid>
            <StripeContainer />
          </Card>
          <Card
            className="flex-fill"
            style={{
              width: '40rem',
              marginLeft: '5rem',
              color: '#4e4c4b',
              border: 'none',
            }}
          >
            <CardHeader title={`Order Total: ${cartTotal}`}></CardHeader>
            <Typography>Your Order</Typography>
            {cart_details === undefined
              ? 'Cart Empty'
              : cart_details.map((item) => (
                  <Container key={item.id}>
                    <CardMedia
                      component="img"
                      image={item.product.image_url}
                      style={{ height: '250px' }}
                      fluid="true"
                    />
                    <li>{item.product.name}</li>
                    <li>
                      Qty: {item.product_quantity} @ ${item.product.price}
                    </li>
                    <hr></hr>
                  </Container>
                ))}
          </Card>
        </Grid>
      </Container>
    </Container>
  );
}

const mapState = (state) => ({
  cart: state.cart,
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  checkout: (orderTotal, userId, email) =>
    dispatch(checkoutCart(orderTotal, userId, email)),
  stripeCheckout: () => dispatch(stripeCheckout()),
});

export default connect(mapState, mapDispatch)(Checkout);
