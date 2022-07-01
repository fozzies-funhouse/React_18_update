# React_18_update

This repo is our project with 99% updated modules including the latest React, React-three/fiber and Three.js I could find.
(I ripped out all the testing modules instead of updating them and all the test files.)
It should install with "5 moderate severity vulnerabilities" all from Nodemon.

Fixed the first issue. Latest package JSON should __NOT__ have that override.  Good to pull and reinstall.  Only one minor issue remains that I can see with the packages anyway.

~~1.  First minor issue
ESLint 8.4.4 is not available as of this moment.
That's what caused all the create-react-app and webpack drama today.
I worked around it by adding an override to our package.json:~~
```
  "overrides": {
      "@types/eslint": "8.4.3"
    }
```
~~Everything installed okay and looks to work, will update to ESLint 8.4.4 as soon as its available~~

2.  Second minor issue

We couldn't update beyond React 16.8.6 because React-Router-Dom 5.0.0 would die.
I updated us to `react-router-dom-v5-compat 6.3.0` though and that works with React 18 for now.
All we need to do is look in `client\Routes.js` and replace two components and write one function or component.
The { withRouter } import is going away but we can rewrite it with hooks.
I noted the useful stuff I could find in that Routes.js file.

Let's solve these two issues when we got a second and get on with the cool 3D stuff in the meantime.  :)
