import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <h1>TrybeWallet Project!</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/carteira" component={ Wallet } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
