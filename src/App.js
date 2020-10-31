import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Components */
import Login from './components/Login';
import Wallet from './components/Wallet';

import './main.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
