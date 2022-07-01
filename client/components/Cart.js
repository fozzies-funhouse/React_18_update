import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem, updateCart } from '../store/cart';
import {
  Container,
  Modal,
  CloseButton,
  Button,
  Form,
  Image,
} from 'react-bootstrap';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      isShowing: false,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // Ryan added changes below...
    // passing in this.props.user.id for determination if guest or logged in user
    this.props.getCart(this.props.user.id);
  }

  changeQuantity(evt) {
    this.setState({ productId: evt.target.id });
    this.props.updateCart(evt.target.value, evt.target.id, this.props.user.id);
  }

  openModal() {
    this.setState({ ...this.state, isShowing: true });
  }

  closeModal() {
    this.setState({ ...this.state, isShowing: false });
  }

  render() {
    const { cart, removeItemFromCart, user } = this.props;
    const { cart_details } = cart;
    return (
      <div>
        <button
          variant="primary"
          style={{ backgroundColor: 'transparent', border: 'none' }}
          onMouseDown={async () => {
            await this.props.getCart(user.id);
          }}
          onMouseUp={this.openModal}
        >
          🛒
        </button>
        <Modal show={this.state.isShowing} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#4e4c4b' }}>
              Shopping Cart
            </Modal.Title>
          </Modal.Header>
          {cart_details === undefined
            ? 'Cart Empty'
            : cart_details.length === 0
            ? 'Cart Empty'
            : cart_details.map((item) => (
                <Container key={item.id}>
                  <Modal.Body>
                    <CloseButton
                      style={{
                        position: 'absolute',
                        right: '1.3rem',
                        top: '1.2rem',
                      }}
                      onClick={() =>
                        removeItemFromCart(item.product.id, user.id)
                      }
                    />
                    <Image
                      style={{ height: '250px' }}
                      src={item.product.image_url}
                      fluid="true"
                    ></Image>
                    <p className="mt-2">{item.product.name}</p>
                    <li>${item.product.price}</li>
                    <li>Qty: {item.product_quantity}</li>
                    <Form.Select
                      className="mt-2"
                      style={{ width: '150px' }}
                      name="quanity"
                      id={item.product.id}
                      onChange={this.changeQuantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Form.Select>
                    <hr></hr>
                  </Modal.Body>
                </Container>
              ))}
          <Modal.Footer>
            <Link to="/checkout">
              <Button
                variant="secondary"
                style={{ width: '20rem', marginRight: '5rem' }}
                onClick={this.closeModal}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

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
