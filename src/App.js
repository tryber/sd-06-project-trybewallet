import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact to="/" component={ Login } />
        <Route to="/carteira" component={ Wallet } />
      </Switch>
    )
  }
}

export default App;
