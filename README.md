# React_18_update

This repo is our project with 99% updated modules including the latest React, React-three/fiber and Three.js I could find.
(I ripped out all the testing modules instead of updating them and all the test files.)
It should install with "5 moderate severity vulnerabilities" all from Nodemon.

1.   Redux create store has to be replaced with another tool from the redux-toolkit in client/store/index.js.  Notes are there.

2.  Second minor issue, this can maybe wait.

We couldn't update beyond React 16.8.6 because React-Router-Dom 5.0.0 would die.
I updated us to `react-router-dom-v5-compat 6.3.0` though and that works with React 18 for now.
All we need to do is look in `client\Routes.js` and replace two components and write one function or component.
The { withRouter } import is going away but we can rewrite it with hooks.
I noted the useful stuff I could find in that Routes.js file.

Let's solve these two issues when we got a second and get on with the cool 3D stuff in the meantime.  :)
