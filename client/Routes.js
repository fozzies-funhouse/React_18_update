import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import { Signup } from './components/SignUpForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Landing from './components/LandingPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/ConfirmationPage';
import AllUsers from './components/AllUsers';
import Sandbox from './components/Stripe/Sandbox';
import { Checkbox } from '@mui/material';

// current build uses react-router-dom-v5-compat
// to fully upgrade to v6 we need to make these changes:

//  { Switch }  becomes { Routes }
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

//  { Redirect } becomes { Navigate }
// https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

//  { withRouter } is straight up gone.  Gotta rewrite using hooks.
// docs:  https://reactrouter.com/docs/en/v6/upgrading/v5
// https://stackoverflow.com/questions/66465750/withrouter-is-not-exported-from-react-router-dom

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/allusers" component={AllUsers} />
            <Redirect to="/products" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={Confirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
