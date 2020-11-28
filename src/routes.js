import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('./pages/Login'));
const Wallet = lazy(() => import('./pages/Wallet'));

const Routes = () => (
  <Router>
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/carteira" component={Wallet} />
      </Switch>
    </Suspense>
  </Router>
);
export default Routes;
