import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => <Login/>}/>
          <Route exact path ="/carteira" render={() => <Wallet/>}/>
        </Switch>
    )
  }
}

export default App;
