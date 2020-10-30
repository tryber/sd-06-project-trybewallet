import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
