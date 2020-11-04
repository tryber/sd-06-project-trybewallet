import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
    <div>
      <Header />
      <Expenses />
    </div>);
  }
}

export default Wallet;
