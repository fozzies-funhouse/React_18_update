import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, authenticate } from "../store";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import Cart from "./Cart";
import { fetchCart } from "../store/cart";

const Navigation = ({ handleLogout, isLoggedIn, createGuestCart, user }) => (
  <Navbar bg="light" variant="light" sticky="top">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Trekkies Snowboard & Skis
      </Navbar.Brand>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Nav>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/" href="#" onClick={handleLogout}>
              logout
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Cart />
              <Form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5rem",
                }}
              >
                <Form.Control type="text"></Form.Control>
                <Button variant="secondaray">Search</Button>
              </Form>
            </Nav.Item>
          </Nav>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              onClick={() => createGuestCart()}
            >
              Products
            </Nav.Link>
            <Nav.Item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Cart />
            </Nav.Item>
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5rem",
              }}
            >
              <Form.Control type="text"></Form.Control>
              <Button variant="secondaray">Search</Button>
            </Form>
          </Nav>
        </div>
      )}
    </Container>
  </Navbar>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

// const mapState = (state) => ({
//   isLoggedIn: !!state.auth.id,
//   user: state.auth,
// });

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
    createGuestCart() {
      if (!window.localStorage.cart) {
        window.localStorage.setItem(
          "cart",
          JSON.stringify({ cart_details: [] })
        );
      }
    },
    // createGuestCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Navigation);
