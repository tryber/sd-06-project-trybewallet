import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/carteira" component={ Wallet } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
