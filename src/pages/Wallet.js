import React, { Component } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
