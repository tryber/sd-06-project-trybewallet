import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
