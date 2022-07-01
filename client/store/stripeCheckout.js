import axios from "axios";

// Action Types

// Action Creators

// Thunk Creators
export const stripeCheckout = () => async (dispatch) => {
  try {
    await axios.post('/api/stripe/create-checkout-session', {});
  } catch (err) {
    console.error(err);
  }
};
