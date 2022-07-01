import axios from 'axios';

// Action Types
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

// Action Creators
export const _getHistory = (orderHistory) => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory,
  };
};

// Thunk Creators
//GET ORDER HISTORY
export const getHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users/userOrders');
    console.log('THIS IS DATA', data)
    return dispatch(_getHistory(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
}
