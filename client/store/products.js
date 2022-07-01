import axios from 'axios';

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';

// Action Creators
const setProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

// Thunk Creators
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/*
 *Reducer
 **/
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
