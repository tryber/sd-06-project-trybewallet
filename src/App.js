import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components */
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './main.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
