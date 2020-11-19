import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}
export default App;
