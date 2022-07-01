/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import axios from "axios";

// Action Types
const GET_CART = "GET_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const CHECKOUT_CART = "CHECKOUT_CART";

// Action Creators
const setCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _removeItem = (cart) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    cart,
  };
};

const _checkoutCart = (cart) => {
  return {
    type: CHECKOUT_CART,
    cart,
  };
};

// Thunk Creators

//GET SINGLE CART
export const fetchCart = (userId) => async (dispatch) => {
  try {
    // logic for if customer is a guest & not logged in...
    if (!userId) {
      window.localStorage.cart
        ? dispatch(setCart(JSON.parse(window.localStorage.getItem("cart"))))
        : window.localStorage.setItem(
            "cart",
            JSON.stringify({ cart_details: [] })
          );
      dispatch(setCart(JSON.parse(window.localStorage.getItem("cart"))));
    } else {
      // original logic for if customer is logged in to fest & set cart...
      const { data: cart } = await axios.get("/api/carts/getCart");
      cart.cart_details.sort((a, b) => a.id - b.id);
      dispatch(setCart(cart));
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateCart = (quantity, productId, userId) => async (dispatch) => {
  try {
    if(!userId){
      // logic for guests cart update
      // pull localStorage cart
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      let cartDetailsArr = cart.cart_details;
      // updates item in db
      await axios.put(`/api/guests/cart`, {cartDetailsArr, productId, quantity});
      // map throught cartDetailsArr in loc storage to find matching productId and set equal to quantity
      cartDetailsArr.map((item) => {
        if (item.product.id === parseInt(productId)) {
          item.product_quantity = parseInt(quantity);
        }
      });
      // seting the new cart in local storage
      const newCartJSON = JSON.stringify(cart);
      window.localStorage.setItem("cart", newCartJSON);

      dispatch(setCart(cart));
    } else {
      // logic for logged in users
      await axios.put(`/api/carts`, {
        productId,
        quantity,
      });
      dispatch(fetchCart(userId));
    }
  } catch (err) {
    console.error(err);
  }
};

//DELETE SINGLE CART (ALL QUANTITY)
export const removeItem = (productId, userId) => {
  return async (dispatch) => {
    try {
      if (!userId) {
        // logic for delete item for guests
        // pull localStorage cart
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        let cartDetailsArr = cart.cart_details;
        // deletes item from db
        await axios.delete(`/api/guests/cart/${productId}`, {data: cartDetailsArr});
        // editing cart details arr and mutating it - in the front end/local storage
        const newCartArr = cartDetailsArr.filter((item) => {
          return item.product.id !== productId;
        });
        cart.cart_details = newCartArr;
        // seting the new cart in local storage
        const newCartJSON = JSON.stringify(cart);
        window.localStorage.setItem("cart", newCartJSON);

        dispatch(setCart(cart));
      } else {
        // logic to delete item from cart if user is logged in...
        const data = await axios.delete(`/api/carts/${productId}`);
        dispatch(_removeItem(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

// CHECKOUT CART
export const checkoutCart = (orderTotal, userId, email) => {
  return async (dispatch) => {
    try {
      if(!userId){
        // logic for guest checkout
        // pull localStorage cart
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        let cartDetailsArr = cart.cart_details;
        // axios call to post order to Order table and take care of associations
        await axios.post(`/api/guests/checkout`, {orderTotal, cartDetailsArr, email});
        // clear localstorage cart & cleared cart from redux store
        window.localStorage.removeItem('cart');
        dispatch(setCart({}));
      } else {
        // logic for logged in user
        const { data } = await axios.post("/api/orders", {orderTotal, email});
        dispatch(_checkoutCart(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

/*
 *Reducer
 **/
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case REMOVE_ITEM_FROM_CART:
      const actionProduct = action.cart.data.find((product) => product);
      const cart_details = state.cart_details.filter(
        (product) => product.id !== actionProduct.id
      );
      return { ...state, cart_details };
    case CHECKOUT_CART:
      return action.cart;
    default:
      return state;
  }
}
