import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wallet from '../pages/Wallet';
import Login from '../pages/Login';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default Routes;
