import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet.wallet,
});

export default connect(mapStateToProps)(App);
