import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import product from './singleProduct';
import cart from './cart';
import userProfile from './userProfile';
import usersReducer from './users';

// redux needs to be refactored or replaced
// createStore is deprecated
// thunks are returning promises and not being loaded correctly
// "We recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore."
// https://redux.js.org/introduction/why-rtk-is-redux-today
// https://stackoverflow.com/questions/69502147/changing-from-redux-to-redux-toolkit

const reducer = combineReducers({
  auth,
  products,
  product,
  cart,
  userProfile,
  users: usersReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
