import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, checkoutCart } from '../store/cart';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { stripeCheckout } from "../store/stripeCheckout";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      zipCode: '',
      city: '',
      state: '',
      phoneNumber: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  handleChange(event) {
    // console.log('event target name', event.target.name);
    // console.log('event value', event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { firstName, lastName, address, zipCode, email } = this.state;
    const { city, state, phoneNumber } = this.state;
    const { cart, checkout, user, stripeCheckout } = this.props;
    const { cart_details } = cart;
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
        <h3 style={{ color: '#876218', marginBottom: '2rem' }}>
          Sign in to use your saved info and save time!
        </h3>
        <Container>
          <CardGroup>
            <Col className='d-flex'>
              <Card
                className='flex-fill'
                style={{
                  width: '40rem',
                  height: '30rem',
                  color: '#4e4c4b',
                  border: 'none',
                }}
              >
                <Card.Title className='text-center'>
                  Contact Information
                </Card.Title>
                <Form>
                  <Form.Group>
                    <Col style={{ width: '16rem' }}>
                      <Form.Label htmlFor='firstName'>First Name</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={firstName}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Col style={{ width: '16rem' }}>
                      <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={lastName}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Row>
                      <Form.Label htmlFor='email'>Email</Form.Label>
                      <Form.Control
                        name='email'
                        type='text'
                        defaultValue={email}
                        onChange={this.handleChange}
                      ></Form.Control>
                      <Form.Label htmlFor='lastName'>Address</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={address}
                        onChange={this.handleChange}
                      ></Form.Control>
                      <Form.Label htmlFor='zipCode'>ZIP Code</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={zipCode}
                        onChange={this.handleChange}
                      ></Form.Control>
                      <Form.Label htmlFor='lastName'>State</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={state}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Row>
                  </Form.Group>
                </Form>
                <Link to='/confirmation'>
                  <Button
                    variant='primary'
                    className='mt-auto'
                    style={{
                      width: '40rem',
                      position: 'absolute',
                      bottom: 0,
                    }}
                    onClick={() =>
                      checkout(cartTotal, user.id, this.state.email)
                    }
                  >
                    Submit Purchase Order
                  </Button>
                </Link>
                {/* RYAN'S STRIPE TEST BELOW
                <Card>
                  <Button onClick={() => {stripeCheckout()}}>TO STRIPE PAYMENT</Button>
                </Card> */}
              </Card>
              <Card
                className='flex-fill'
                style={{
                  width: '40rem',
                  marginLeft: '5rem',
                  color: '#4e4c4b',
                  border: 'none',
                }}
              >
                <Card.Title>Order Total: ${cartTotal}</Card.Title>
                <Card.Text>Your Order</Card.Text>
                {cart_details === undefined
                  ? 'Cart Empty'
                  : cart_details.map((item) => (
                      <Container key={item.id}>
                        <Image
                          src={item.product.image_url}
                          style={{ height: '250px' }}
                          fluid='true'
                        />
                        <li>{item.product.name}</li>
                        <li>
                          Qty: {item.product_quantity} @ ${item.product.price}
                        </li>
                        <hr></hr>
                      </Container>
                    ))}
              </Card>
            </Col>
          </CardGroup>
        </Container>
      </Container>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  checkout: (orderTotal, userId, email) => dispatch(checkoutCart(orderTotal, userId, email)),
  stripeCheckout: () => dispatch(stripeCheckout()),
});

export default connect(mapState, mapDispatch)(Checkout);
