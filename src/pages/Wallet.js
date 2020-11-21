import React, { Component } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <TableExpenses />
      </div>
    );
  }
}

export default Wallet;
