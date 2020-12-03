import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LogIn from '../pages/Login';
import Wallet from '../pages/Wallet';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ LogIn } />
    <Route path="/carteira" component={ Wallet } />
  </Switch>
);

export default Routes;
