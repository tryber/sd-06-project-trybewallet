// import React, { Component } from 'react';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//       </div>
//     );
//   }
// }

function App() {
  return (
    <Switch>
      <Route exact path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
