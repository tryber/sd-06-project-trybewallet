import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Expenses from '../Components/Expenses';

class Wallet extends Component {
  render() {
    return (
      <header>
        <Header />
        <br />
        <Expenses />
      </header>
    );
  }
}

export default connect()(Wallet);
