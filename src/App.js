import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css'
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    )
  }
}

export default App;
