import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Wallet from './pages/Wallet.jsx';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
