import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
