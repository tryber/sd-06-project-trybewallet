import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/wallet"><Wallet /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
