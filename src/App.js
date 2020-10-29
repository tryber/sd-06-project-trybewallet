import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import walletReducer from './reducers';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/carteira" Component={ Wallet } />
            <Route path="/" Component={ Login } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
