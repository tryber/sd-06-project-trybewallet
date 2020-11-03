import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/carteira" exact component={ Wallet } />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
