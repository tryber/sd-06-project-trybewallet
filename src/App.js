import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';
import './styles/Login.css';
import './styles/Wallet.css';
import './styles/Table.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </main>
  );
}

export default App;
