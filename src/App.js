import React from 'react';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
