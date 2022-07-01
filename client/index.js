import React from 'react'
import * as ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

// react-dom has been replaced with react-dom/client
// docs:  https://reactjs.org/docs/react-dom-client.html
// changes that ReactDom.render to createRoot
// https://stackoverflow.com/questions/71668256/deprecation-notice-reactdom-render-is-no-longer-supported-in-react-18

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
<Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)
