import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../src/pages/Login';
import Wallet from '../src/pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />;
      <Route path="/carteira" component={ Wallet } />;
    </Switch>
  );
}

export default App;
