import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const res = await axios.get('/auth/me');
  return dispatch(setAuth(res.data));
};

export const authenticate =
  (email, password, method, firstname, lastname) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
      });

      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.delete('/auth');
    dispatch(setAuth({}));
    return history.push('/');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
