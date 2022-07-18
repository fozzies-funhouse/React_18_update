import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCart, checkoutCart } from '../store/cart';

import {
  Container,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Collapse,
} from '@mui/material';

import { stripeCheckout } from '../store/stripeCheckout';

import StripeContainer from './Stripe/StripeContainer';

function Checkout(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { getCart, cart, checkout, user, history } = props;
  const { cart_details } = cart;

  const [expanded, setExpanded] = useState(false);
  const [payExpanded, setPayExpanded] = useState(false);
  useEffect(() => {
    getCart(user.id);
  }, []);

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

  const stripeProps = {
    checkout: checkout,
    cartTotal: cartTotal,
    userID: user.id,
    email: localState.email,
    history: history,
  };

  return (
    <Container style={{ minHeight: '90vh' }}>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Order Total: ${cartTotal}
      </h1>
      <hr></hr>
      <Grid container id="orders-and-form">
        <Grid container id="form-data-and-stripe">
          <Grid container id="first-and-last-name" spacing={{ xs: 2, md: 10 }}>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth={true}
                type="text"
                value={firstName}
                onChange={handleChange}
              >
                <InputLabel htmlFor="first-name">First Name</InputLabel>
                <Input
                  id="first-name"
                  aria-describedby="first-name"
                  variant="outlined"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                type="text"
                fullWidth={true}
                value={lastName}
                onChange={handleChange}
              >
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input id="last-name" aria-describedby="last-name" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container id="email-and-phone" spacing={{ xs: 2, md: 10 }}>
            <Grid item xs={12} md={6}>
              <FormControl
                name="email"
                fullWidth={true}
                type="text"
                value={email}
                onChange={handleChange}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" aria-describedby="email" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth={true}
                type="text"
                vakue={phoneNumber}
                onChange={handleChange}
              >
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <Input id="phoneNumber" aria-describedby="Phone Number" />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl
            type="text"
            value={address}
            onChange={handleChange}
            fullWidth={true}
          >
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input id="address" aria-describedby="address" />
          </FormControl>
          <Grid container id="city-state-zipcode" spacing={{ xs: 2, md: 10 }}>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth={true}
                type="text"
                value={city}
                onChange={handleChange}
              >
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" aria-describedby="city" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth={true}
                type="text"
                value={state}
                onChange={handleChange}
              >
                <InputLabel htmlFor="state">State</InputLabel>
                <Input id="state" aria-describedby="state" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth={true}
                type="text"
                value={zipCode}
                onChange={handleChange}
              >
                <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
                <Input id="zipcode" aria-describedby="zipcode" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              margin: '1rem',
            }}
          >
            <h1
              style={{
                alignSelf: 'center',
              }}
              onClick={() => setPayExpanded(!payExpanded)}
            >
              {!payExpanded ? 'Pay For Your Order' : 'Hide Credit Card Details'}
            </h1>
          </Grid>
          <Collapse in={payExpanded} style={{ width: '100%' }}>
            <Container>
              <StripeContainer stripeProps={stripeProps} />
            </Container>
          </Collapse>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: 'none',
            width: '100%',
            margin: '2rem',
          }}
        >
          <h1
            style={{
              backgroundColor: '#a8a8a8',

              alignSelf: 'center',
            }}
            onClick={() => setExpanded(!expanded)}
          >
            {!expanded ? 'View Your Order' : 'Close Order Review'}
          </h1>
          <Collapse in={expanded}>
            {cart_details === undefined
              ? 'Cart Empty'
              : cart_details.map((item) => (
                  <Container
                    key={item.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.product.image_url.slice(7)}
                      style={{ height: 'auto', maxWidth: '60%' }}
                      fluid="true"
                    />
                    <h5>{item.product.name}</h5>
                    <li>
                      Qty: {item.product_quantity} @ ${item.product.price}
                    </li>
                    <hr></hr>
                  </Container>
                ))}
          </Collapse>
        </Grid>
      </Grid>
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
