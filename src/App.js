import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/carteira" Component={ Wallet } />
            <Route path="/" Component={ Login } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
