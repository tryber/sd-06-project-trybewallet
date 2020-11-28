import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" exact component={ Wallet } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}

export default App;
