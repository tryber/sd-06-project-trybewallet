import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Components */
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './main.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
