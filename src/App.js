import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// MDS EU N SEI NADA, MAS MESMO ASSIM TIREI 100% NO QUIZ WTF!!!!!
function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
