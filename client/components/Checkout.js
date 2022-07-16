import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
  Collapse,
} from '@mui/material';

import { stripeCheckout } from '../store/stripeCheckout';

import StripeContainer from './Stripe/StripeContainer';
import { padding } from '@mui/system';

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

  const [expanded, setExpanded] = useState(false);

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

  const stripeProps = {
    checkout: checkout,
    cartTotal: cartTotal,
    userID: user.id,
    email: localState.email,
  };

  return (
    <Container>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          // color: '#808080',
        }}
      >
        Order Total: ${cartTotal}
      </h1>
      <hr></hr>
      <Grid container>
        <Grid item xs={12} style={{ maxHeight: 'auto', border: 'solid' }}>
          <Container>
            <Container
              sx={{
                md: {
                  maxWidth: '10%',
                  width: '20%',
                },
              }}
            >
              <FormControl
                sx={{
                  width: { xs: '100%', md: '40%' },
                  paddingRight: { md: '3rem' },
                  paddingBottom: '3rem',
                }}
                // fullWidth="true"
                type="text"
                defaultValue={firstName}
                onChange={handleChange}
              >
                <InputLabel htmlFor="first-name" margin="dense">
                  First Name
                </InputLabel>
                <Input
                  id="first-name"
                  aria-describedby="first-name"
                  variant="outlined"
                />
              </FormControl>
              <FormControl
                type="text"
                // fullWidth="true"
                sx={{ width: { xs: '100%', md: '45%' } }}
                margin="dense"
                defaultValue={lastName}
                onChange={handleChange}
              >
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input id="last-name" aria-describedby="last-name" />
              </FormControl>
            </Container>
            <Container
              sx={{
                md: {
                  display: 'flex',
                  flexDirection: 'row',
                },
              }}
            >
              <FormControl
                name="email"
                // fullWidth="true"
                sx={{
                  width: { xs: '100%', md: '45%' },
                  paddingRight: { md: '3rem' },
                  // padding: '3rem',
                }}
                type="text"
                defaultValue={email}
                onChange={handleChange}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  aria-describedby="email"
                  sx={{
                    maxWidth: '85%',
                  }}
                />
              </FormControl>
              <FormControl
                // fullWidth="true"
                type="text"
                sx={{ width: { xs: '100%', md: '45%' } }}
                defaultValue={phoneNumber}
                onChange={handleChange}
              >
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <Input id="phoneNumber" aria-describedby="Phone Number" />
              </FormControl>
            </Container>
            <FormControl
              sx={{
                width: { xs: '100%' },
                paddingRight: { md: '3rem' },
                paddingBottom: '3rem',
              }}
              type="text"
              defaultValue={address}
              onChange={handleChange}
            >
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input id="address" aria-describedby="address" />
            </FormControl>
            <FormControl
              // fullWidth="true"
              sx={{
                width: { xs: '100%', md: '40%' },
                paddingRight: { md: '3rem' },
              }}
              type="text"
              defaultValue={city}
              onChange={handleChange}
            >
              <InputLabel htmlFor="city">City</InputLabel>
              <Input id="city" aria-describedby="city" />
            </FormControl>

            <FormControl
              // fullWidth="true"
              type="text"
              defaultValue={state}
              onChange={handleChange}
            >
              <InputLabel htmlFor="state">State</InputLabel>
              <Input id="state" aria-describedby="state" />
            </FormControl>
            <FormControl
              // fullWidth="true"
              type="text"
              defaultValue={zipCode}
              onChange={handleChange}
            >
              <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
              <Input id="zipcode" aria-describedby="zipcode" />
            </FormControl>

            <StripeContainer stripeProps={stripeProps} />
          </Container>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: 'solid',
            width: '100%',
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
                    <li>{item.product.name}</li>
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
