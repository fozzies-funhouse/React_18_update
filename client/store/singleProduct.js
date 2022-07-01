import axios from 'axios';

// Action Types
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';

// Action Creators
export const setProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const setCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

// Thunk Creators
//GET SINGLE PRODUCT (LIST)
export const fetchProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return dispatch(setProduct(data));
  } catch (err) {
    console.error(err);
  }
};

//POST INTO CART
export const addToCart = (productId, userId) => {
  return async (dispatch) => {
    try {
      // logic for if customer is a guest & not logged in...
      if (!userId) {
        //pull localStorage cart
        const cart = JSON.parse(window.localStorage.getItem('cart'));
        const cartDetailsArr = cart.cart_details;
        
        const cartDetailExists = cartDetailsArr.filter((cd) => {
          return cd.productId === parseInt(productId, 10)
        });

        if (cartDetailsArr.length > 0 && cartDetailExists.length > 0) {
          cartDetailsArr.forEach((cd) => {
            if (cd.productId === parseInt(productId, 10)) {
              cd.product_quantity += 1;
            }
          });

          await axios.post(`/api/guests/cart/${productId}`, {cartDetailExists});

          const cartJSON = JSON.stringify(cart);
          window.localStorage.setItem('cart', cartJSON);
          return;
        }
        // creates cart details row in cart details table & returns cart details object
        const { data } = await axios.post(`/api/guests/cart/${productId}`);
        cartDetailsArr.push(data);
        const cartJSON = JSON.stringify(cart);
        window.localStorage.setItem('cart', cartJSON);
      } else {
        // (original) logic for if user is logged in to add to cart
        const { data } = await axios.post(`/api/carts/${productId}`);
        dispatch(setCart(data));
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
    case GET_SINGLE_PRODUCT:
      return action.product;
    case ADD_TO_CART:
      return { ...state, ...action.cart };
    default:
      return state;
  }
}
