import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <h1>TrybeWallet Project!</h1>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/movies/:id" */}
          <Route exact path="/" component={ Login } />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
