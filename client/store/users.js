import axios from "axios";

// Action Types
const SET_USERS = "SET_USERS";

// ACTION CREATORS
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

// THUNK CREATORS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Initial Users State
const usersState = [];

// Users sub-reducer
export default function usersReducer(state = usersState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
