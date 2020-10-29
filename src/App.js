import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
