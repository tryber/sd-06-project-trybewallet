import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact to="/" component={ Login } />
        <Route to="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
