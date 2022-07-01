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
